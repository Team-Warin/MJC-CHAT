'use client';

import type { Report } from '@prisma/client'

import { getReports, replyReport } from '@/action/report';

import styles from '@/styles/dashboard.module.css';
import { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { Pagination, PaginationItemType, PaginationItemRenderProps } from "@nextui-org/pagination";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, UseDisclosureProps } from '@nextui-org/modal'

import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faComment as faCommentRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';

export default function QuestionPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedReport, setSelectedReport] = useState<Report>();

  useEffect(() => {
    async function fetchData() {
      const { reports, numPages } = await getReports({ page, pageSize: 10 });
      setReports(reports);
      setNumPages(numPages);
    }
    fetchData();
  }, [page]);

  const handleModalOpen = ({ report }: { report: Report }) => {
    setSelectedReport(report);
    onOpen();
  }

  return (
    <div className={styles.dashboard_window}>
      <ReplyModal
        isOpen={isOpen}
        onClose={onClose}
        selectedReport={selectedReport}
      />

      <h1 className='mb-4'>Report Page</h1>
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
          {/* <TableColumn>Delete</TableColumn> */}
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.conversationId}</TableCell>
              <TableCell>{report.title}</TableCell>
              <TableCell>{`${(report.messages as []).length} 개`}</TableCell>
              <TableCell>{report.status}</TableCell>
              <TableCell>{report.type}</TableCell>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.userId}</TableCell>
              <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button
                  isIconOnly
                  disableRipple
                  size='sm'
                  variant='light'
                  onClick={() => handleModalOpen({ report })}
                >
                  <FontAwesomeIcon icon={faCommentRegular} />
                </Button>
              </TableCell>
              {/* <TableCell>
                <Button
                  isIconOnly
                  disableRipple
                  size='sm'
                  variant='light'
                  onClick={() => handleModalOpen({ report })}
                >
                  <FontAwesomeIcon icon={faCommentRegular} />
                </Button>
              </TableCell> */}
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

// 테이블 안만들고 JSON 버전으로 임시
type ReplyMessage = {
  from: string;
  content: string;
}

function ReplyModal({
  isOpen,
  onClose,
  selectedReport
}: {
  isOpen: UseDisclosureProps['isOpen'],
  onClose: UseDisclosureProps['onClose'],
  selectedReport?: Report
}) {
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState<ReplyMessage[]>([]);

  useEffect(() => {
    if (selectedReport) {
      setMessages(selectedReport.messages as ReplyMessage[] || []);
    }
  }, [selectedReport]);

  const handleSubmit = async () => {
    if (selectedReport) {
      await replyReport({ reportId: selectedReport.id, content });
      setContent('');
      setMessages((prev) => ([
        ...prev,
        { from: 'admin', content }
      ]))
    }
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      await handleSubmit();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">오류 문의 ID: {selectedReport?.id}</ModalHeader>
            <ModalBody>
              <div className="overflow-y-auto max-h-60">
                {messages.map((msg, index) => (
                  <div key={index} className="mb-2">
                    <strong>{msg.from}:</strong> {msg.content}
                  </div>
                ))}
              </div>

              <div className="flex py-2 px-1 mb-4">
                <Input
                  labelPlacement='outside'
                  className='h-[20px] w-[80px] mr-4'
                  label="type"
                  type="number"
                  value={`${selectedReport?.type}`}
                />

                <Input
                  labelPlacement='outside'
                  className='h-[20px] w-[80px]'
                  label="status"
                  type="number"
                  value={`${selectedReport?.status}`}
                />
              </div>

              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your reply"
                fullWidth
                onKeyDown={handleKeyDown}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={async (e) => {
                await handleSubmit();
                onClose();
              }}>
                보내기
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}