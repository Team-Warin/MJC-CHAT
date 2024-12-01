import { tool as createTool } from 'ai';
import { z } from 'zod';

const currentDateTool = createTool({
  description: '현재 시간을 보여주는 도구',
  parameters: z.object({}),
  execute: async () => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'long',
      timeZone: 'Asia/Seoul',
    };
    return new Date().toLocaleString('ko-KR', options);
  },
});

export const tools = {
  currentDate: currentDateTool,
};
