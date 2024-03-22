'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // Check user's input is validated
    const title = formData.get('title');
    const code = formData.get('code');

    if (typeof title !== 'string' || title.length < 3) {
      return {
        message: 'Title must be longer',
      };
    }

    if (typeof code !== 'string' || code.length < 10) {
      return {
        message: 'Code must be longer',
      };
    }

    // Create a new row in the db
    await db.snipet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: 'Something went wrong...',
      };
    }
  }

  // Disable cache on demand
  revalidatePath('/');
  // Redirect to the home page after success
  redirect('/');
}

export async function editSnippet(id: number, code: string) {
  await db.snipet.update({
    where: { id },
    data: { code },
  });

  // Disable cache on demand
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snipet.delete({
    where: { id },
  });

  // Disable cache on demand
  revalidatePath('/');
  redirect('/');
}
