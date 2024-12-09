'use server';

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

/** 유저 목록 불러오는 함수 */
export async function getUsers({
  page,
  pageSize,
  query
}: {
  page: number,
  pageSize: number,
  query?: string
}) {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const where: Prisma.UserWhereInput = query
    ? {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { nickname: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ],
    }
    : {};

  const users = await prisma.user.findMany({ skip: offset, take: limit, where });

  const totalUsers = await prisma.user.count();
  const totalPages = Math.ceil(totalUsers / pageSize);

  return {
    users,
    page,
    totalUsers,
    totalPages
  };
}

/** */