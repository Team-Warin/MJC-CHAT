import { tool as createTool } from "ai";
import { z } from "zod";

import { Chroma } from "@langchain/community/vectorstores/chroma";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { tree } from "next/dist/build/templates/app-page";

const currentDateTool = createTool({
  description: "show the date or current time",
  parameters: z.object({}),
  execute: async () => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      weekday: "long",
      timeZone: "Asia/Seoul",
    };

    console.log("tool call (currentDateTool)");

    return new Date().toLocaleString("ko-KR", options);
  },
});

const rulesAndInternalRegulations = createTool({
  description:
    "it will respond by looking up documents regarding school regulations and academic internal regulations." +
    "use this tool for general school responses",
  parameters: z.object({
    query: z.string().describe("school-related question entered by user"),
  }),
  execute: async ({ query }: { query: string }) => {
    try {
      const embeddings = new HuggingFaceInferenceEmbeddings({
        model: "intfloat/multilingual-e5-large-instruct",
        apiKey: process.env.HF_TOKEN
      });

      const vectorStore = new Chroma(embeddings, {
        collectionName: "pdf",
        url: `http://${process.env.CHROMA_BASE_URL}:8000`,
        collectionMetadata: {
          "hnsw:space": "cosine",
        },
      });

      console.log(query);
      const results = await vectorStore.similaritySearch(query, 3);
      console.log(results);

      const formattedResults = results.map((doc, idx) => ({
        chunk: doc.pageContent,
        metadata: doc.metadata,
      }));

      console.log(formattedResults);

      return {
        succcess: true,
        results: formattedResults,
      };
    } catch (error) {
      console.error(error);
      return {
        succcess: false,
        results: [],
      };
    }
  },
});

export const tools = {
  currentDate: currentDateTool,
  rules: rulesAndInternalRegulations,
};

export type Tools = keyof typeof tools;
