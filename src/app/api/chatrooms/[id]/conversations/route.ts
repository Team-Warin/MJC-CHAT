import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

import { Ollama } from '@langchain/ollama';
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { StringOutputParser } from '@langchain/core/output_parsers';

import { LangChainAdapter } from 'ai';
import { Message as VercelChatMessage } from "ai";

const llm = new Ollama({
    model: 'mistalite',
    temperature: 0,
    maxRetries: 2
});

const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
};

// 
export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const body = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const chatRoomId = Number(params.id);

    const outputParser = new StringOutputParser();
    const chain = llm.pipe(outputParser);

    const stream = await chain.stream(currentMessageContent);

    /* 주석해제하여 터미널에서 확인
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
        console.log(`${chunk}|`);
    }
    */

    return LangChainAdapter.toDataStreamResponse(stream);
}

// 
export async function GET(
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