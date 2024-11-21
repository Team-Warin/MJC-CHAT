import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

import { z } from 'zod';

import { streamText, tool } from 'ai';
import { ollama } from 'ollama-ai-provider';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const messages = body.messages ?? [];

  const { id } = await params;

  const result = await streamText({
    model: ollama('mjc'),
    tools: {
      currentTime: tool({
        description: 'return current time',
        parameters: z.object({}),
        execute: async () => new Date().toISOString(),
      }),
    },
    temperature: 1.5,
    maxSteps: 10,
    system:
      `당신은 명지전문대학 학사도우미 명전이 입니다.\n` +
      `당신은 마크다운 문법을 사용할 수 있습니다.\n` +
      `당신은 한국어로만 답변해야합니다.`,
    messages,
  });

  return result.toDataStreamResponse();
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
    const offset = page * limit;

    const conversations = await prisma.conversation.findMany({
      where: { chatRoomId },
      skip: offset,
      take: limit,
    });

    return NextResponse.json(conversations);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
