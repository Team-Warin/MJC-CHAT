'use server';

import prisma from '@/lib/prisma';

import { auth } from '@/auth';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function postReport(formData: FormData) {
  const session = await auth();

  if (!session) throw new Error('Unauthorized');

  const {
    title,
    chatRoomId,
    category,
    content,
  }: {
    title: string;
    chatRoomId: string;
    category: string;
    content: string;
  } = Object.fromEntries(formData.entries()) as unknown as {
    title: string;
    chatRoomId: string;
    category: string;
    content: string;
  };

  const messages = [
    {
      role: 'user',
      content: content,
      createdAt: new Date(),
    },
  ];

  await prisma.report.create({
    data: {
      userId: session.user.id,
      conversationId: parseInt(chatRoomId),
      type: parseInt(category),
      title,
      messages,
      createdAt: new Date(),
      status: 0,
    },
  });

  revalidatePath('/support');
  redirect('/support');
}



// 페이지네이션에 따라 신고 목록 가져오는 함수
export async function getReports({
  page = 1,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
}) {
  const session = await auth();

  if (!session) throw new Error('Unauthorized');

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const reports = await prisma.report.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    skip,
    take
  });

  const totalCount = await prisma.report.count();

  return {
    reports,
    page,
    numTotal: totalCount,
    numPages: Math.ceil(totalCount / pageSize),
  };
}

export async function updateReportStatus(reportId: number, newStatus: number) {
  const session = await auth();

  if (!session) throw new Error('Unauthorized');

  const updatedReport = await prisma.report.update({
    where: { id: reportId },
    data: { status: newStatus },
  });

  revalidatePath('/reports');
  return updatedReport;
}

export async function deleteReport(reportId: number) {
  const session = await auth();

  if (!session) throw new Error('Unauthorized');

  await prisma.report.delete({
    where: { id: reportId },
  });

  revalidatePath('/reports');
}