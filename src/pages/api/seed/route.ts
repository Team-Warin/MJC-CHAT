// 초기데이터 생성용, 실제 배포에서는 전부 주석처리
import prisma from '@/lib/prisma'
import seedJson from '@/../seed.json'

// 시드데이터 seed.json의 형태
interface SeedData {
    user: { googleId: string }[];
    chatRoom: { title: string; userId: number }[]; 
    conversation: { sender: string; message: string; chatroomId: number; previousConversationId: number }[]; 
    report: { conversationId: number; userId: number }[];
}

// 데이터베이스에 시드 삽입
async function seedAll() {
    const tables = Object.keys(seedJson) as (keyof SeedData)[];

    await Promise.all(
        tables.map(async tableName => {
            const data = seedJson[tableName]; 

            if ((prisma as any)[tableName]) { 
                await (prisma as any)[tableName].createMany({
                    data: data,
                });
            } else {
                console.error(`테이블 ${tableName} 스키마에 존재하지 않음.`);
            }
        })
    )
}

// HTTP GET 요청이 들어오면 초기데이터를 생성함
export async function GET() {
    await seedAll();

    return Response.json({
        message: '데이터베이스에 시드 생성 완료',
    });
}