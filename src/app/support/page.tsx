import style from '@/styles/support.module.css';

import Link from 'next/link';
import Image from 'next/image';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@nextui-org/button';
import SupportTable from '@/components/support/table';

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
              <SupportTable reports={reports} />
            </tbody>
          </table>
          {reports.length === 0 ? (
            <div className='p-5 w-full h-full flex items-center justify-center'>
              <h1>문의 내역이 없습니다.</h1>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
