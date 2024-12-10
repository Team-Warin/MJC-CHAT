'use client';

import { usePathname, useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { Session } from "next-auth";

import { useDisclosure } from "@nextui-org/modal";

import MyPageModal from "./mypageModal";

export default function MyPageModalWrapper({ session }: { session: Session | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState('/');

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (pathname === '/mypage' && !isOpen) {
      onOpen();
      router.replace(prevPathname); // 페이지 이동을 막기 위해 이전 페이지로 되돌아간다.
    } else {
      console.log('log pathname', prevPathname);
      setPrevPathname(pathname);
    }
  }, [pathname]);

  return (
    <MyPageModal
      isOpen={isOpen}
      onClose={onClose}
    />
  )
}