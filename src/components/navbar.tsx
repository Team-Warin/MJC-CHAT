'use client';

import style from '@/styles/navbar.module.css';

import Link from 'next/link';
import Image from 'next/image';

import {
  motion,
  useScroll,
  useAnimate,
  useMotionValueEvent,
} from 'framer-motion';

import { useState } from 'react';

/** Navbar Component */
export default function Navbar() {
  const { scrollY } = useScroll();
  const [navbar, animate] = useAnimate();

  const [navbarBg, setNavbarBg] = useState(false);

  let lastScrollY = 0;
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest < 300) {
      setNavbarBg(false);
      animate(
        navbar.current,
        { y: 0, opacity: 1 },
        {
          y: { stiffness: 100 },
          opacity: { ease: 'easeIn' },
          duration: 1.25,
        }
      );
    } else if (latest >= 300) {
      setNavbarBg(true);
      if (lastScrollY < latest) {
        animate(
          navbar.current,
          { y: -75, opacity: 0 },
          {
            y: { type: 'spring', stiffness: 100 },
            opacity: { ease: 'easeIn' },
            duration: 1.25,
          }
        );
      } else if (lastScrollY - latest >= 10) {
        animate(
          navbar.current,
          { y: 0, opacity: 1 },
          {
            y: { stiffness: 100 },
            opacity: { ease: 'easeIn' },
            duration: 1.25,
          }
        );
      }
    }
    lastScrollY = latest;
  });

  return (
    <motion.div
      ref={navbar}
      className={`${style.container} ${navbarBg ? 'bg-white shadow-md' : ''}`}
    >
      <Link href='/' className={style.logo}>
        <Image src={'/mjc.webp'} alt='logo' width={30} height={30} />
        <h1 className='text-mjcblue'>명전이</h1>
      </Link>
      <div className={style.auth}>
        <Link href='/'>로그인</Link>
      </div>
    </motion.div>
  );
}
