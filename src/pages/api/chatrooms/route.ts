'use server'

import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

// 채팅방 추가
export async function POST(req: Request) {
    const title = '새 채팅방'; // 임시
    const userId = 1;

    const newChatRoom = await prisma.chatRoom.create({
        data: { title, userId }
    });

    return NextResponse.json({});
}

// 채팅방 목록
export async function GET(req: Request) {
    const userId = 1; // 임시

    const chatRooms = await prisma.chatRoom.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' }
    });

    return NextResponse.json(chatRooms);
}