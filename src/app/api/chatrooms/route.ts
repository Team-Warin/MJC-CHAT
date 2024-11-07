import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from 'next/server';

import { ChatRoom } from "@prisma/client";

interface GroupedChatRooms {
    important: ChatRoom[];
    today: ChatRoom[];
    last7days: ChatRoom[];
    last30days: ChatRoom[];
}

// 채팅방 추가한다.
export async function POST(req: NextRequest) {
    try {
        const title = '새 채팅방'; // Temporary value
        const userId = 'cm3728hbk0000q14vmgio5lz3'; // Temporary value

        const newChatRoom = await prisma.chatRoom.create({
            data: { title, userId }
        });

        return NextResponse.json(newChatRoom);
    } catch (error) {
        return NextResponse.json(
            { message: error },
            { status: 500 }
        )
    }
}

// 채팅방 목록 가져온다.
export async function GET(req: NextRequest) {
    try {
        const userId = 'cm3728hbk0000q14vmgio5lz3'; // Temporary value
        const groupByDate = (req.nextUrl.searchParams.get('group') === "true");

        const chatRooms = await prisma.chatRoom.findMany({
            where: { userId },
            orderBy: [
                { createdAt: 'asc' },
                { updatedAt: 'desc' }
            ]
        });

        // ?group=true일 경우 그룹화해서 전송한다.
        if (!groupByDate) {
            return NextResponse.json(chatRooms);
        }

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

        return NextResponse.json(groupedChatRooms);
    } catch (error) {
        return NextResponse.json(
            { message: error },
            { status: 500 }
        )
    }
}