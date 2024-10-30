import type { JWT } from 'next-auth/jwt';
import type { NextAuthConfig } from 'next-auth';
import type { Provider } from 'next-auth/providers';

import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

import Google from 'next-auth/providers/google';

/** 구글 OAuth 토큰 갱신 */
async function refreshAccessToken(token: JWT) {
  try {
    const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: process.env.AUTH_GOOGLE_ID ?? '',
        client_secret: process.env.AUTH_GOOGLE_SECRET ?? '',
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token ?? '',
      });

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = await res.json();

    if (!res.ok) throw refreshedTokens;

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      accessTokenExpires:
        Math.round(Date.now() / 1000) + refreshedTokens.expires_in,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
    };
  } catch (e) {
    console.error(e);

    return token;
  }
}

const providers: Provider[] = [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    authorization: {
      params: {
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code',
      },
    },
    allowDangerousEmailAccountLinking: true,
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        nickname: null,
        email: profile.email,
        avatar: profile.picture,
        roles: [],
      };
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const authConfig: NextAuthConfig = {
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1hour
  },
  pages: {
    signIn: '/auth/login',
  },
  providers,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt: async ({ token, user, account, trigger }) => {
      if (user && account?.expires_in) {
        return {
          ...token, // 기존 토큰을 반환하기 위해 추가
          user,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          accessTokenExpires:
            Math.round(Date.now() / 1000) + account.expires_in,
        };
      }

      if (trigger == 'update') {
        const user = await prisma.user.findUnique({
          where: {
            id: token.user.id,
          },
        });
        if (user) {
          token.user = user;
        }
      }

      if (token.accessTokenExpires) {
        if (Math.round(Date.now() / 1000) < token.accessTokenExpires) {
          return token;
        }
      }

      return refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      if (token.user && session) {
        /** 닉네임 및 Token 권한 설정 */
        session.user = token.user;
        /** Acces Token 및 Refresh Token 설정 */
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
        session.accessTokenExpires = token.accessTokenExpires;
      }

      return session;
    },
  },
};
