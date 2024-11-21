import style from '@/styles/chat.module.css';

import React from 'react';
import Image from 'next/image';

import { Button } from '@nextui-org/button';
import { useState } from 'react';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular, faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Conversation({

  userType,
  children,
  id, // id
}: {
  userType: 'user' | 'ai';
  children: string | React.ReactNode;
  id: string; // id props 추가
}) {
  /** AI 대화일 경우 */

  const [isBookmarked, setIsBookmarked] = useState(false);


  const handleBookmark = () => {

    setIsBookmarked(!isBookmarked);



    console.log(children);

    let title = '';
    let content = '';

    if (React.isValidElement(children)) {
      const childContent = children.props.children || '';
      content = childContent;
    }
    console.log(id); // props로 받은 id
    console.log(content); // isValidElement로 span 태그 안에 있는 내용
    console.log(`user-${id.split('-')[1]}`); // user-id 확인용
    console.log(document.getElementById(`user-${id.split('-')[1]}`)); // 현재 null인 상태.. 이걸 어떻게 가져와야할까 ?
  };

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
        {typeof children === 'string' ? <span id={id}>{children}</span> : children}
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
              startContent={
                <FontAwesomeIcon
                  icon={isBookmarked ? faBookmark : faBookmarkRegular} />
              }
              onClick={handleBookmark}
            />
          </>
        )}
      </div>
    </>
  );
}
