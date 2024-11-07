import style from '@/styles/chat.module.css';

import React from 'react';
import Image from 'next/image';

export default function Conversation({
  userType,
  content,
}: {
  userType: 'user' | 'ai';
  content: string;
}) {
  /** AI 대화일 경우 */
  return (
    <div className={(userType === 'ai') ? style.paragraph_ai : style.paragraph_user}>
      <Image 
        src='/favicon.ico' 
        alt='' 
        width={20} 
        height={20}
        className={style.icon}
      />
      <span>{content}</span>
    </div>
  );
}
