import prisma from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from 'next';

// GET 요청을 받으면 채팅방의 모든 채팅을 불러옴
export async function GET(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const id = Number(req.query.id);

    try {
        const conversations = await prisma.conversation.findMany({
            where: { chatroomId: id }
        });
    } catch (error) {
        res.status(500).json({});
    }
}