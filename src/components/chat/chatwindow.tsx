'use client';

import type { Session } from 'next-auth';
import type { Dispatch, SetStateAction } from 'react';

import style from '@/styles/chat.module.css';

import Image from 'next/image';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { usePathname, useParams } from 'next/navigation';

import { createChatRoom } from '@/action/chatRoomHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@nextui-org/button';
import { Textarea } from '@nextui-org/input';
import { UserMenu } from '@/components/navbar';
import { LoginButton } from '@/components/navbar';

import Conversation from '@/components/conversation';

import { Conversation as ConversationType } from '@prisma/client'

export default function ChatWindow({
  session,
  isOpen,
  setIsOpen,
}: {
  session: Session | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const { id: chatRoomId } = useParams();

  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(`/api/chatrooms/${chatRoomId}/conversations?page=1&limit=10`);
        const data = await response.json();
        console.log(data);
        setConversations(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
    fetchConversations();
  }, []);

  const sendConversation = async () => {
    if (value.trim().length === 0) return;

    try {
      const conversationTemp = {
        id: 0,
        sender: 'user',
        message: value
      };

      setConversations([...conversations, conversationTemp as ConversationType]); // 유저 메시지 추가
      setValue(''); // 입력창 초기화

      const response = await fetch(`/api/chatrooms/${chatRoomId}/conversations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: conversationTemp.message }),
      });

      const [, conversationAI] = await response.json();

      setConversations(prevConversations => [...prevConversations, conversationAI]); // AI 메시지 추가
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <main className={style.chat_window}>
      <div className={style.chat_window_header}>
        <div className={style.title}>
          <div className={style.logo}>
            <Image src={'/webps/mjc.webp'} alt='logo' width={30} height={30} />
            <h1>명전이</h1>
          </div>
          {isOpen ? null : (
            <Button
              className='flex-shrink-0'
              variant='bordered'
              size='sm'
              radius='full'
              startContent={<FontAwesomeIcon icon={faPlus} />}
              onClick={() => createChatRoom()}
            >
              새 대화
            </Button>
          )}
        </div>
        <div>
          {session ? (
            <UserMenu size='sm' session={session} />
          ) : (
            <LoginButton pathname={pathname} />
          )}
        </div>
      </div>
      <div className={style.chat_window_body}>
        {conversations.map(conversation => (
          <Conversation userType={conversation.sender}>
            <span>{conversation.message}</span>
          </Conversation>
        ))}
      </div>
      <div className={style.chat_window_footer}>
        <div>
          <Textarea
            value={value}
            onValueChange={setValue}
            onKeyDown={e => (e.key === 'Enter') && sendConversation()}
            size='lg'
            variant='bordered'
            minRows={2}
            placeholder='자유롭게 대화해 보세요.'
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: value.length > 0 ? 1 : 0 }}
            transition={{ duration: 0.2, stiffness: 100, type: 'spring' }}
            className={style.send_button}
          >
            <Button
              onClick={sendConversation}
              isIconOnly
              radius='full'>
              <FontAwesomeIcon size='sm' icon={faArrowRight} />
            </Button>
          </motion.div>
        </div>
        <p>
          명전이는 부정확한 정보를 제공할 수 있으며, 이는 명지전문대학의 입장을
          대변하지 않습니다.
        </p>
      </div>
    </main>
  );
}
