'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';  // next-auth session 추가
import { Button } from "@nextui-org/react";
import { StatusBadge } from './StatusBadge';
import { getReports } from '@/action/report';
import { timeForToday } from '@/lib/support';
import { Prisma } from '@prisma/client';


interface Report {
  id: number;
  conversationId: number | null;
  userId: string;
  createdAt: Date;
  messages: Prisma.JsonValue; 
  status: number;
  title: string;
  type: number;
}

export default function Inquiries() {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();  // 현재 로그인한 사용자의 세션 정보
  const [reports, setReports] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    async function fetchReports() {
      if (!session?.user?.id) return;
      const result = await getReports({ page, pageSize });
      const userReports = result.reports.filter(
        report => report.userId === session.user.id
      );
      setReports(userReports);
      setFilteredReports(userReports);
    }
    fetchReports();
  }, [page, session?.user?.id]);

  if (!mounted) {
    return null; // 또는 로딩 상태를 표시
  }

  const handleSearch = () => {
    const searchResults = reports.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const messagesMatch = Array.isArray(item.messages) && (item.messages as any[]).some(msg => 
        msg.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return titleMatch || messagesMatch;
    });
    setFilteredReports(searchResults);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const PaginationControls = () => (
    <div className="flex justify-center gap-2 mt-4">
      <button 
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 border rounded-lg disabled:opacity-50"
      >
        이전
      </button>
      <span className="px-4 py-2">{page}</span>
      <button 
        onClick={() => handlePageChange(page + 1)}
        className="px-4 py-2 border rounded-lg"
      >
        다음
      </button>
    </div>
  );

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() 
        ? <span key={index} className="bg-yellow-200">{part}</span> 
        : part
    );
  };
  const formatContent = (content: string) => {
    return content
      .replace(/---채팅방---/g, '---채팅방---\n')
      .replace(/부적절 답변:/g, '부적절 답변:\n')
      .replace(/------------/g, '------------\n')
      .replace(/내용:/g, '내용: ')
      .replace(/---주의 사항---/g, '\n---주의 사항---\n');
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <h2 className="text-xl font-semibold">문의 사항</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="border rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:border-[#0086d1]"
          />
          <Button 
            color="primary" 
            size="md" 
            className="rounded-lg px-6" 
            onClick={handleSearch}
          >
            검색
          </Button>
        </div>
      </div>

      <div className="px-4 py-2">
        {filteredReports.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-xl">
            문의 내역이 없습니다.
          </div>
        ) : (
          filteredReports.map((item) => (
            <div 
              key={item.id} 
              className="mb-3 bg-white rounded-xl shadow-sm cursor-pointer"
              onClick={() => setOpenItemId(openItemId === item.id ? null : item.id)}
            >
              <div className="grid grid-cols-12 items-center p-4">
                <div className="col-span-1">{item.id}</div>
                <div className="col-span-8">
                  <span className="text-base pl-4">
                    {highlightSearchTerm(item.title)}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  {timeForToday(item.createdAt)}
                </div>
                <div className="col-span-1 flex justify-end">
                <StatusBadge hasAnswer={Array.isArray(item.messages) && item.messages?.length > 1} />
              </div>
              </div>
              {openItemId === item.id && (
                <div className="px-4 pb-4 ml-[8.33%]">
                  {Array.isArray(item.messages) && item.messages.map((msg: any, index: number) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-md mb-3">
                      <div className="text-sm text-gray-500 mb-2">
                        {msg.role === 'admin' ? '관리자' : '사용자'}
                      </div>
                      <div className="whitespace-pre-line leading-[1.2]"> {/* 줄 간격 관련 */}
                        {formatContent(msg.content)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <PaginationControls />
    </div>
  );
}
