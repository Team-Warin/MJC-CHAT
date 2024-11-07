// get 요청하면, 대화 목록 받기

import prisma from "@/lib/prisma";
import { NextResponse, NextRequest} from "next/server";

export async function GET (
    req: NextRequest,
) {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    console.log(searchParams.toString());
    console.log(id);
    
    try {
        const conversations = await prisma.conversation.findMany( {
            where: {chatroomId: id}
        });
        return NextResponse.json(conversations);
    } catch (e) {
        console.log(e);
        return NextResponse.json({e:"Failed to fetch conversations"}, {status : 500});
    }
}