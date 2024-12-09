'use client';

import { getUsers } from "@/action/user";
import { UserTable } from "@/components/admin/usertable";
import { faFile, faGear, faInfo, faListDots, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

function useUserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
  const pageSize = 10;

  useEffect(() => {
    const loadUsers = async () => {
      const { users, totalPages } = await getUsers({
        page: currentPage,
        pageSize,
        query: searchQuery
      });
      setUsers(users);
      setTotalPages(totalPages);
    };

    loadUsers();
  }, [currentPage, searchQuery]);

  return { users, currentPage, totalPages, setCurrentPage, searchQuery, setSearchQuery };
}

export default function AdminUserMain() {
  const {
    users,
    currentPage,
    totalPages,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
  } = useUserTable();

  return (
    <>
      <h3 className="text-xl font-semibold">All Accounts</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-1 flex-wrap md:flex-nowrap">
          <Input
            className="w-full"
            placeholder="Search users"
          />

          <Button
            isIconOnly
            disableRipple
            variant="light"
            aria-label="Like">
            <FontAwesomeIcon icon={faGear} />
          </Button>

          <Button
            isIconOnly
            disableRipple
            variant="light"
            aria-label="Like">
            <FontAwesomeIcon icon={faTrash} />
          </Button>

          <Button
            isIconOnly
            disableRipple
            variant="light"
            aria-label="Like">
            <FontAwesomeIcon icon={faInfo} />
          </Button>

          <Button
            isIconOnly
            disableRipple
            variant="light"
            aria-label="Like">
            <FontAwesomeIcon icon={faListDots} />
          </Button>
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <Button color="primary">
            Add User
          </Button>
          <Button
            color="primary"
            startContent={<FontAwesomeIcon icon={faFile} />}
          >
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <UserTable
          users={users}
          currentPage={0}
          totalPages={0}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}