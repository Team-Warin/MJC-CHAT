'use server';

import prisma from '@/lib/prisma';
import { ChatRoom, Conversation } from '@prisma/client';

import { ChatOllama } from '@langchain/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';

import { createStreamableValue } from 'ai/rsc';

import { tool } from '@langchain/core/tools';
import { createToolCallingAgent, AgentExecutor } from 'langchain/agents';

// PrismaConversation -> 포맷팅
function formatPrismaConversation(conversation: Conversation) {
  return `${conversation.sender == 'user' ? 'human' : 'ai'}: ${
    conversation.message
  }`;
}

// 체인에게 메시지를 보내는 함수입니다, 스트림 데이터를 리턴합니다
export async function sendMessage(roomId: ChatRoom['id'], message: string) {
  ('use server');

  const stream = createStreamableValue();

  // 채팅 내역을 불러옵니다
  const previousConversations = await prisma.conversation.findMany({
    where: { chatRoomId: roomId },
    orderBy: { createdAt: 'asc' },
    take: 10,
  });

  const history = previousConversations
    .slice(0, -1)
    .map(formatPrismaConversation);

  // LLM 원본 모델입니다 (Ollama로 교체)
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

  // 시스템 프롬포트를 선언한다
  const SYSTEM_PROMPT_TEMPLATE =
    `당신은 명지전문대학 학사도우미 명전이 입니다.\n` +
    `{agent_scratchpad}\n` +
    `모든 답변은 한국어로 답변해야 합니다.`;

  const chatPrompt = ChatPromptTemplate.fromMessages([
    ['system', SYSTEM_PROMPT_TEMPLATE],
    ...history,
    ['human', message],
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

  (async () => {
    const streamEvents = agentExecutor.streamEvents(
      { input: message },
      { version: 'v2' }
    );

    for await (const item of streamEvents) {
      stream.update(JSON.parse(JSON.stringify(item, null, 2)));
    }

    stream.done();
  })();

  return { streamData: stream.value };
}
