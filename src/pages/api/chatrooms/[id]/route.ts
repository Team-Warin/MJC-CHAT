import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

// 채팅방 제거
export async function DELETE(req: Request) {
    const chatRoomId = 1; // 임시

    await prisma.chatRoom.delete({
        where: {
            id: chatRoomId
        }
    });

    return NextResponse.json({});
}