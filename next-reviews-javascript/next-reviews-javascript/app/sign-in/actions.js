'use server';

import { redirect } from 'next/navigation';
import { setSessionCookie } from '@/lib/auth';
import { authenticateUser } from '@/lib/users';

export async function signInAction(formData) {
  console.log('[signInAction]', formData);
  const email = formData.get('email');
  const password = formData.get('password');
  const user = await authenticateUser(email, password);
  if (!user) {
    return { isError: true, message: 'Invalid credentials' };
  }
  await setSessionCookie(user);
  redirect('/');
}
