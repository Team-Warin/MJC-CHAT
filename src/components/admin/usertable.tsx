'use client';

import React from 'react';
import { User } from '@prisma/client';

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Pagination } from '@nextui-org/pagination';
import PageNationRenderItem from './pagenationItem';

export function UserTable({
  users,
  currentPage,
  totalPages,
  onPageChange,
}: {
  users: User[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className=" w-full flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableColumn>User</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex w-full mt-4 justify-center">
        <Pagination
          total={totalPages}
          initialPage={1}
          page={currentPage}
          onChange={onPageChange}
          renderItem={PageNationRenderItem}
        />
      </div>
    </div>
  );
};

