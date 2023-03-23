import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_JWT_SECRET });

  switch (req.nextUrl.pathname) {
    case '/auth':
      if (token) {
        return NextResponse.redirect(new URL('/app', req.url));
      }
      break;
    case '/':
      return NextResponse.redirect(new URL('/app', req.url));
  }
}

export const config = {
  matcher: ['/', '/auth'],
};
