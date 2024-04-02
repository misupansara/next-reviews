'use server';

import { redirect } from 'next/navigation';
import { setSessionCookie } from '@/lib/auth';
import { createUser } from '@/lib/users';

export async function signUpAction(formData) {
  console.log('[signUpAction]', formData);
  const data = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
  };
  // TODO validate data / handle duplicate email
  const user = await createUser(data);
  console.log('[signUpAction] user:', user);
  await setSessionCookie(user);
  redirect('/');
}
