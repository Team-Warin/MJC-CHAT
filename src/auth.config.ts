import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  debug: false,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30, // 30days
  },
  pages: {
    signIn: '/auth/login',
  },
  providers: [],
};
