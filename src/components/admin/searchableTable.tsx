'use client'

import React from "react";
import { useEffect, useState } from "react";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faGear,
  faInfo,
  faListDots,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import CustomPagination from "@/components/admin/pagination";

export interface FetchDataParams {
  page: number;
  pageSize: number;
  query?: string;
};

export interface FetchDataResult<T> {
  data: T[],
  page: number,
  total: number,
  totalPages: number
};

export default function SearchableTable<T>({
  tableName,
  columns,
  fetchData,
  pageSize,
}: {
  tableName: string,
  columns: (keyof T)[],
  fetchData: ({ page, pageSize, query }: FetchDataParams) => Promise<FetchDataResult<T>>,
  pageSize: number
}) {
  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const { data, total } = await fetchData({ page: currentPage, pageSize, query: searchQuery });
      setData(data);
      setTotalPages(Math.ceil(total / pageSize));
    };
    loadData();
  }, [currentPage, searchQuery]);

  return (
    <>
      <h3 className="text-xl font-semibold">Table of {tableName}</h3>
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
            Add Row
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
        <div className=" w-full flex flex-col gap-4">
          <Table>
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={String(column)}>{String(column)}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={idx}>
                  {columns.map((column) => (
                    <TableCell key={String(column)}>{String(row[column])}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex w-full mt-4 justify-center">
            <CustomPagination
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}