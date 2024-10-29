'use server'

import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next";

// API 설계
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        res.status(200).json({});
    }
}


// // 채팅방 추가
// export async function POST(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const title = '새 채팅방';
//     const userId = 1;

//     const newChatRoom = await prisma.chatRoom.create({
//         data: { title, userId }
//     });

//     return res.json({});
// }

// // 채팅방 목록
// export async function GET(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const userId = 1;

//     const chatRooms = await prisma.chatRoom.findMany({
//         // where: { userId },
//         orderBy: { createdAt: 'asc' }
//     });

//     return res.json(chatRooms);
// }