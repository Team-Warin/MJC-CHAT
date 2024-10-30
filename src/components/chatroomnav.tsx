'use client'

import style from '@/styles/chat.module.css';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faClose } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@nextui-org/button';
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Listbox, ListboxItem } from '@nextui-org/listbox';

// 채팅방 형태
interface ChatRoom {
    id: number;
    title: string;
}

// 좌측 채팅방 목록 코드
export default function ChatroomNav() {
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

    // 컴포넌트 로딩시 실행됨
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/chatrooms', { method: 'GET', headers: {
                'Content-Type': 'application/json'
              }});
            if (!response.ok) {
                throw new Error(`HTTP 에러 ${response.status}`);
            }

            const chatRooms = await response.json();
            setChatRooms(chatRooms);
        }

        fetchData().catch(console.log);
    }, []);

    // 새 채팅방 생성
    const createChatRoom = async () => {
        const response = await fetch('/api/chatrooms', { method: 'POST' });
        if (!response.ok) {
            throw new Error(`HTTP 에러 ${response.status}`);
        }

        

        const newChatRoom = await response.json(); // 생성된 채팅방 추가
        setChatRooms([...chatRooms, newChatRoom]);
    }

    // 채팅방 삭제
    const deleteChatRoom = async (id: number) => {
        const response = await fetch(`/api/chatrooms/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error(`HTTP 에러 ${response.status}`);
        }

        setChatRooms(chatRooms.filter(chatRoom => chatRoom.id !== id)); // id 채팅방 제외
    }

    // 채팅방 이름 변경
    const renameChatroom = async (id: number, title: string) => {
        const body = JSON.stringify({ title });
        const response = await fetch(`/api/chatrooms/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error(`HTTP 에러 ${response.status}`);
        }

        // 이름 변경 코드
    }

    // 목록 반환
    return (
        <div className={style.chatroom_nav}>
            <div className={style.nav_menu}>
                <Button
                    className={style.menu_btn}
                    isIconOnly
                    size='sm'
                    color='primary'
                    variant="light"
                    endContent={<FontAwesomeIcon icon={faBars} />}
                >
                </Button>
                <Button 
                    className={style.new_btn}
                    size='sm'
                    color='primary'
                    endContent={<FontAwesomeIcon icon={faPlus} />}
                    onClick={createChatRoom}
                >
                    새 채팅방
                </Button>
            </div>
            <ScrollShadow>
                <Listbox className={style.chatroom_list}>
                    {chatRooms.map((chatRoom) => (
                        <ListboxItem className={style.chatroom_item} key={chatRoom.id} >
                            <span>{chatRoom.title}</span>
                            <Button isIconOnly
                                size='lg'
                                color='primary'
                                variant="light"
                                endContent={<FontAwesomeIcon icon={faClose} />}
                            ></Button>
                        </ListboxItem>
                    ))}
                </Listbox>
            </ScrollShadow>
        </div>
    );
}