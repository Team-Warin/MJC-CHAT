import style from '@/styles/footer.module.css';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const links = [
    [
      { title: '명전이', href: '/' },
      { title: '명전이 소개', href: '/#intro' },
    ],
    [
      { title: '명지전문대학', href: 'https://www.mjc.ac.kr/mjcIntro.do' },
      {
        title: '명지전문대학 입학안내',
        href: 'https://ipsi.mjc.ac.kr/mjcIndex.do',
      },
      {
        title: '명지전문대학 대학안내',
        href: 'https://www.mjc.ac.kr/mjcIndex.do',
      },
      {
        title: '명지전문대학 수강신청',
        href: 'https://sugang.mjc.ac.kr',
      },
      {
        title: '명지전문대학 E-Class',
        href: 'http://cyber.mjc.ac.kr/index.jsp',
      },
      {
        title: '명지전문대학 평생교육원',
        href: 'https://edu.mjc.ac.kr/main/main.html',
      },
    ],
  ];

  return (
    <footer className={style.footer}>
      <div className={style.link_container}>
        <div>
          <Image
            src={'/svgs/mjc_signature.svg'}
            alt='logo'
            width={200}
            height={123}
          />
        </div>
        {links.map((link, i) => (
          <div key={i} className={style.links}>
            {link.map((item, j) => (
              <Link
                className={j === 0 ? style.title : style.sub}
                key={j}
                href={item.href}
              >
                {item.title}
                {j !== 0 && <hr className={style.line} />}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <hr className={style.divider} />
      <div className={style.copyright}>
        <p>ⓒ Team. Warin & Myungji College</p>
      </div>
    </footer>
  );
}
