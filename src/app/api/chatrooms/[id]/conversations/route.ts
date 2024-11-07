import prisma from "@/lib/prisma";
import { NextResponse, NextRequest} from "next/server";

// get 요청하면, 대화 목록 받기
export async function GET (
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const chatRoomId = Number(params.id);
        const searchParams = req.nextUrl.searchParams;
    
        const page = Number(searchParams.get('page'));
        const limit = Number(searchParams.get('limit'));
        const offset = (page * limit);

        const conversations = await prisma.conversation.findMany({
            where: { chatRoomId },
            skip: offset,
            take: limit
        });

        return NextResponse.json(conversations);
    } catch (error) {
        return NextResponse.json(
            { message: error },
            { status: 500 }
        );
    }
}

// POST 요청하면 대화 생성, AI 모델 응답
export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const chatRoomId = Number(params.id);
        const body = await req.json();
        const message = body.message;

        if (!message) {
            throw Error("json request needs 'message' field");
        }

        const msgAI = await llm.invoke(message);

        const convUser = await prisma.conversation.create({
            data: {
                chatRoomId,
                message,
                sender: 'user'
            }
        });

        const convAI = await prisma.conversation.create({
            data: {
                chatRoomId,
                message: msgAI,
                sender: 'ai'
            }
        });

        return NextResponse.json([convUser, convAI]);
    } catch (error) {
        return NextResponse.json(
            { message: error },
            { status: 500 }
        )
    }
}