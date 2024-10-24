import style from '@/styles/chat.module.css';
import Conversation from '@/components/conversation';
import Chatroom from '@/components/chatroom';

import prisma from '@/lib/prisma';
import { useState } from 'react';

export default async function Chat() {
  const [input, setInput] = useState("");

  const chatRooms = await prisma.chatRoom.findMany({
    where: {
      userId: 1,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const chatList = await prisma.conversation.findMany({
    where: {
      chatroomId: 1,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className={style.container}>
      <div className={style.menu_container}>
        <div className={style.menu_icon}>
          <img src='Chat-minimum.png' alt='' className='minimum' />
          <img src='new_chat.png' alt='' className='new' />
        </div>
        <div className={style.menu_chat}>
          {chatRooms.map((chatRoom) => (
            <Chatroom title={chatRoom.title}></Chatroom>
          ))}
        </div>
      </div>
      <div className={style.chat_container}>
        <div className={style.chat_header}>
          <img src='Settings.png' alt='' />
        </div>
        <div className={style.chat_screen}>
          <div className={style.chatting}>
            {chatList.map((conv) => (
              <Conversation content={conv.message} userType={conv.sender}></Conversation>
            ))}
          </div>
        </div>
        <div className={style.message_box}>
          <form onSubmit={e => {
            e.preventDefault();
            console.log(input);
          }}>
            <div className={style.send_msg}>
              <input
                type='text'
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder='메시지를 입력하세요'
              />
              <img
                src='../favicon.ico'
                alt=''
                style={{ width: '40', height: '40' }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
