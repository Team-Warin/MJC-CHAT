// seed.json을 읽고 초기데이터 생성함
import prisma from '@/lib/prisma'

export async function GET() {
    return Response.json({
        message:
            '데이터베이스에 시드 생성 완료',
    });
}