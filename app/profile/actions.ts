//app/profile/actions.ts
'use server';

import { getSession } from '../lib/session';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
  redirect('/login');
}
