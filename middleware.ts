import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const session = req.cookies.get('next-auth.session-token');

  switch (req.nextUrl.pathname) {
    case '/auth':
      if (session) {
        return NextResponse.redirect(new URL('/app', req.url));
      }
      break;
    case '/':
      return NextResponse.redirect(new URL('/app', req.url));
  }
}

export const config = {
  matcher: ['/', '/auth', '/auth/verification'],
};
