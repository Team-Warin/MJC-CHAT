import style from '@/styles/chat.module.css';

<<<<<<< HEAD:src/components/chat/conversation.tsx
export default function Conversation({
    userType,
    content
}: {
    userType: 'user' | 'ai';
    content: string
}) {
=======
import React from 'react';
import Image from 'next/image';

export default function Conversation({
  userType,
  children,
}: {
  userType: 'user' | 'ai';
  children: React.ReactNode;
}) {
  /** AI 대화일 경우 */
  if (userType === 'ai') {
>>>>>>> origin/developer/iniru:src/components/conversation.tsx
    return (
      <div className={style.paragraph}>
        <Image src='/favicon.ico' alt='' width={20} height={20} />
        <span>{children}</span>
      </div>
    );
  }

  /** User 대화일 경우 */
  return (
    <div className={style.paragraph}>
      <span>{children}</span>
    </div>
  );
}
