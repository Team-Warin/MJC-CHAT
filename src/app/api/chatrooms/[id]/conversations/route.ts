import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

import { Ollama } from '@langchain/ollama';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';

import { LangChainAdapter } from 'ai';
import { Message as VercelChatMessage } from 'ai';

import { getSchedule } from '@/lib/mjc_schedule';

// VercelChatMessage -> 텍스트 형태로 변환한다.
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
  } catch (error) {}
  const body = await req.json();
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;
  const chatRoomId = Number(params.id);

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const schedule = await getSchedule({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  // 시스템 프롬포트를 선언한다
  const SYSTEM_PROMPT_TEMPLATE = `당신은 명지전문대학 학사도우미 "명전이" 입니다.
당신은 학사에 대한 질문만 답변할 수 있습니다. 그렇지 않은 경우 "저는 학사에 관한 데이터만 학습했습니다. 다른 질문은 답변할 수 없습니다." 라고 답변해주세요.
당신은 "명지전문대학"이외의 대학교에 대한 질문은 "저는 명지전문대학의 데이터만 학습하였기 때문에 다른 대학교에 대한 질문은 답변할 수 없습니다." 라고 답변해주세요. 특히 명지대학교와 명지대는 다른 대학교 입니다.
당신은 교수님 또는 학생의 대한 평가, 모독 또는 개인정보 요청 또는 지나치게 폭력적이거나 선정적인 질문에는 "명전이 서비스 규정에 따라 이 질문에 대한 답변을 제공할 수 없습니다."라고 답변해주세요.

오늘 날짜는 ${today} 입니다.

당신은 아래의 학사일정을 사용자에게 제공할 수 있습니다.
${schedule}


You are a helpful assistant.`;

  // 올라마 (Ollama) 모델을 불러온다 (로컬에 Ollama 설치 필요)
  const model = new Ollama({
    model: 'mjc',
    temperature: 0.8,
    maxRetries: 2,
    repeatPenalty: 1.1,
  });

  const chatHistory: [string, string][] = [];
  formattedPreviousMessages.forEach((message: string) => {
    const [role, content] = message.split(': ');
    chatHistory.push([
      role.replace('user', 'human').replace('assistant', 'ai'),
      content,
    ]);
  });

  const chatPrompt = ChatPromptTemplate.fromMessages([
    ['system', SYSTEM_PROMPT_TEMPLATE],
    ...chatHistory,
    ['human', currentMessageContent],
  ]);

  const outputParser = new StringOutputParser();
  const chain = chatPrompt.pipe(model).pipe(outputParser);

  const stream = await chain.stream(
    {},
    {
      callbacks: [
        {
          async handleChainEnd(outputs, runId, parentRunId, tags, kwargs) {
            const aiMessage = (outputs.output ?? '').replaceAll('\n', '');

            // DB에 사용자 메시지와 AI 응답 저장
            await prisma.conversation.createMany({
              data: [
                {
                  chatRoomId,
                  sender: 'user',
                  message: currentMessageContent,
                },
                {
                  chatRoomId,
                  sender: 'ai',
                  message: aiMessage,
                },
              ],
            });
          },
        },
      ],
    }
  );

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
