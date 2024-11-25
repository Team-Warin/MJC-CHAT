import { auth } from '@/auth';

import prisma from '@/lib/prisma';
import { convertToUIMessages } from '@/lib/utils';

import { cookies } from 'next/headers';

import ChatClient from '@/components/chat/chatclient';

export default async function Chat({ params }: { params: { id: string } }) {
  const session = await auth();
  const cookieStore = await cookies();
  const { id } = await params;
  const chatRoomId = Number(id);

  const chatRooms = await prisma.chatRoom.findMany({
    where: {
      userId: session?.user.id,
      tempUserId: !session
        ? cookieStore.get('TempUserId')?.value ?? '0'
        : undefined,
    },
  });

  const conversations = await prisma.conversation.findMany({
    where: { chatRoomId },
    take: 10
  });

  return (
    <>
      <ChatClient
        session={session}
        chatRooms={chatRooms}
        initialMessages={convertToUIMessages(conversations)}
        tempUserId={!session ? cookieStore.get('TempUserId')?.value : undefined}
      ></ChatClient>
    </>
  );
}