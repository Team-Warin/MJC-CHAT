import type { Message } from 'ai';

import { auth } from '@/auth';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

import ChatClient from '@/components/chat/chatclient';

export default async function Chat({ params }: { params: { id: string } }) {
  const session = await auth();
  const cookieStore = await cookies();

  const { id } = await params;

  const chatRooms = await prisma.chatRoom.findMany({
    where: {
      userId: session?.user.id,
      tempUserId: !session
        ? cookieStore.get('TempUserId')?.value ?? '0'
        : undefined,
    },
  });

  const chatRoom = await prisma.chatRoom.findUnique({
    where: {
      id: Number(id),
    },
  });

  const messages = chatRoom?.messages
    ? ((typeof chatRoom.messages === 'string'
        ? JSON.parse(chatRoom.messages)
        : []) as Message[])
    : [];

  return (
    <>
      <ChatClient
        session={session}
        chatRooms={chatRooms}
        tempUserId={!session ? cookieStore.get('TempUserId')?.value : undefined}
        messages={messages}
      ></ChatClient>
    </>
  );
}
