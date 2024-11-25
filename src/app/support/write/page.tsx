'use client';

import type { ChatRoom } from '@prisma/client';

import style from '@/styles/support.module.css';

import { useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';

import { postReport } from '@/action/postReport';
import { getChatRooms } from '@/action/chatRoomHandler';

import { Select, SelectItem } from '@nextui-org/select';
import { Input, Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

export default function SupportWritePage() {
  const { pending } = useFormStatus();

  const reportCategories = [
    { label: '부적절한 답변', value: 0 },
    { label: '불편 & 건의 사항', value: 1 },
    { label: '기타', value: 2 },
  ];

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const [title, setTitle] = useState('');
  const [reportCategory, setReportCategory] = useState<Set<number>>(new Set());
  const [selectedChatRoom, setSelectedChatRoom] = useState<Set<string>>(
    new Set()
  );

  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchChatRooms = async () => {
      const chatRooms = await getChatRooms();
      setChatRooms(chatRooms);
    };

    fetchChatRooms();
  }, []);

  useEffect(() => {
    setContent(defaultValues[Array.from(reportCategory)[0]]);
  }, [reportCategory]);

  const defaultValues = [
    '---채팅방---\n부적절 답변:\n------------\n\n내용:\n\n---주의 사항---\n상담 직원에게 폭언이나 욕설을 할 경우, 이에 따른 적절한 조치가 취해질 수 있습니다.',
    '',
    '',
  ];

  return (
    <div className={style.support_write_container}>
      <h1>문의 등록</h1>
      <form action={postReport} className={style.support_write_select}>
        <input
          required={true}
          type='hidden'
          name='category'
          value={Array.from(reportCategory)[0] || ''}
        />
        <input required={true} type='hidden' name='title' value={title} />
        <input
          required={true}
          type='hidden'
          name='chatRoomId'
          value={Array.from(selectedChatRoom)[0] || ''}
        />
        <Select
          className={style.select}
          aria-label='문의 유형'
          name='category'
          variant='bordered'
          placeholder='문의 유형을 선택해주세요.'
          selectedKeys={reportCategory || new Set()}
          onSelectionChange={(keys) => setReportCategory(keys as Set<number>)}
        >
          {reportCategories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </Select>
        {Array.from(reportCategory)[0] == 0 ? (
          <Select
            className={style.select}
            aria-label='문제가 생긴 채팅방'
            name='chatRoomId'
            variant='bordered'
            placeholder='문제가 생긴 채팅방을 선택해주세요.'
            selectedKeys={selectedChatRoom || new Set()}
            onSelectionChange={(keys) =>
              setSelectedChatRoom(keys as Set<string>)
            }
          >
            {(chatRooms || []).map((chatRoom) => (
              <SelectItem key={chatRoom.id} value={chatRoom.id}>
                {chatRoom.title}
              </SelectItem>
            ))}
          </Select>
        ) : null}
        <Input
          type='text'
          name='title'
          variant='bordered'
          placeholder='제목을 입력해주세요.'
          value={title}
          onValueChange={setTitle}
          maxLength={20}
        />
        <Textarea
          type='text'
          name='content'
          variant='bordered'
          placeholder='문의 내용을 입력해주세요.'
          value={content || ''}
          onValueChange={setContent}
          minRows={10}
          maxLength={400}
        />
        <Button
          disabled={pending}
          type='submit'
          className='mt-5 max-w-xs'
          color='primary'
        >
          등록
        </Button>
      </form>
    </div>
  );
}
