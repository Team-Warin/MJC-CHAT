import style from '@/styles/chat.module.css';

import * as motion from 'framer-motion/client';

import React from 'react';
import Image from 'next/image';

import Markdown from './markdown/markdown';

export default function Conversation({
  userType,
  children,
}: {
  userType: 'user' | 'ai';
  children: string | React.ReactNode;
}) {
  /** AI 대화일 경우 */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={style.paragraph}
      data-type={userType}
    >
      <Image
        src={userType === 'ai' ? '/avatar/mjc_face.webp' : '/avatar/user.webp'}
        alt=''
        width={27}
        height={27}
        className={style.icon}
      />
      {typeof children === 'string' ? <Markdown source={children} /> : children}
    </motion.div>
  );
}
