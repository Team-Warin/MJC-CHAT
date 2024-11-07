'use client';

import { Prisma } from '@prisma/client';

import Image from 'next/image';

import { Code } from '@nextui-org/code';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/table';

type User = Prisma.UserGetPayload<{
  select: {
    avatar: true;
    nickname: true;
    email: true;
    roles: true;
    createdAt: true;
  };
}>;

export default function TableComponent({ users }: { users: User[] }) {
  const keys = Object.keys(users[0]) as (keyof User)[];

  return (
    <Table aria-label='Example static collection table'>
      <TableHeader>
        {keys.map((key) => (
          <TableColumn key={key}>{key}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.email}>
            {keys.map((key) => {
              let children: React.ReactNode = String(user[key]);
              if (key === 'avatar') {
                children = (
                  <Image
                    className='rounded-xl'
                    src={user.avatar!}
                    alt='avatar'
                    width={32}
                    height={32}
                  />
                );
              } else if (key === 'roles') {
                children = user.roles.includes('admin') ? (
                  <Code color='danger'>관리자</Code>
                ) : user.roles.includes('student') ? (
                  <Code color='success'>학생</Code>
                ) : (
                  <Code color='warning'>교수</Code>
                );
              } else if (key === 'createdAt') {
                children = `${user.createdAt.getFullYear()}년 ${
                  user.createdAt.getMonth() + 1
                }월 ${user.createdAt.getDate()}일`;
              }

              return (
                <TableCell key={key}>
                  <div className='flex justify-center'>{children}</div>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
