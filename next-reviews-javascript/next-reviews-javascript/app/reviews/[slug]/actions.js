'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createComment } from '@/lib/comments';
import { getUserFromSession } from '@/lib/auth';

export async function createCommentAction(formData) {
  const user = await getUserFromSession();
  if (!user) {
    throw new Error('Unauthorized');
  }
  const data = {
    slug: formData.get('slug'),
    userId: user.id,
    message: formData.get('message'),
  };
  const error = validate(data);
  if (error) {
    return { isError: true, message: error };
  }
  const comment = await createComment(data);
  console.log('created:', comment);
  revalidatePath(`/reviews/${data.slug}`);
  redirect(`/reviews/${data.slug}`);
}

function validate(data) {
  if (!data.message) {
    return 'Comment field is required';
  }
  if (data.message.length > 500) {
    return 'Comment field cannot be longer than 500 characters';
  }
}
