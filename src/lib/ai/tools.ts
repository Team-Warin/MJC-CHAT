import { ToolNode } from "@langchain/langgraph/prebuilt";
import { tool } from "@langchain/core/tools";

import { z } from "zod";

export const searchTool = tool(async ({ query: _query }: { query: string }) => {
    console.log("tool calling", _query);
    // 임의
    return "Cold, with a low of 3℃";
}, {
    name: "search",
    description:
        "Use to surf the web, fetch current information, check the weather, and retrieve other information.",
    schema: z.object({
        query: z.string().describe("The query to use in your search."),
    }),
});

await searchTool.invoke({ query: "What's the weather like?" });

// 툴 목록
export const tools = [searchTool];

// 툴 노드
export const toolNode = new ToolNode(tools);