import {
    StateGraph,
    MessagesAnnotation,
    END,
    START
} from "@langchain/langgraph";
import { ToolNode } from '@langchain/langgraph/prebuilt';

import { tools } from '@/lib/ai/tools';
import { llmWithTools } from '@/lib/ai/llm';
import { State } from '@/lib/ai/state';

// Nodes
export const toolNode = new ToolNode(tools);

const callLLM = async (state: typeof MessagesAnnotation.State) => {
    const { messages } = state;
    const response = await llmWithTools.invoke([
        ...messages
    ]);
    return { messages: response };
}

// Conditional Edges
const shouldContinue = (state: typeof MessagesAnnotation.State) => {
    const { messages } = state;
    const lastMessage = messages[messages.length - 1];
    if ("tool_calls" in lastMessage && Array.isArray(lastMessage.tool_calls) && lastMessage.tool_calls?.length) {
        return "tools";
    }
    return END;
}

// Graph
export const workflow = new StateGraph(State)
    .addNode("agent", callLLM)
    .addNode("tools", toolNode)
    .addEdge(START, "agent")
    .addConditionalEdges("agent", shouldContinue, ["tools", END])
    .addEdge("tools", "agent");

export const graph = workflow.compile();