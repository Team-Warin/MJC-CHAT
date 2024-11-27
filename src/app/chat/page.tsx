import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { cookies } from 'next/headers';

export default async function ChatMain() {
  // 사용자 인증 정보 가져오기
  const session = await auth();
  const cookieStore = await cookies();

  const userId = session?.user.id;
  const tempUserId = !session ? cookieStore.get('TempUserId')?.value ?? '0' : undefined;

  // 기존 채팅방 확인
  const chatRoom = await prisma.chatRoom.findFirst({
    where: {
      OR: [
        { userId: userId },
        { tempUserId: tempUserId },
      ],
    },
    orderBy: { createdAt: "desc" }, // 최신 채팅방 우선
  });

  // 기존 채팅방이 있으면 해당 URL로 리다이렉트, 없으면 생성
  if (chatRoom) {
    redirect(`/chat/${chatRoom.id}`);
  } else {
    const newChatRoom = await prisma.chatRoom.create({
      data: {
        userId: userId,
        tempUserId: tempUserId,
        title: '환영합니다'
      }
    });

    redirect(`/chat/${newChatRoom.id}`);
  }
}