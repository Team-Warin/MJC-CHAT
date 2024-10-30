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



// 채팅방 이름 변경
export async function PUT(req: Request) {
    const chatRoomId = 1;
    const title = "새 채팅방";

    await prisma.chatRoom.update({
        where: {
            id: chatRoomId
        },
        data: {
            title: title
        }
    });

    return NextResponse.json({});
}