//app/lib/session.ts

import { getIronSession } from 'iron-session';

export interface SessionData {
  userId?: number;
  username?: string;
  email?: string;
  isLoggedIn: boolean;
}

const defaultSession: SessionData = {
  isLoggedIn: false,
};

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), {
    password: process.env.SESSION_PASSWORD!,
    cookieName: 'auth-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  });

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
}
