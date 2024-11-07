import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from 'next/server';

// GET 요청을 받으면 채팅방의 모든 채팅을 불러옴
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const chatroomId = Number(params.id);

        const conversations = await prisma.conversation.findMany({
            where: { chatroomId }
        });
    } catch (error) {
        res.status(500).json({});
    }
}