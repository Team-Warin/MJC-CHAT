'use client';

import type { Message } from 'ai';

import style from '@/styles/chat.module.css';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';

import { components } from '@/components/markdown/markdown';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

export default function ChatMessage({
  message,
  isLoading,
}: {
  message?: Message;
  isLoading?: boolean;
}) {
  let children: React.ReactNode;

  if (Array.isArray(message?.content)) {
    if (message.content.length > 0) {
      if (
        message.content[0].type === 'text' &&
        !message.content[1]?.type.includes('tool')
      ) {
        message.content = message.content[0].text;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  function filterMessage(message: Message) {
    message.content = message.content.replace(
      /[^가-힣a-zA-Z0-9\s~`!@#$%^&*()\-_=+[\]{}|\\;:'",.<>\/]/g,
      ''
    ); // 한글, 영어, 숫자, 공백 제외 모두 제거

    if (message.role === 'assistant') {
      if (message.content.length === 0 || !message.content)
        message.content =
          '죄송합니다. 명전이가 답변을 생성하는 도중 오류가 발생했습니다.';
    }

    return message.content;
  }

  if (isLoading)
    return (
      <motion.div
        className={style.paragraph}
        data-type='ai'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={style.chat_message}>
          <Image
            src={'/avatar/mjc_face.webp'}
            alt=''
            width={27}
            height={27}
            className={style.icon}
          />
          <Loading />
        </div>
      </motion.div>
    );

  if (!message) return null;

  message.content = filterMessage(message);

  serialize(message.content, {
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
    },
  }).catch(() => {
    children = (
      <p
        dangerouslySetInnerHTML={{
          __html: message.content.replace(/\n/g, '<br />'),
        }}
      />
    );
  });

  return (
    <motion.div
      className={style.paragraph}
      data-type={message.role}
      initial={{ opacity: message.role === 'assistant' ? 1 : 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={style.chat_message}>
        <Image
          src={
            message.role === 'assistant'
              ? '/avatar/mjc_face.webp'
              : '/avatar/user.webp'
          }
          alt=''
          width={27}
          height={27}
          className={style.icon}
        />
        {children ? children : <MDXContent>{message.content}</MDXContent>}
      </div>
    </motion.div>
  );
}

function MDXContent({ children }: { children: string }) {
  const [content, setContent] = useState<MDXRemoteSerializeResult | null>(null);
  useEffect(() => {
    (async () => {
      if (children)
        try {
          setContent(
            await serialize(children, {
              mdxOptions: {
                development: process.env.NODE_ENV === 'development',
              },
            })
          );
        } catch {}
    })();
  }, [children]);

  if (content) {
    return (
      <div className={style.content}>
        {content ? (
          <MDXRemote {...content} components={components} />
        ) : (
          <p
            dangerouslySetInnerHTML={{
              __html: children.replace(/\n/g, '<br />'),
            }}
          />
        )}
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
