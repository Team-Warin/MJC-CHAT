import { NextResponse } from 'next/server';

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

import { v4 as uuidv4 } from 'uuid';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  if (
    req.nextUrl.pathname.startsWith('/admin') &&
    !req.auth?.user?.roles.includes('admin')
  ) {
    // return NextResponse.redirect(new URL('/', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/chat') && !req.auth?.user) {
    const tempUserId = req.cookies.get('TempUserId');

    if (!tempUserId) {
      const res = NextResponse.next();
      res.cookies.set('TempUserId', `TempUser_${uuidv4()}`, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
      });
      return res;
    }
  }
});

export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};
