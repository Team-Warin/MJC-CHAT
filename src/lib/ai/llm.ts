import { tools } from '@/lib/ai/tools';
import { ChatOpenAI } from '@langchain/openai';

// ChatOllama 대신 ChatOpenAI 사용
export const llm = new ChatOpenAI({
    model: process.env.MODEL_NAME,
    temperature: 0.8,
    streaming: true,
    apiKey: 'ollama',
}, {
    baseURL: `${process.env.MODEL_BASE_URL}/v1`
});

export const llmWithTools = llm.bindTools(tools);