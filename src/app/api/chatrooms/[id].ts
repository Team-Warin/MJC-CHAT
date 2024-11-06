import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from 'next/server';

// 채팅방 삭제
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const chatroomId = Number(params.id);

    await prisma.chatRoom.delete({
        where: { id: chatroomId }
    });

    return NextResponse.json({});
}

// 채팅방 제목, 정렬순서, 중요도 변경
export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const chatroomId = Number(params.id);
    const data = await req.json();

    const updateData: any = {};

    // 요청에 따른 필드만 변경
    if (data.title !== undefined) {
        updateData.title = data.title;
    }
    if (data.sortOrder !== undefined) {
        updateData.sortOrder = data.sortOrder;
    }
    if (data.important !== undefined) {
        updateData.important = data.important;
    }

    const updatedChatroom = await prisma.chatRoom.update({
        where: { id: chatroomId },
        data: updateData
    });

    return NextResponse.json(updatedChatroom);
}