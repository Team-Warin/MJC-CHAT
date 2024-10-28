'use client'

import style from '@/styles/chat.module.css';
import { useEffect, useState } from 'react';

// 채팅방 형태
interface ChatRoom {
    id: number;
    title: string;
}

// 좌측 채팅방 목록 코드
export default function SideNav() {
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

    // 컴포넌트 로딩시 실행됨
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/chatrooms');
            if (!response.ok) {
                throw new Error(`HTTP 에러 ${response.status}`);
            }

            const chatRooms = await response.json();
            setChatRooms(chatRooms);
        }

        fetchData().catch(console.error);
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
        
    }

    // 목록 반환
    return (
        <div className={style.chat_sidenav}>
            <div className={style.menu_icon}>
                <img src='Chat-minimum.png' alt='' className='minimum' />
                <img src='new_chat.png' alt='' className='new' onClick={createChatRoom} />
            </div>
            <div className={style.menu_chat}>
                {chatRooms.map((chatRoom) => (
                    <div className={style.chat_list}>
                        <span>{chatRoom.title}</span>
                        <img src='Vector.png' alt='' onClick={() => { deleteChatRoom(chatRoom.id) }} />
                    </div>
                ))}
            </div>
        </div>
    );
}