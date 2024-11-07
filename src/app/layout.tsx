import type { Metadata } from 'next';

import './globals.css';
import schedule from 'node-schedule';

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const job = schedule.scheduleJob('0 * * * *', function (fireDate) {
    console.log(
      'This job was supposed to run at ' +
        fireDate +
        ', but actually ran at ' +
        new Date()
    );
  });

  return (
    <html lang='ko'>
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <Navbar session={session} />
          {session?.user?.nickname === '' ? <FirstModal /> : null}
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
