'use client';

import type { Session } from 'next-auth';

import style from '@/styles/navbar.module.css';

import Link from 'next/link';
import Image from 'next/image';

import { signOut } from 'next-auth/react';

import {
  motion,
  useScroll,
  useAnimate,
  useMotionValueEvent,
} from 'framer-motion';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { Avatar } from '@nextui-org/avatar';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';

/** Navbar Component */
export default function Navbar({ session }: { session: Session | null }) {
  const { scrollY } = useScroll();
  const [navbar, animate] = useAnimate();

  const menus = [{ name: '문의', href: '/support' }];

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

  const pathname = usePathname();

  if (
    pathname?.startsWith('/auth/') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/api') ||
    pathname?.startsWith('/chat') ||
    pathname?.startsWith('/support/write')
  )
    return null;

  return (
    <motion.div
      ref={navbar}
      className={`${style.container} ${
        pathname?.startsWith('/support') ? 'bg-white !relative' : ''
      } ${navbarBg ? 'bg-white shadow-md' : ''}`}
    >
      <Link href='/' className={style.logo}>
        <Image src={'/webps/mjc.webp'} alt='logo' width={30} height={30} />
        <h1 className='text-mjcblue'>명전이</h1>
      </Link>
      <div className={style.menu}>
        {menus.map((menu) => {
          if (!session && menu.href.startsWith('/support')) return null;

          return (
            <Link href={menu.href} key={menu.href}>
              <p className={style.hoverText}>{menu.name}</p>
            </Link>
          );
        })}
        <div className={style.auth}>
          {session ? (
            <UserMenu session={session} />
          ) : (
            <LoginButton pathname={pathname} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function UserMenu({
  session,
  size = 'md',
}: {
  session: Session | null;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          radius='lg'
          size={size}
          src={session?.user?.avatar ?? ''}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label='User-Menu'
        variant='faded'
        onAction={(key) => {
          if (key === 'logout') {
            signOut();
          }
        }}
      >
        <DropdownItem
          key='mypage'
          startContent={<FontAwesomeIcon icon={faUser} />}
        >
          마이페이지
        </DropdownItem>
        <DropdownItem
          key='logout'
          className='text-danger'
          color='danger'
          startContent={<FontAwesomeIcon icon={faRightFromBracket} />}
        >
          로그아웃
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export function LoginButton({ pathname }: { pathname: string | null }) {
  return (
    <Link
      href={{
        pathname: '/auth/login',
        query: { callbackurl: pathname },
      }}
    >
      <p className={style.hoverText}>로그인</p>
    </Link>
  );
}
