import { tools } from '@/lib/ai/tools';
import { ChatOllama } from '@langchain/ollama';
import { ChatOpenAI } from '@langchain/openai';

// 올라마 모델
export const model = new ChatOpenAI({
    model: process.env.MODEL_NAME,
    temperature: 0.8,
    streaming: true,
    apiKey: 'ollama',
}, {
    baseURL: `${process.env.MODEL_BASE_URL}/v1`
});


export const modelWithTools = model.bindTools(tools);