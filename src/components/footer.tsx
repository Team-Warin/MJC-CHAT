import style from '@/styles/footer.module.css';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div>
        <Image
          src={'/svgs/mjc_signature.svg'}
          alt='logo'
          width={200}
          height={123}
        />
      </div>
      <div className={style.links}>
        <Link className={style.title} href='/'>
          명전이
        </Link>
        <Link href='/'>명전이 소개</Link>
      </div>
      <div></div>
    </footer>
  );
}
