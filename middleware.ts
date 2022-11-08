import { NextResponse } from 'next/server';
//TODO: Update the Middleware for the protection setup such as api route.
// Example: https://blog.tericcabrel.com/protect-your-api-routes-in-next-js-with-middleware/

// const isTodosRoute = (pathname: string) => {
//   return pathname.startsWith('/api/todos');
// };

export async function middleware() {
  // const { pathname } = req.nextUrl;

  // if (isTodosRoute(pathname)) {
  //   return NextResponse.redirect(new URL('/403', req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/todos/:path*'],
};
