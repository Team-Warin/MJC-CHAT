// seed.json의 데이터로 초기데이터를 생성함
import prisma from '@/lib/prisma'
import seedJson from '@/../seed.json'

// 시드데이터의 데이터 타입 지정하기 위함
interface SeedData {
    user: { googleId: string }[];
    chatroom: { title: string; userId: number }[];
    userConversation: { message: string; chatroomId: number }[];
    botConversation: { message: string; metaData: {}; userconversationId: number }[];
    report: { description: string; botconversationId: number, userId: number}[];
}

// 데이터베이스에 시드 삽입하는 함수
async function seedAll() {
    // seedJson의 키(테이블 이름)를 가져와서 타입이 지정된 배열로 변환
    const tables = Object.keys(seedJson) as (keyof SeedData)[];

    // 모든 테이블에 대한 데이터를 비동기적으로 처리
    await Promise.all(
        tables.map(async tableName => {
            const data = seedJson[tableName]; // seedJson에서 각 데이터를 가져옴

            // Prisma Client에서 해당 테이블이 존재하는지 확인하고 데이터를 삽입
            if ((prisma as any)[tableName]) { // 타입스크립트의 타입 경고를 피하기 위해 any로 캐스팅
                // 해당 테이블에 시드 데이터 삽입
                await (prisma as any)[tableName].createMany({
                    data: data,
                });
            } else {
                console.error(`테이블 ${tableName} 스키마에 존재하지 않음.`);
            }
        })
    )
}

// HTTP GET 요청에 응답
export async function GET() {
    await seedAll();

    // 시드 데이터 생성 완료 메시지를 JSON으로 응답
    return Response.json({
        message: '데이터베이스에 시드 생성 완료',
    });
}