'use client';

import type { Session } from 'next-auth';
import type { Dispatch, SetStateAction } from 'react';

import style from '@/styles/chat.module.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ChatRoom } from '@prisma/client';

import {
  createChatRoom,
  deleteChatRoom,
  updateChatRoom,
} from '@/action/chatRoomHandler';

import { motion } from 'framer-motion';

import { usePathname } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

// 채팅방 네비게이션이다.
export default function ChatroomNav({
  session,
  chatRooms,
  isOpen,
  setIsOpen,
}: {
  session: Session | null;
  chatRooms: ChatRoom[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <motion.nav
      className={style.chatroom_nav}
      animate={{ width: isOpen ? '256px' : '64px' }}
    >
      {isOpen ? (
        <OpenChatroomNav
          session={session}
          chatRooms={chatRooms}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ) : (
        <CloseChatroomNav isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </motion.nav>
  );
}

function OpenChatroomNav({
  session,
  chatRooms,
  isOpen,
  setIsOpen,
}: {
  session: Session | null;
  chatRooms: ChatRoom[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div>
      <div className={style.chatroom_nav_header}>
        <button className={style.bars} onClick={() => setIsOpen(!isOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </button>
        <div className='w-full'></div>
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
      </div>
      <div className={style.chatroom_nav_body}>
        {chatRooms.map((chatRoom) => (
          <ChatroomItem chatRoom={chatRoom} key={chatRoom.id} />
        ))}
      </div>
    </div>
  );
}

function CloseChatroomNav({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div>
      <div className={style.chatroom_nav_header}>
        <button className={style.bars} onClick={() => setIsOpen(!isOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </button>
      </div>
      <div className={style.chatroom_nav_body}>
        <Button isIconOnly variant='light' radius='full'>
          <FontAwesomeIcon icon={faComment} />
        </Button>
      </div>
    </div>
  );
}

function ChatroomItem({ chatRoom }: { chatRoom: ChatRoom }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(chatRoom.title);

  return (
    <div
      className={`${style.chatroom_item} ${
        pathname === `/chat/${chatRoom.id}` ? 'bg-slate-100' : ''
      }`}
      key={chatRoom.id}
      onClick={(e) => {
        router.replace(`/chat/${chatRoom.id}`);
      }}
    >
      <div className='flex items-center gap-2'>
        <FontAwesomeIcon icon={faComment} />
        {isEdit ? (
          <Input
            size='sm'
            variant='bordered'
            className={style.edit_input}
            type='text'
            value={title}
            onValueChange={setTitle}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateChatRoom({
                  chatRoomId: chatRoom.id,
                  editRoom: { ...chatRoom, title },
                });
                setIsEdit(false);
              }
            }}
            onMouseOut={() => {
              setTitle(chatRoom.title);
              setIsEdit(false);
            }}
          />
        ) : (
          <p
            onClick={(e) => {
              e.stopPropagation();
              setIsEdit(!isEdit);
            }}
          >
            {title}
          </p>
        )}
      </div>
      {isEdit ? null : (
        <motion.div
          className={style.trash}
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, stiffness: 100, type: 'spring' }}
        >
          <Button
            isIconOnly
            size='sm'
            variant='light'
            color='danger'
            radius='full'
            onPress={() => deleteChatRoom({ chatRoomId: chatRoom.id })}
          >
            <FontAwesomeIcon size='lg' icon={faTrash} />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
