import style from '@/styles/support.module.css';

import Link from 'next/link';
import Image from 'next/image';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { Code } from '@nextui-org/code';
import { Button } from '@nextui-org/button';

export default async function SupportPage() {
  const session = await auth();

  const reports = await prisma.report.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const status: {
    [key: number]: {
      color: 'primary' | 'warning' | 'success';
      text: string;
      style: string;
    };
  } = {
    0: { color: 'primary', text: '등록됨', style: 'bg-blue-600' },
    1: { color: 'warning', text: '처리중', style: 'bg-yellow-600' },
    2: { color: 'success', text: '완료', style: 'bg-green-600' },
  };

  function timeForToday(value: Date) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }

  return (
    <div>
      <div className={style.support_bg}>
        <div className={style.support_bg_text}>
          <h1>고객 지원 센터</h1>
        </div>
        <div className='w-full h-[35vw]'>
          <Image src='/avif/support-BG.avif' alt='support' fill={true} />
        </div>
      </div>
      <div className={style.support_content}>
        <div className={style.support_content_text}>
          <h2>문의 내역</h2>
          <Link href='/support/write'>
            <Button
              color='primary'
              startContent={<FontAwesomeIcon icon={faPenToSquare} />}
            >
              문의 등록
            </Button>
          </Link>
        </div>
        <hr />
        <div className={style.support_content_list}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>제목</th>
                <th>작성일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.title}</td>
                  <td>{timeForToday(report.createdAt)}</td>
                  <td className='flex items-center justify-center'>
                    <Code
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
