'use client';

import type { Session } from 'next-auth';
import type { Dispatch, SetStateAction } from 'react';

import style from '@/styles/chat.module.css';

import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';

import { usePathname, useParams } from 'next/navigation';

import { createChatRoom } from '@/action/chatRoomHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faStop } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@nextui-org/button';
import { Textarea } from '@nextui-org/input';
import { UserMenu } from '@/components/navbar';
import { LoginButton } from '@/components/navbar';

import Conversation from '@/components/conversation';

import { useChat } from 'ai/react';
import Link from 'next/link';

import { components } from '@/components/markdown/markdown';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

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

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: `/api/chatrooms/${chatRoomId}/conversations`,
    });

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);

  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter' && input.length > 0) {
        await sendButtonRef.current?.click();
        await inputRef.current?.focus();
      }
    });

    return () => {
      window.removeEventListener('keydown', () => {});
    };
  }, [input]);

  useEffect(() => {
    if (messageEndRef.current && chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: messageEndRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <main className={style.chat_window}>
      <div className={style.chat_window_header}>
        <div className={style.title}>
          <Link href='/' className={style.logo}>
            <Image src={'/webps/mjc.webp'} alt='logo' width={30} height={30} />
            <h1>명전이</h1>
          </Link>
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
      <div ref={chatBodyRef} className={style.chat_window_body}>
        <div ref={chatBodyRef} className={style.chat_window_body_chat}>
          {messages.map((message) => {
            if (message.toolInvocations) return null;

            serialize(message.content, {
              mdxOptions: {
                development: process.env.NODE_ENV === 'development',
              },
            }).catch(() => {
              return (
                <Conversation
                  userType={message.role === 'user' ? 'user' : 'ai'}
                  key={message.id}
                  id={message.id}
                >
                  <span className={style.content}>{message.content}</span>
                </Conversation>
              );
            });

            return (
              <Conversation
                userType={message.role === 'user' ? 'user' : 'ai'}
                key={message.id}
                id={message.id}
              >
                {message.role === 'assistant' ? (
                  <MDXContent>{message.content}</MDXContent>
                ) : (
                  <span className={style.content}>{message.content}</span>
                )}
              </Conversation>
            );
          })}
          {isLoading &&
          (messages[messages.length - 1]?.role !== 'assistant' ||
            messages[messages.length - 1]?.content.length === 0) ? (
            <Conversation userType='ai' id={'loding'}>
              <Loading />
            </Conversation>
          ) : null}
          <div ref={messageEndRef}></div>
        </div>
        <div className={style.chat_body_background}>
          <Image
            src={'/mascot/pos_1.svg'}
            alt='logo'
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className={style.chat_window_footer}>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className={style.chat_form}
        >
          <Textarea
            disabled={isLoading}
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            size='lg'
            variant='bordered'
            minRows={2}
            maxRows={4}
            placeholder='자유롭게 대화해 보세요.'
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: input.replace(/\s/g, '').length || isLoading ? 1 : 0,
            }}
            transition={{ duration: 0.2, stiffness: 100, type: 'spring' }}
            className={style.send_button}
          >
            <Button
              disabled={input.replace(/\s/g, '').length === 0}
              isIconOnly
              type='submit'
              radius='full'
              ref={sendButtonRef}
              onPress={() => {
                if (isLoading) stop();
              }}
            >
              {isLoading ? (
                <FontAwesomeIcon size='sm' icon={faStop} />
              ) : (
                <FontAwesomeIcon size='sm' icon={faArrowRight} />
              )}
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

function MDXContent({ children }: { children: string }) {
  const [content, setContent] = useState<MDXRemoteSerializeResult | null>(null);
  useEffect(() => {
    (async () => {
      if (children)
        setContent(
          await serialize(children, {
            mdxOptions: { development: process.env.NODE_ENV === 'development' },
          })
        );
    })();
  }, [children]);

  if (content) {
    return (
      <div className={style.content}>
        <MDXRemote {...content} components={components} />
      </div>
    );
  }
}

function Loading() {
  const texts = '명전이가 답변을 생성중입니다...';

  return (
    <div>
      {texts.split('').map((text, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, delay: 0.2 * i, repeat: Infinity }}
        >
          {text}
        </motion.span>
      ))}
    </div>
  );
}
