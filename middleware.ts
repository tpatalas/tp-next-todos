import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_JWT_SECRET });

  const pathProtectedInSession = ['/auth', '/'];

  if (token && pathProtectedInSession.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/app', req.url));
  }
}

export const config = {
  matcher: ['/auth', '/'],
};
