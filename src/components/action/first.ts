'use server';

import { auth } from '@/auth';

import prisma from '@/lib/prisma';

export async function firstAction({
  userType,
  nickName,
}: {
  userType: Set<string>;
  nickName: string;
}) {
  const session = await auth();

  if (!session) return false;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (user) {
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        nickname: nickName,
        roles: user.roles
          .concat(
            Array.from(userType).map((role) =>
              role === '학생' ? 'student' : role === '교수' ? 'professor' : role
            )
          )
          .filter((role, index, self) => self.indexOf(role) === index),
      },
    });

    if (updatedUser) return true;
  }

  return false;
}
