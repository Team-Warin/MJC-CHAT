import { tool } from "@langchain/core/tools";
import { z } from "zod";

// 학칙, 학사 내규 툴
export const ruleTool = tool(
    async ({ query: _query }: { query: string }) => {
        console.log("학칙, 학사 내규 Tool called with query:", _query);
        return "학칙, 학사 내규 정보는 아직 개발 중입니다."; // 임시 응답
    },
    {
        name: "rule",
        description: "Fetch school rules and policies.",
        schema: z.object({
            query: z.string().describe("Query about school rules and policies."),
        }),
    }
);

// 학식 툴
export const cafeteriaTool = tool(
    async ({ query: _query }: { query: string }) => {
        console.log("Cafeteria Tool called with query:", _query);
        return "오늘의 학식 메뉴는 비빔밥과 김치찌개입니다."; // 임시 응답
    },
    {
        name: "cafeteria",
        description: "Fetch cafeteria menu and operating hours.",
        schema: z.object({
            query: z.string().describe("Query about cafeteria menu or information."),
        }),
    }
);

// 대중교통/셔틀 툴
export const transportTool = tool(
    async ({ query: _query }: { query: string }) => {
        console.log("Transport Tool called with query:", _query);
        return "셔틀버스는 매 시간 정각에 출발합니다."; // 임시 응답
    },
    {
        name: "transport",
        description: "Fetch transport and shuttle bus schedules.",
        schema: z.object({
            query: z.string().describe("Query about transport or shuttle schedules."),
        }),
    }
);

// 전화번호 툴
export const contactTool = tool(
    async ({ query: _query }: { query: string }) => {
        console.log("Contact Tool called with query:", _query);
        return "학교 주요 전화번호는 02-123-4567입니다."; // 임시 응답
    },
    {
        name: "contact",
        description: "Fetch contact information for school departments.",
        schema: z.object({
            query: z.string().describe("Query about contact information."),
        }),
    }
);

// 캠퍼스 위치 툴
export const campusTool = tool(
    async ({ query: _query }: { query: string }) => {
        console.log("Campus Tool called with query:", _query);
        return "캠퍼스 지도는 여기를 참고하세요: https://school-map.example.com"; // 임시 응답
    },
    {
        name: "campus",
        description: "Fetch campus map and location information.",
        schema: z.object({
            query: z.string().describe("Query about campus map or locations."),
        }),
    }
);

// 학과 정보 툴
export const departmentTool = tool(
    async ({ query: _query }: { query: string }) => {
        console.log("Department Tool called with query:", _query);
        return "AI학과는 미래관 3층에 위치합니다."; // 임시 응답
    },
    {
        name: "department",
        description: "Fetch department information.",
        schema: z.object({
            query: z.string().describe("Query about department information."),
        }),
    }
);

// 학교 정보 툴
export const generalInfoTool = tool(
    async ({ query: _query }: { query: string }) => {
        console.log("General Info Tool called with query:", _query);
        return "학교는 1950년에 설립된 명문 대학교입니다."; // 임시 응답
    },
    {
        name: "general_info",
        description: "Fetch general information about the school.",
        schema: z.object({
            query: z.string().describe("Query about general school information."),
        }),
    }
);

// 학사 일정 툴
export const scheduleTool = tool(
    async ({ query: _query }: { query: string }) => {
        console.log("Schedule Tool called with query:", _query);
        return "2024학년도 학사 일정: 개강일 3월 2일, 종강일 6월 15일."; // 임시 응답
    },
    {
        name: "schedule",
        description: "Fetch academic schedule information.",
        schema: z.object({
            query: z.string().describe("Query about academic schedules."),
        }),
    }
);

export const tools = [
    ruleTool,
    cafeteriaTool,
    transportTool,
    contactTool,
    campusTool,
    departmentTool,
    generalInfoTool,
    scheduleTool,
];