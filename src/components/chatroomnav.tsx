'use client'

import style from '@/styles/chat.module.css';
import { useEffect, useState, MouseEvent, ChangeEvent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faClose } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@nextui-org/button';
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/listbox';
import { Input } from '@nextui-org/input';

// next/navigation 에서 import 해야함!!
import { useRouter } from 'next/navigation';

interface ChatRoom {
    id: number;
    title: string;
    userId: number;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    important: boolean;
}

interface GroupedChatRooms {
    important: ChatRoom[];
    today: ChatRoom[];
    last7days: ChatRoom[];
    last30days: ChatRoom[];
}

interface Section {
    title: string;
    key: keyof GroupedChatRooms;
}

// 채팅방 네비게이션이다.
export default function ChatroomNav() {
    const router = useRouter();
    const [groupedChatRooms, setGroupedChatRooms] = useState<GroupedChatRooms>({
        important: [],
        today: [],
        last7days: [],
        last30days: []
    });
    const [editingId, setEditingId] = useState(-1);
    const [editingTitle, setEditingTitle] = useState("");

    // Click-to-Edit
    const handleDoubleClick = (chatRoom: ChatRoom) => {
        setEditingId(chatRoom.id);
        setEditingTitle(chatRoom.title);
    }

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditingTitle(e.target.value);
    }

    const handleTitleSave = async (id: number) => {
        await renameChatRoom(id, editingTitle);

        setEditingId(-1);
        setEditingTitle("");
    }

    const handlNavigation = (id: number, e: MouseEvent) => {
        e.preventDefault();

        if (editingId !== id) {
            router.push(`/chat?id=${id}`);
        }
    }

    // 채팅방 데이터를 불러온다.
    useEffect(() => {
        // async 우회
        const fetchData = async () => {
            try {
                // GET 메서드로 데이터를 불러온다.
                const response = await fetch('/api/chatrooms?group=true', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                // reponse 상태를 체크해서, 이 아닐시 오류 반환
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                // 상태 업데이트
                const groupedChatRooms = await response.json();
                setGroupedChatRooms(groupedChatRooms);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    // 새 채팅방을 생성한다. 이후 주석은 생략한다.
    const createChatRoom = async () => {
        try {
            // POST 메서드로 생성한다
            const response = await fetch('/api/chatrooms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            // 상태 업데이트, newChatroom만 변경
            const newChatRoom = await response.json();
            setGroupedChatRooms({
                ...groupedChatRooms,
                today: [...groupedChatRooms.today, newChatRoom]
            });
        } catch (error) {
            console.error(error);
        }
    };

    // 채팅방을 삭제한다
    const deleteChatRoom = async (id: number) => {
        try {
            // DELETE 메서드로 삭제한다.
            const response = await fetch(`/api/chatrooms/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            // 각 그룹에서 해당 id를 가진 채팅방을 필터링하여 제거
            setGroupedChatRooms(({
                important: groupedChatRooms.important.filter((room) => room.id !== id),
                today: groupedChatRooms.today.filter((room) => room.id !== id),
                last7days: groupedChatRooms.last7days.filter((room) => room.id !== id),
                last30days: groupedChatRooms.last30days.filter((room) => room.id !== id),
            }));
        } catch (error) {
            console.error(error);
        }
    };

    // 채팅방 이름 변경
    const renameChatRoom = async (id: number, title: string) => {
        try {
            // PATCH 메서드로 채팅방의 제목을 변경한다.
            const response = await fetch(`/api/chatrooms/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            // 각 그룹에서 이름이 변경된 채팅방을 찾아 제목 업데이트
            const updatedChatRoom = await response.json();
            setGroupedChatRooms(({
                important: groupedChatRooms.important.map((room) =>
                    room.id === id ? { ...room, title: updatedChatRoom.title } : room
                ),
                today: groupedChatRooms.today.map((room) =>
                    room.id === id ? { ...room, title: updatedChatRoom.title } : room
                ),
                last7days: groupedChatRooms.last7days.map((room) =>
                    room.id === id ? { ...room, title: updatedChatRoom.title } : room
                ),
                last30days: groupedChatRooms.last30days.map((room) =>
                    room.id === id ? { ...room, title: updatedChatRoom.title } : room
                ),
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const sections: Section[] = [
        { title: '중요', key: 'important' },
        { title: '오늘', key: 'today' },
        { title: '지난 7일', key: 'last7days' },
        { title: '지는 30일', key: 'last30days' }
    ]

    return (
        <nav className={style.chatroom_nav}>
            <div className={style.nav_menu}>
                <Button
                    className={style.menu_btn}
                    isIconOnly
                    size='md'
                    color='primary'
                    variant="light"
                    endContent={<FontAwesomeIcon icon={faBars} />}
                    disableRipple
                >
                </Button>
                <Button
                    onClick={createChatRoom}
                    className={style.new_btn}
                    size='sm'
                    color='primary'
                    endContent={<FontAwesomeIcon icon={faPlus} />}
                    disableRipple
                >
                    새 채팅방
                </Button>
            </div>
            <ScrollShadow className={style.chatroom_scroll}>
                <Listbox className={style.chatroom_list}>
                    {sections.map(section => (
                        <ListboxSection
                            className={style.chatroom_section}
                            key={section.key}
                            title={section.title}
                            showDivider
                        >
                            {groupedChatRooms[section.key].map(chatRoom => (
                                <ListboxItem
                                    className={style.chatroom_item}
                                    key={chatRoom.id}
                                    onClick={e => handlNavigation(chatRoom.id, e)}
                                    onDoubleClick={e => handleDoubleClick(chatRoom)}
                                    draggable
                                    showDivider
                                    startContent={editingId === chatRoom.id ? (
                                        <Input
                                            value={editingTitle}
                                            onChange={handleTitleChange}
                                            onBlur={e => handleTitleSave(chatRoom.id)}
                                            onKeyDown={e => { (e.key === 'Enter') && handleTitleSave(chatRoom.id) }}
                                            autoFocus
                                            size='sm'
                                        />
                                    ) : (
                                        <span>
                                            {chatRoom.title}
                                        </span>
                                    )}
                                    endContent={(
                                        <Button
                                            onClick={e => deleteChatRoom(chatRoom.id)}
                                            isIconOnly
                                            size='lg'
                                            color='primary'
                                            variant="light"
                                            endContent={<FontAwesomeIcon icon={faClose} />}
                                            disableRipple
                                        />
                                    )}
                                />
                            ))}
                        </ListboxSection>
                    ))}
                </Listbox>
            </ScrollShadow>
        </nav>
    );
}