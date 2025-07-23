//app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { SessionData } from './lib/session';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  try {
    const session = await getIronSession<SessionData>(
      request.cookies,
      response.cookies,
      {
        password: process.env.SESSION_SECRET!,
        cookieName: 'auth-session',
        cookieOptions: {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 7 days
        },
      },
    );

    const { pathname } = request.nextUrl;

    // Protected routes
    if (pathname.startsWith('/profile')) {
      if (!session.isLoggedIn) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    // Redirect logged-in users away from auth pages
    if (pathname === '/login' || pathname === '/create-account') {
      if (session.isLoggedIn) {
        return NextResponse.redirect(new URL('/profile', request.url));
      }
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return response;
  }
}

export const config = {
  matcher: ['/profile/:path*', '/login', '/create-account'],
};
