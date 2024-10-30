import { NextResponse } from 'next/server';

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  if (
    req.nextUrl.pathname.startsWith('/admin') &&
    !req.auth?.user?.roles.includes('admin')
  ) {
    // return NextResponse.redirect(new URL('/', req.url));
  }
});

export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};
