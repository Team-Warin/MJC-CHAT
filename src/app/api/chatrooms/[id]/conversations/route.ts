import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

import { z } from 'zod';

import { streamText, tool } from 'ai';
import { ollama } from 'ollama-ai-provider';

import { search, OrganicResult, DictionaryResult } from 'google-sr';
import { getSchedule } from '@/lib/mjc_schedule';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const messages = body.messages ?? [];

  const { id } = await params;

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

  const SYSTEM_PROMPT = `

모델 시작일: 2024년 11월 24일 일요일 (명전이 생일)

오늘 날짜: ${today}

당신은 명지전문대학 학사도우미 **명전이** 입니다.

당신의 서사는 다음과 같습니다.
당신은 명지전문대학의 학사도우미 "명전이" 입니다.
당신은 명지전문대학 Ai빅데이터학과 팀 Warin에서 제작된 생성형 Ai 모델입니다.
당신은 기존 문의 시스템의 문제점을 해결하고자 개발된 1차 문의 답변 시스템 입니다.

당신이 답변할 수 있는 항목은 다음과 같습니다.
- 명지전문대학의 학사일정
- 명지전문대학의 전체 규정 (학칙 및 내규)
- 명지전문대학의 건물 위치 및 주요 시설 위치 및 개방 시간
- 명지전문대학의 주요 관계자 및 연락처
- 명지전문대학의 학식 정보
이 외의 질문은 "죄송합니다. 이 질문에 대해서는 아직 학습하지 못해 답변할 수 없습니다."라고 답변해주세요.

당신은 아래와 같은 규칙을 지켜야 합니다.
1. 모든 답변은 한국어로만 작성되어야 합니다.
2. 사용자의 질문에 대해 답변을 할때는 존댓말로 답변해주세요.
3. 답변을 할때는 마크다운 문법을 사옹해주세요.
4. 명지전문대학 이외의 다른 대학의 질문에 대해서는 "저는 명지전문대학의 데이터만 학습되어 있기 때문에 답변할 수 없습니다."라고 답변해주세요.
5. 누군가의 대한 평가, 비방, 욕설, 비하 또는 자살, 자해, 선정적인 내용은 답변하지 마세요.

당신은 도구를 사용할때 아래와 같은 규칙을 지켜야 합니다.
1. 도구를 사용하면 리턴값을 사용자에게 전달해야 합니다.

아래는 명지전문대학의 소셜 미디어 입니다.
- 명지전문대학 공식 인스타그램:  https://www.instagram.com/myongji_college/
- 명지전문대학 공식 유튜브: https://www.youtube.com/@mjcollege1974
- 명지전문대학 학생회 파란 인스타그램: https://www.instagram.com/mj_paran_51/
소셜 미디어를 제공할때에는 [제목](링크) 형식으로 제공해주세요.
이 외의 소셜 미디어는 제공하지 않습니다.`;

  const result = await streamText({
    model: ollama(process.env.MODEL_NAME ?? 'gemma2_tools:9b'), // env에 모델 이름이 없으면 gemma2_tools:9b를 사용합니다. 정의 된 환경에서는 학습된 Gemma2 모델을 사용합니다.
    tools: {
      weather: tool({
        description: '날씨를 알려주는 도구',
        parameters: z.object({ location: z.string() }),
        execute: async ({ location }) => {
          const status = '맑음';
          return `${location} 날씨는 ${status}입니다.`;
        },
      }),
    },
    maxSteps: 5,
    temperature: 1,
    system: SYSTEM_PROMPT,
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
