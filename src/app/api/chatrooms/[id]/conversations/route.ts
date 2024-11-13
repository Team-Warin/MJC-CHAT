import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

import { Ollama } from '@langchain/ollama';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from "@langchain/core/prompts";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";

import { LangChainAdapter } from 'ai';
import { Message as VercelChatMessage } from "ai";

// VercelChatMessage -> 텍스트 형태로 변환한다.
const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
};


// 시스템 프롬포트를 선언한다
const SYSTEM_PROMPT_TEMPLATE = `오늘 날짜는 {today} 입니다.

당신은 명지전문대학 학사도우미 명전이 입니다.

이전 대화의 내역은 다음과 같습니다.
{chat_history}

당신은 아래의 문서를 참고할 수 있습니다.
{docs}

사용자의 질문은 다음과 같습니다.
{input}

주의사항:
- 사용자는 학생 입니다.
- 필요한 서류 또는 절차에 대한 답변은 개조식으로 답변해주세요.
- 질문을 거절할때는 짧고 간결하게 거절해주세요.
- 없는 규정에 대해서는 규정에 없어 가능합나다. 라고 답변해주세요.
- 최대한 친절하고 자세가하게 답변을 해주세요. 하지만 중복된 답변은 하지말아 주세요.
- 사용자에게 규정에 대한 확인 및 이해를 요청하지 말고 규정에 대해서 설명해 주세요.
- 수시, 정시, 실기고사, 등록금 납부일, 학사일정 같은 날짜에 민감한 정보는 홈페이지를 참고해달라고 해주세요.
- 교수님 또는 학생의 평가, 모독 또는 개인정보 요청 또는 지나치게 폭력적이거나 선정적인 질문은 명전이 서비스 규정에 따라 짧고 단호하게 거절해야합니다.
- 명지전문대학 이외의 대학교에 대한 질문은 제공하기 어렵다고 거절해주세요. 특히 명지대학교와 명지대는 다른 대학교 입니다.
You are a helpful assistant.`;

// 
export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        
    } catch (error) {
        
    }
    const body = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const chatRoomId = Number(params.id);

    const systemPrompt = PromptTemplate.fromTemplate(SYSTEM_PROMPT_TEMPLATE);

    // 올라마 (Ollama) 모델을 불러온다 (로컬에 Ollama 설치 필요)
    const model = new Ollama({
        model: 'mistalite',
        temperature: 0,
        maxRetries: 2
    });

    const outputParser = new StringOutputParser();
    const chain = systemPrompt.pipe(model).pipe(outputParser)

    const stream = await chain.stream({
        chat_history: formattedPreviousMessages.join("\n"),
        input: currentMessageContent,
        today: '11월 13일',
        docs: '문서 없음'
    }); 

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