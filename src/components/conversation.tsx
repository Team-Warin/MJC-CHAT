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
  if (userType === 'ai') {
    return (
      <div className={style.paragraph}>
        <Image src='/favicon.ico' alt='' width={20} height={20} />
        <span>{content}</span>
      </div>
    );
  }

  /** User 대화일 경우 */
  return (
    <div className={style.paragraph}>
      <span>{content}</span>
    </div>
  );
}
