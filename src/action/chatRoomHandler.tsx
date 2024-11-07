'use server';

import type { Session } from 'next-auth';
import type { ChatRoom } from '@prisma/client';

import prisma from '@/lib/prisma';

import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';

// 채팅방 생성 서버 액션
export async function createChatRoom() {
  const session = await auth();

  let userId = session?.user.id ?? cookies().get('TempUserId')?.value;

  const chatRoom = await prisma.chatRoom.create({
    data: {
      title: '새 채팅방',
      ...(session ? { userId: session.user.id } : { tempUserId: userId }),
    },
  });

  revalidatePath('/chat');
  redirect(`/chat/${chatRoom.id}`);
}

export async function deleteChatRoom({ chatRoomId }: { chatRoomId: number }) {
  await prisma.chatRoom.delete({ where: { id: chatRoomId } });

  const chatRoom = await prisma.chatRoom.findFirst({
    orderBy: { createdAt: 'desc' },
  });

  revalidatePath('/chat');
  redirect(`/chat/${chatRoom?.id}`);
}

export async function updateChatRoom({
  chatRoomId,
  editRoom,
}: {
  chatRoomId: number;
  editRoom: ChatRoom;
}) {
  await prisma.chatRoom.update({
    where: { id: chatRoomId },
    data: editRoom,
  });

  revalidatePath('/chat');
}
