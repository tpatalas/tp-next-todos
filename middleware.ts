import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.match('/')) {
    return NextResponse.rewrite(new URL('/app', req.url));
  }
}

export const config = {
  matcher: ['/'],
};
