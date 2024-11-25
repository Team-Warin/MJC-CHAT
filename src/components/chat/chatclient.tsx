'use client';

import type { Session } from 'next-auth';
import type { Message } from 'ai';

import style from '@/styles/chat.module.css';
import { ChatRoom } from '@prisma/client';

import { useState } from 'react';

import ChatroomNav from '@/components/chat/chatroomnav';
import ChatWindow from '@/components/chat/chatwindow';

export default function ChatClient({
  session,
  chatRooms,
  initialMessages,
  tempUserId,
}: {
  session: Session | null;
  chatRooms: ChatRoom[];
  initialMessages: Array<Message>;
  tempUserId?: string;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={style.container}>
      <ChatroomNav
        session={session}
        chatRooms={chatRooms}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></ChatroomNav>
      <ChatWindow
        session={session}
        initialMessages={initialMessages}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></ChatWindow>
    </div>
  );
}