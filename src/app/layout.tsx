import type { Metadata } from 'next';

import './globals.css';

import { auth } from '@/auth';

import { Inter } from 'next/font/google';

import Navbar from '@/components/navbar';
import FirstModal from '@/components/firstmodal';
import NextAuthProvider from '@/components/providers/NextAuthProvider';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export const metadata: Metadata = {
  title: '명전이 | 명지전문대학 학사도우미',
  description: '명지전문대학 학사도우미 명전이',
};

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang='ko'>
      <body className={inter.className} data-theme='light'>
        <NextAuthProvider session={session}>
          <Navbar session={session} />
          {session?.user?.nickname === '' ? <FirstModal /> : null}
          {children}
          {modal}
        </NextAuthProvider>
      </body>
    </html>
  );
}
