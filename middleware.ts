import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_JWT_SECRET });

  const pathProtectedInSession = ['/auth', '/demo', '/'];
  const pathProtectedOffSession = ['/app'];

  if (token && pathProtectedInSession.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/app', req.url));
  }
  if (!token && pathProtectedOffSession.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/auth', '/demo', '/app', '/'],
};
