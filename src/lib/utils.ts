import type {
  CoreMessage,
  Message,
} from 'ai';

import type { Conversation } from '@prisma/client';

export function convertToUIMessages(
  conversations: Array<Conversation>,
): Array<Message> {
  return conversations.reduce((UIMessages: Array<Message>, conversation) => {
    // TODO: 툴 변환

    UIMessages.push({
      id: String(conversation.id),
      role: (conversation.sender === 'user') ?
        'user' :
        'assistant',
      content: conversation.message,
    });

    return UIMessages;
  }, []);
}

export function getMostRecentUserMessage(messages: Array<CoreMessage>) {
  const userMessages = messages.filter((message) => message.role === 'user');
  return userMessages.at(-1);
}