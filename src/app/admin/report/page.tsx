'use client';

import type { Report } from '@prisma/client'

import styles from '@/styles/dashboard.module.css';
import { useEffect, useState } from 'react';
import { getReports } from '@/action/report';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/table";
import { Pagination, PaginationItemType, PaginationItemRenderProps } from "@nextui-org/pagination";

import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function QuestionPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { reports, numPages } = await getReports({ page, pageSize: 20 });
      setReports(reports);
      setNumPages(numPages);
    }
    fetchData();
  }, [page]);

  return (
    <div className={styles.dashboard_window}>
      <h1 className='mb-4'>Question Page</h1>
      <Table aria-label="Example table with dynamic content"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              className='min-h-[500px]'
              isCompact
              showShadow
              showControls
              page={page}
              total={numPages}
              onChange={(page) => setPage(page)}
              renderItem={PageNationRenderItem}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Conversation ID</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Messages</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>ID</TableColumn>
          <TableColumn>User ID</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>Reply</TableColumn>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.conversationId}</TableCell>
              <TableCell>{report.title}</TableCell>
              <TableCell>{JSON.stringify(report.messages, null, 2)}</TableCell>
              <TableCell>{report.status}</TableCell>
              <TableCell>{report.type}</TableCell>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.userId}</TableCell>
              <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{"TODO"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function PageNationRenderItem({
  ref,
  key,
  value,
  isActive,
  onNext,
  onPrevious,
  setPage,
  className,
}: PaginationItemRenderProps) {
  if (value === PaginationItemType.NEXT) {
    return (
      <button key={key} className={"bg-default-200/50 min-w-8 w-8 h-8"} onClick={onNext}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    );
  }

  if (value === PaginationItemType.PREV) {
    return (
      <button key={key} className={"bg-default-200/50 min-w-8 w-8 h-8"} onClick={onPrevious}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
    );
  }

  if (value === PaginationItemType.DOTS) {
    return <button key={key} className={className}>...</button>;
  }

  return (
    <button
      key={key}
      ref={ref}
      className={isActive ? "bg-gray-800 text-white min-w-8 w-8 h-8" : "bg-default-200/50 min-w-8 w-8 h-8"}
      onClick={() => setPage(value)}
    >
      {value}
    </button>
  );
};