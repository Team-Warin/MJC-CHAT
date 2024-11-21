'use server';

import prisma from '@/lib/prisma';

import { auth } from '@/auth';

export async function getChatRooms() {
  const session = await auth();

  const chatRooms = await prisma.chatRoom.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return chatRooms;
}
