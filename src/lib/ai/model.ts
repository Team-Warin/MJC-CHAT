import { tools } from '@/lib/ai/tools';
import { ChatOllama } from '@langchain/ollama';
import { ChatMistralAI } from "@langchain/mistralai";

// 올라마 모델
export const model = new ChatOllama({
    baseUrl: process.env.MODEL_BASE_URL,
    model: process.env.MODEL_NAME,
    temperature: 0.8,
    streaming: true
});

/*
// 미스트랄 API 모델, 올라마가 안되면 이걸로
export const model = new ChatMistralAI({
    model: process.env.MISTRAL_MODEL_NAME,
    temperature:0.8,
    maxRetries: 2,
});
*/

export const modelWithTools = model.bindTools(tools);