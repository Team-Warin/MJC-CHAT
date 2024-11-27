import type { Message } from "ai";

import prisma from "@/lib/prisma";

import { z } from 'zod';

import { isAIMessageChunk } from "@langchain/core/messages";

import { createOllama } from 'ollama-ai-provider';
import { streamText, tool, convertToCoreMessages } from 'ai';
import { LangChainAdapter } from 'ai';

import { getSchedule } from '@/lib/mjc_schedule';
import { formatMessage, convertVercelMessageToLangChainMessage, convertLangChainMessageToVercelMessage, formatMessageJson } from '@/lib/utils';

import { input } from "@nextui-org/theme";

import { agent } from '@/lib/ai/agent';
import { model } from "@/lib/ai/model";

export async function POST(request: Request) {
    const { id, messages }: {
        id: number; // 채팅방 ID를 인자로 함께 받습니다
        messages: Array<Message>;
    } = await request.json();

    const chatRoomId = Number(id);

    /*
    const coreMessages = convertToCoreMessages(messages);
    const userMessage = getMostRecentUserMessage(coreMessages);
    const userMessageContent = userMessage?.content.toString();

    console.log(coreMessages);

    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'long',
        timeZone: 'Asia/Seoul',
    };
    const today = now.toLocaleString('ko-KR', options);

    */

    const previousMessages = messages.map(formatMessageJson);
    const currentMessageContent = messages[messages.length - 1].content;

    // console.log(previousMessages, currentMessageContent);

    const streamEvents = await agent.streamEvents(
        { messages: previousMessages },
        {
            version: "v2",
            callbacks: [{
                async handleChainEnd(outputs, runId, parentRunId, tags, kwargs) {

                }
            }]
        },
    );

    // 청크 데이터 뜯어서, 메시지부분만 넣은 새로운 스트림 만든다
    const stream = new ReadableStream({
        async start(controller) {
            for await (const { event, data, tags } of streamEvents) {
                if (event === 'on_chat_model_stream') {
                    if (!!data.chunk.content) {
                        const aiMessage = convertLangChainMessageToVercelMessage(data.chunk);
                        console.log(aiMessage);
                        controller.enqueue(aiMessage);
                    }
                }
            }
            controller.close();
        }
    });

    return LangChainAdapter.toDataStreamResponse(stream);
}