import { BaseMessage } from "@langchain/core/messages";
import { Annotation } from "@langchain/langgraph";
import { DocumentInterface } from "@langchain/core/documents";

// Graph 전역에서 공유하는 변수
export const State = Annotation.Root({
    messages: Annotation<BaseMessage[]>({
        reducer: (x, y) => x.concat(y),
        default: () => []
    })
});