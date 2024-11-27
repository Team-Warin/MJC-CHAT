'use client';

import type { Report } from '@prisma/client';

import { Code } from '@nextui-org/code';
import { useRouter } from 'next/navigation';

import { status, timeForToday } from '@/lib/support';

export default function SupportTable({ reports }: { reports: Report[] }) {
  const router = useRouter();

  return (
    <>
      {reports.map((report) => (
        <tr
          key={report.id}
          onClick={() => router.push(`/support/${report.id}`)}
        >
          <td>{report.id}</td>
          <td>{report.title}</td>
          <td>{timeForToday(report.createdAt)}</td>
          <td className='flex items-center justify-center'>
            <Code
              className='w-fit flex items-center gap-2'
              color={status[report.status].color}
            >
              <div
                className={`w-3 h-3 shadow-sm rounded-full ${
                  status[report.status].style
                }`}
              />
              <p>{status[report.status].text}</p>
            </Code>
          </td>
        </tr>
      ))}
    </>
  );
}
