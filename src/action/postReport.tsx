'use server';

import prisma from '@/lib/prisma';

import { auth } from '@/auth';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function postReport(formData: FormData) {
  const session = await auth();

  if (!session) throw new Error('Unauthorized');

  const {
    title,
    chatRoomId,
    category,
    content,
  }: {
    title: string;
    chatRoomId: string;
    category: string;
    content: string;
  } = Object.fromEntries(formData.entries()) as unknown as {
    title: string;
    chatRoomId: string;
    category: string;
    content: string;
  };

  const messages = [
    {
      role: 'user',
      content: content,
      createdAt: new Date(),
    },
  ];

  await prisma.report.create({
    data: {
      userId: session.user.id,
      conversationId: parseInt(chatRoomId),
      type: parseInt(category),
      title,
      messages,
      createdAt: new Date(),
      status: 0,
    },
  });

  revalidatePath('/support');
  redirect('/support');
}
