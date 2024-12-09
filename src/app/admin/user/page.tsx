'use client';

import Prisma from "@prisma/client";
import { useEffect, useState } from "react";

import { getUsers } from "@/action/user";

import SearchableTable, { FetchDataParams } from "@/components/admin/searchableTable";

async function fetchUsersFromAction({ page, pageSize, query }: FetchDataParams) {
  const {
    users: data,
    totalUsers: total,
    totalPages
  } = await getUsers({ page, pageSize, query });

  return { data, page, total, totalPages };
}

export default function AdminUserMain() {
  const [users, setUsers] = useState<Prisma.User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10;

  useEffect(() => {
    const loadUsers = async () => {
      const { users, totalPages } = await getUsers({
        page: currentPage,
        pageSize,
        query: searchQuery,
      });
      setUsers(users);
      setTotalPages(totalPages);
    };

    loadUsers();
  }, [currentPage, searchQuery]);

  return (
    <>
      <SearchableTable<Prisma.User>
        tableName="User"
        columns={["id", "name", "email"]}
        fetchData={fetchUsersFromAction}
        pageSize={10}
      />
    </>
  );
}