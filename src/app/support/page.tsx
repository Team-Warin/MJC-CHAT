import style from '@/styles/support.module.css';

import Link from 'next/link';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@nextui-org/button';

export default function SupportPage() {
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
      </div>
    </div>
  );
}
