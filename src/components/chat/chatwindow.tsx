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

import { Conversation as ConversationPrisma } from '@prisma/client'

import { useChat } from 'ai/react';

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

  const [conversations, setConversations] = useState<ConversationPrisma[]>([]);
  const [value, setValue] = useState('');

  const { messages, input, handleInputChange, handleSubmit, setData } = useChat({
    api: `/api/chatrooms/${chatRoomId}/conversations`,
  });

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
        {messages.map(message => (
          <Conversation
            userType={message.role === 'user' ? 'user' : 'ai'}
            key={message.id}
          >
            <span>{message.content}</span>
          </Conversation>
        ))}
      </div>
      <div className={style.chat_window_footer}>
        <form
          onSubmit={e => {
            setData(undefined);
            handleSubmit(e);
          }}
        >
          <Textarea
            value={input}
            onChange={handleInputChange}
            size='lg'
            variant='bordered'
            minRows={2}
            placeholder='자유롭게 대화해 보세요.'
          />
          <Button
            type='submit'
            isIconOnly
            radius='full'>
            <FontAwesomeIcon size='sm' icon={faArrowRight} />
          </Button>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: value.length > 0 ? 1 : 0 }}
            transition={{ duration: 0.2, stiffness: 100, type: 'spring' }}
            className={style.send_button}
          >
            <Button
              type='submit'
              isIconOnly
              radius='full'>
              <FontAwesomeIcon size='sm' icon={faArrowRight} />
            </Button>
          </motion.div>
        </form>
        <p>
          명전이는 부정확한 정보를 제공할 수 있으며, 이는 명지전문대학의 입장을
          대변하지 않습니다.
        </p>
      </div>
    </main>
  );
}