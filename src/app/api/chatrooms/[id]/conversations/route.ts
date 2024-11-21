import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

import { ChatOllama } from '@langchain/ollama';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { tool } from '@langchain/core/tools';
import { createToolCallingAgent, AgentExecutor } from 'langchain/agents';
import { Message as VercelChatMessage } from 'ai';
import { LangChainAdapter } from 'ai';

import { OpenAIEmbeddings } from '@langchain/openai';

// 시스템 프롬포트를 선언한다
const SYSTEM_PROMPT_TEMPLATE = `당신은 명지전문대학 학사도우미 명전이 입니다.

당신은 아래의 "전체 규정" 및 "공식 홈페이지 데이터"를 참고할 수 있습니다.
사용자의 질문에 대해 정학환 정보를 전달해야할 때는 아래의 정보를 참고해야 합니다.
{documents}

모든 답변은 한국어로 답변해야 합니다.`;

// VercelChatMessage -> 텍스트 형태로 변환한다.
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const embeddings = new OpenAIEmbeddings({
  modelName: 'text-embedding-3-large',
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;

  const { id } = await params;

  // NextJS 15에서는 [id] 다음에 conversations endpoint가 있기때문에 Promise없이 바로 사용할 수 없다.
  const chatRoomId = Number(id);

  // 올라마 (Ollama) 모델을 불러온다 (로컬에 Ollama 설치 필요)
  const llm = new ChatOllama({
    model: 'mistral',
    temperature: 1.5,
    maxRetries: 2,
    repeatPenalty: 1.1,
  });

  const tools = [
    tool(
      async () => {
        return new Date().toISOString();
      },
      {
        name: 'current_date',
        description: 'current date',
      }
    ),
  ];

  const chatHistory: (AIMessage | HumanMessage)[] = [];
  formattedPreviousMessages.forEach((message: string) => {
    const [role, content] = message.split(': ');
    if (role === 'user') {
      chatHistory.push(new HumanMessage(content));
    } else {
      chatHistory.push(new AIMessage(content));
    }
  });

  const chatPrompt = ChatPromptTemplate.fromMessages([
    ['system', SYSTEM_PROMPT_TEMPLATE],
    ...chatHistory,
    ['human', '{input}'],
  ]);

  const agent = await createToolCallingAgent({
    llm,
    tools,
    prompt: chatPrompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });

  const stream = await agentExecutor.stream(
    {
      input: currentMessageContent,
      documents: '',
    },
    {
      callbacks: [
        {
          async handleChainEnd(outputs) {
            const aiMessage = outputs.output ?? '';

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
