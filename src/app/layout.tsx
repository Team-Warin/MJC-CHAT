import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: '명전이 | 명지전문대학 학사도우미',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
