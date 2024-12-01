'use client';

import type { Message } from 'ai';
import type { Session } from 'next-auth';

import style from '@/styles/chat.module.css';

import { ChatRoom } from '@prisma/client';

import { useState } from 'react';

import ChatroomNav from '@/components/chat/chatroomnav';
import ChatWindow from '@/components/chat/chatwindow';

export default function ChatClient({
  session,
  chatRooms,
  tempUserId,
  messages,
  chatRoom,
}: {
  session: Session | null;
  chatRooms: ChatRoom[];
  tempUserId?: string;
  messages?: Message[];
  chatRoom?: ChatRoom;
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
      {messages && chatRoom && (
        <ChatWindow
          session={session}
          isOpen={isOpen}
          initialMessages={messages}
          chatRoom={chatRoom}
        ></ChatWindow>
      )}
    </div>
  );
}
