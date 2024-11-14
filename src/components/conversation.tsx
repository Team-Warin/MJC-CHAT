import style from '@/styles/chat.module.css';
import React from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/button';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular, faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Conversation({
  userType,
  children,
}: {
  userType: 'user' | 'ai';
  children: string | React.ReactNode;
}) {
  /** AI 대화일 경우 */
  return (
    <>
      <div className={style.paragraph} data-type={userType}>
        <Image
          src={userType === 'ai' ? '/avatar/mjc_face.webp' : '/avatar/user.webp'}
          alt=''
          width={27}
          height={27}
          className={style.icon}
        />
        {typeof children === 'string' ? <span>{children}</span> : children}
      </div>
      <div className={style.chat_icon}>
        {userType === 'ai' && (
          <>
            <Button
              isIconOnly
              size='sm'
              variant='light'
              startContent={<FontAwesomeIcon icon={faComment} />}
            />
            <Button
              isIconOnly
              size='sm'
              variant='light'
              startContent={<FontAwesomeIcon icon={faBookmarkRegular} />}
            />
          </>
        )}

      </div>
    </>
  );
}
