import { END, START, StateGraph } from "@langchain/langgraph";
import { AIMessage } from "@langchain/core/messages";

import { StateAnnotation } from "@/lib/ai/state";
import { modelWithTools } from "@/lib/ai/model";
import { toolNode } from "@/lib/ai/tools";

export const routeMessage = (
    state: typeof StateAnnotation.State
) => {
    const { messages } = state;
    console.log("라우터 에이전트: ", messages);
    const lastMessage = messages[messages.length - 1] as AIMessage;
    // If no tools are called, we can finish (respond to the user)
    if (!lastMessage?.tool_calls?.length) {
        return END;
    }
    // Otherwise if there is, we continue and call the tools
    return "tools";
};

export const callModel = async (
    state: typeof StateAnnotation.State,
) => {
    // For versions of @langchain/core < 0.2.3, you must call `.stream()`
    // and aggregate the message from chunks instead of calling `.invoke()`.
    const { messages } = state;
    const responseMessage = await modelWithTools.invoke(messages);
    console.log("모델 콜링 에이전트: ", responseMessage);
    return { messages: [responseMessage] };
};

export const workflow = new StateGraph(StateAnnotation)
    .addNode("agent", callModel)
    .addNode("tools", toolNode)
    .addEdge(START, "agent")
    .addConditionalEdges("agent", routeMessage)
    .addEdge("tools", "agent");

export const agent = workflow.compile();