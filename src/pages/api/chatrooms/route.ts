import prisma from "@/lib/prisma"
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'API is working' });
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