import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from 'next/server';

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

// 채팅방 추가
export async function POST(
    req: NextRequest,
) {
    const title = '새 채팅방'; // 임시값
    const userId = 1; // 임시값

    const newChatRoom = await prisma.chatRoom.create({
        data: { title, userId }
    });

    return NextResponse.json(newChatRoom);
}

// 채팅방 목록
export async function GET(
    req: NextRequest
) {
    const userId = 1; // 임시값 

    // 채팅방 목록 가져옴
    const chatRooms = await prisma.chatRoom.findMany({
        where: { userId },
        orderBy: [
            { createdAt: 'asc' },
            { updatedAt: 'desc' }
        ]
    });

    // URL 파라미터로 ?group=true 여부 확인
    const group = req.nextUrl.searchParams.get('group') === "true";

    if (group) {
        // 그룹화 로직
        const today = new Date();

        const groupedChatRooms: GroupedChatRooms = {
            important: [],
            today: [],
            last7days: [],
            last30days: []
        };

        chatRooms.forEach(chatRoom => {
            const createdDate = new Date(chatRoom.createdAt);
            const diffInDays = (today.getTime() - createdDate.getTime()) / (1000 * 3600 * 24);

            if (chatRoom.important) {
                groupedChatRooms.important.push(chatRoom);
            } else if (diffInDays < 1) {
                groupedChatRooms.today.push(chatRoom);
            } else if (diffInDays < 7) {
                groupedChatRooms.last7days.push(chatRoom);
            } else if (diffInDays < 30) {
                groupedChatRooms.last30days.push(chatRoom);
            }
        });

        // group=true일 경우 그룹화해서 반환, false일경우 일반 반환
        return NextResponse.json(groupedChatRooms);
    } else {
        return NextResponse.json(chatRooms)
    }
}