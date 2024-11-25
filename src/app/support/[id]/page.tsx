import { auth } from '@/auth';
import prisma from '@/lib/prisma';

import style from '@/styles/support.module.css';

import Link from 'next/link';
import Image from 'next/image';

import { redirect } from 'next/navigation';

import { Code } from '@nextui-org/code';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { status, timeForToday } from '@/lib/support';
import { ChatRoom } from '@prisma/client';

export default async function Support({ params }: { params: { id: string } }) {
  const session = await auth();

  const { id } = await params;

  let chatRoom: ChatRoom | undefined = undefined;

  const report = await prisma.report.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (report?.conversationId) {
    chatRoom = await prisma.chatRoom.findUnique({
      where: { id: report.conversationId },
    });
  }

  if (!report) return redirect('/support');
  else if (
    report.userId !== session?.user.id &&
    session?.user.roles.includes('admin')
  )
    return redirect('/support');

  const messages: { role: string; content: string; createdAt: string }[] =
    report.messages as { role: string; content: string; createdAt: string }[];

  return (
    <main className={style.support_content_detail}>
      <div className={style.support_content_detail_header_back}>
        <Link href='/support'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </div>
      <div className={style.support_content_detail_header}>
        <h1>{report.title}</h1>
        <Code
          size='lg'
          className='w-fit flex items-center gap-2'
          color={status[report.status].color}
        >
          <div
            className={`w-3 h-3 shadow-sm rounded-full ${
              status[report.status].style
            }`}
          />
          <p>{status[report.status].text}</p>
        </Code>
      </div>
      <div className={style.support_content_detail_content}>
        {messages.map((message, i) => (
          <div key={i} className={style.support_conversation_item}>
            <div className={style.support_conversation_header}>
              <Image
                src={session?.user.avatar ?? '/avatar/user.webp'}
                alt='user'
                width={30}
                height={30}
              />
              <p>
                {session?.user.nickname} -{' '}
                {timeForToday(new Date(message.createdAt))}
              </p>
            </div>
            <div className={style.support_conversation_content}>
              <Link href={`/chat/${chatRoom?.id}`}>
                <Code
                  className={style.support_conversation}
                >{`#${chatRoom?.title}`}</Code>
              </Link>
              <p
                className='mt-4'
                dangerouslySetInnerHTML={{
                  __html: message.content.replace(/\n/g, '<br />'),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
