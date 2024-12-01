'use client';

import type { Report } from '@prisma/client'

import { getReports, replyReport, deleteReport } from '@/action/report';

import styles from '@/styles/dashboard.module.css';
import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { Pagination, PaginationItemType, PaginationItemRenderProps } from "@nextui-org/pagination";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'

import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faComment as faCommentRegular,
  faTrashCan as faTrashCanRegular
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';

// 메시지 타입 정의
type ReplyMessage = {
  from: string;
  content: string;
};

export default function QuestionPage() {
  const [reports, setReports] = useState<Report[]>([]); // 신고 목록 상태
  const [page, setPage] = useState(1); // 현재 페이지
  const [numPages, setNumPages] = useState(0); // 총 페이지 수

  // Reply 및 Delete 모달 상태 관리
  const { isOpen: isReplyOpen, onOpen: onReplyOpen, onClose: onReplyClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const [selectedReport, setSelectedReport] = useState<Report>(); // 선택된 신고
  const [replyContent, setReplyContent] = useState(''); // 응답할 메시지
  const [replyMessages, setReplyMessages] = useState<ReplyMessage[]>([]); // 메시지 대화 기록

  // 페이지 변경 시 신고 목록 로드
  useEffect(() => {
    async function fetchData() {
      const { reports, numPages } = await getReports({ page, pageSize: 10 });
      setReports(reports);
      setNumPages(numPages);
    }
    fetchData();
  }, [page]);

  // 선택된 신고의 메시지 로드
  useEffect(() => {
    setReplyMessages(
      Array.isArray(selectedReport?.messages) ?
        selectedReport.messages as ReplyMessage[] : []
    );
  }, [selectedReport]);

  // Reply 모달 열기
  const handleReplyModalOpen = ({ report }: { report: Report }) => {
    setSelectedReport(report);
    onReplyOpen();
  }

  // Delete 모달 열기
  const handleDeleteModalOpen = ({ report }: { report: Report }) => {
    setSelectedReport(report);
    onDeleteOpen();
  };

  // Reply 전송
  const handleReplySubmit = async () => {
    if (selectedReport && !!replyContent.trim()) {
      await replyReport({ reportId: selectedReport.id, content: replyContent });
      setReplyContent('');
      setReplyMessages((prev) => ([
        ...prev,
        { from: 'admin', content: replyContent }
      ]))
    }
  }

  // Delete 확인 및 처리
  const handleDeleteConfirm = async () => {
    if (selectedReport) {
      try {
        await deleteReport(selectedReport.id); // 서버에서 삭제
        setReports((prev) => prev.filter((report) => report.id !== selectedReport.id)); // 로컬 상태에서 삭제
        alert(`Report ID: ${selectedReport.id} has been deleted.`);
      } catch (error) {
        console.error('Failed to delete the report:', error);
      } finally {
        onDeleteClose();
      }
    }
  };

  return (
    <div className={styles.dashboard_window}>
      {/* Reply 모달 */}
      <ReplyModal
        isOpen={isReplyOpen}
        onClose={onReplyClose}
        selectedReport={selectedReport}
        // setSelectedReport={setSelectedReport}
        replyContent={replyContent}
        setReplyContent={setReplyContent}
        replyMessages={replyMessages}
        // setReplyMessages={setReplyMessages}
        handleReplySubmit={handleReplySubmit}
      />

      {/* Delete 확인 모달 */}
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        selectedReport={selectedReport}
        handleDeleteConfirm={handleDeleteConfirm}
      />

      <h1 className='mb-4'>Report Page</h1>

      <Table aria-label="Example table with dynamic content">
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
          <TableColumn>Delete</TableColumn>
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
                  onClick={() => handleReplyModalOpen({ report })}
                >
                  <FontAwesomeIcon icon={faCommentRegular} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  isIconOnly
                  disableRipple
                  size='sm'
                  variant='light'
                  color='danger'
                  onClick={() => handleDeleteModalOpen({ report })}
                >
                  <FontAwesomeIcon icon={faTrashCanRegular} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex w-full mt-4 justify-center">
        <Pagination
          isCompact
          showShadow
          showControls
          page={page}
          total={numPages}
          onChange={(page) => setPage(page)}
          renderItem={PageNationRenderItem}
        />
      </div>
    </div>
  );
}

// 페이지네이션 커스텀
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

function ReplyModal({
  isOpen,
  onClose,
  selectedReport,
  // setSelectedReport,
  replyContent,
  setReplyContent,
  replyMessages,
  // setReplyMessages,
  handleReplySubmit
}: {
  isOpen: boolean,
  onClose: () => void,
  selectedReport?: Report
  // setSelectedReport: SetStateAction<Report>,
  replyContent: string,
  setReplyContent: Dispatch<SetStateAction<string>>,
  replyMessages: ReplyMessage[],
  // setReplyMessages: SetStateAction<ReplyMessage[]>,
  handleReplySubmit: () => Promise<void>
}) {
  // 메시지 컨테이너의 참조 생성
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // 메시지 변경시 스크롤
  useEffect(() => {
    if (messageContainerRef && messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [replyMessages]);

  // 엔터키
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      await handleReplySubmit();
    }
  };

  // 요칭 & 닫기
  const handleSubmitAndClose = async () => {
    await handleReplySubmit();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">오류 문의 ID: {selectedReport?.id}</ModalHeader>
            <ModalBody>
              <div
                className="overflow-y-auto max-h-60"
                ref={messageContainerRef}
              >
                {replyMessages.map((msg, index) => (
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
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Enter your reply"
                fullWidth
                onKeyDown={handleKeyDown}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={handleSubmitAndClose}>
                보내기
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

function DeleteModal({
  isOpen,
  onClose,
  selectedReport,
  handleDeleteConfirm
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedReport?: Report;
  handleDeleteConfirm: () => void
}) {
  // 요청 & 닫기
  const handleDeleteAndClose = async () => {
    await handleDeleteConfirm();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>삭제 확인</ModalHeader>
        <ModalBody>
          {`정말로 ID: ${selectedReport?.id}를 삭제하시겠습니까?`}
        </ModalBody>
        <ModalFooter>
          <Button color="default" onPress={onClose}>
            Cancel
          </Button>
          <Button color="danger" onPress={handleDeleteAndClose}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}