import { BaseMessage } from "@langchain/core/messages";
import { Annotation } from "@langchain/langgraph";

// 랭 그래프 전역 공유 변수
export const StateAnnotation = Annotation.Root({
    messages: Annotation<BaseMessage[]>({
        reducer: (x, y) => x.concat(y),
    }),
});