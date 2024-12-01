import { auth } from '@/auth';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

import ChatClient from '@/components/chat/chatclient';

export default async function ChatMain() {
  const session = await auth();
  const cookieStore = await cookies();

  const chatRooms = await prisma.chatRoom.findMany({
    where: {
      userId: session?.user.id,
      tempUserId: !session
        ? cookieStore.get('TempUserId')?.value ?? '0'
        : undefined,
    },
  });

  return (
    <>
      <ChatClient
        session={session}
        chatRooms={chatRooms}
        tempUserId={!session ? cookieStore.get('TempUserId')?.value : undefined}
      ></ChatClient>
    </>
  );
}
