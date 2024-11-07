// get 요청하면, 대화 목록 받기

import prisma from "@/lib/prisma";
import { NextResponse, NextRequest} from "next/server";

export async function GET (
    req: NextRequest,
    { params }: { params: { id: string }}
) {
    const id = Number(params.id);
    const searchParams = req.nextUrl.searchParams;

    const page = Number(searchParams.get('page'));
    const limit = Number(searchParams.get('limit'));

    console.log(page, limit);

    try {
        const conversations = await prisma.conversation.findMany( {
            where: {chatRoomId: id}
        });
        return NextResponse.json(conversations);
    } catch (e) {
        console.log(e);
        return NextResponse.json({e:"Failed to fetch conversations"}, {status : 500});
    }
}