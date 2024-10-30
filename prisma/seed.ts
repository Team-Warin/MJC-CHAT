// 이 코드는 /seed.json을 읽어서 데이터베이스에 초기 데이터를 넣는 코드입니다
// 사용법 package.json 확인: npx prisma seed 
import { PrismaClient } from "@prisma/client";
import seedJson from '../seed.json';

// 
const prisma = new PrismaClient();

interface SeedData {
    chatRoom: { title: string; userId: number }[];
    conversation: { sender: string; message: string; chatroomId: number; previousConversationId: number }[];
    report: { conversationId: number; userId: number }[];
}

async function seedAll() {
    const tables = Object.keys(seedJson) as (keyof SeedData)[];

    for (const tableName of tables) {
        const data = seedJson[tableName];

        try {
            if ((prisma as any)[tableName]) {
                await (prisma as any)[tableName].createMany({ data });
                console.log(`테이블 ${tableName}에 데이터 삽입 완료.`);
            } else {
                console.error(`❗ 테이블 ${tableName}이(가) Prisma 스키마에 존재하지 않습니다.`);
            }
        } catch (error) {
            console.error(`❗ ${tableName} 데이터 삽입 중 오류 발생:`, error);
        }
    }
}

seedAll().catch(error => {
    console.error('데이터 시드 삽입 중 오류 발생:', error);
    process.exit(1);
});