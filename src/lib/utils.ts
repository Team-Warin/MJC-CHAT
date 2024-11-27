import type { CoreMessage, Message } from 'ai';

import {
  AIMessage,
  BaseMessage,
  ChatMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";

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

// ai-sdk 메시지 => LangChain 메시지
export const convertVercelMessageToLangChainMessage = (message: Message) => {
  if (message.role === "user") {
    return new HumanMessage(message.content);
  } else if (message.role === "assistant") {
    return new AIMessage(message.content);
  } else {
    return new ChatMessage(message.content, message.role);
  }
};

// LangChain 메시지 => ai-sdk 메시지
export const convertLangChainMessageToVercelMessage = (message: BaseMessage) => {
  if (message._getType() === "human") {
    return { content: message.content, role: "user" };
  } else if (message._getType() === "ai") {
    return {
      content: message.content,
      role: "assistant",
      tool_calls: (message as AIMessage).tool_calls,
    };
  } else {
    return { content: message.content, role: "assistant" };
  }
};

// ai-sdk 메시지 -> 포맷 
export const formatMessage = (message: Message) => {
  return `${message.role}: ${message.content}`;
};

// ai-sdk 메시지 -> 포맷 
export const formatMessageJson = (message: Message) => {
  return {
    role: (message.role === "user") ? "user" : "ai",
    content: message.content
  };
};