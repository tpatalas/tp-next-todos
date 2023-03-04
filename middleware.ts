import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const session = req.cookies.get('next-auth.session-token');

  if (req.nextUrl.pathname.match('/auth')) {
    if (session) {
      return NextResponse.redirect(new URL('/app', req.url));
    }
    return;
  }
  if (req.nextUrl.pathname.match('/')) {
    return NextResponse.redirect(new URL('/app', req.url));
  }
}

export const config = {
  matcher: ['/', '/auth'],
};
