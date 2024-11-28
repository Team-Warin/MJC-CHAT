import type { Message } from "ai";

import prisma from "@/lib/prisma";

import { z } from 'zod';

import { isAIMessageChunk } from "@langchain/core/messages";

import { createOllama } from 'ollama-ai-provider';
import { streamText, tool, convertToCoreMessages } from 'ai';
import { LangChainAdapter } from 'ai';

import { getSchedule } from '@/lib/mjc_schedule';
import { formatMessage, convertVercelMessageToLangChainMessage, convertLangChainMessageToVercelMessage, formatMessageJson } from '@/lib/utils';

import { graph } from '@/lib/ai/graph';
import { output } from "framer-motion/client";

export async function POST(request: Request) {
    const { id, messages } = await request.json();

    const chatRoomId = Number(id);
    const formattedMessages = messages.map(formatMessageJson);

    const streamEvents = await graph.streamEvents(
        { messages: formattedMessages },
        {
            version: "v2",
            callbacks: [{
                async handleChainEnd(outputs, runId, parentRunId, tags, kwargs) {
                    const outputMessages = outputs.messages ?? [];
                    const userMessage = outputMessages[outputMessages.length - 2]?.content;
                    const aiMessage = outputMessages[outputMessages.length - 1]?.content;
                    
                    // 데이터베이스에 채팅 내역 저장
                    try {
                        await prisma.conversation.createMany({
                            data: [
                                {
                                    chatRoomId,
                                    sender: 'user',
                                    message: userMessage
                                },
                                {
                                    chatRoomId,
                                    sender: 'ai',
                                    message: aiMessage
                                },
                            ]
                        });
                    } catch (error) {
                        console.error(error);
                    }
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
                        controller.enqueue(aiMessage);
                    }
                }
            }
            controller.close();
        }
    });

    return LangChainAdapter.toDataStreamResponse(stream);
}