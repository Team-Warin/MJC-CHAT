import { useState } from 'react';
import { Button } from "@nextui-org/react";
import { StatusBadge } from './StatusBadge';



interface InquiryItem {
    id: number;
    title: string;
    content: string;
    date: string;
    answer?: string;  // 답변 필드 추가
  }

  export default function Inquiries() {
      const generateRandomDate = () => {
      const start = new Date(2024, 0, 1);
      const end = new Date();
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
        .toISOString().split('T')[0];
    };

  const [searchTerm, setSearchTerm] = useState('');
  const [openItemId, setOpenItemId] = useState<number | null>(null);  
  const [inquiries] = useState<InquiryItem[]>([
    {
      id: 1,
      title: '안녕하세요 저는 명지전문대학에 재학 중인 1학년 학생입니다. 명전이가 귀여운 사실을 개발자 분들도 아시나요?',
      content: '명전이는 최고로 귀엽습니다.',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 2,
      title: '두 번째 문의',
      content: '두 번째 문의 내용입니다. 여기에는 중요한 정보가 담겨있습니다.',
      date: generateRandomDate()
    },
    {
      id: 3,
      title: '세 번째 문의',
      content: '세 번째 문의 대한 상세한 내용을 여기에 작성합니다.',
      date: generateRandomDate()
    },
    {
      id: 4,
      title: '네 번째 문의',
      content: '네 번째 문의 이 내용은 나중에 다시 확인하고 싶은 정보입니다.',
      date: generateRandomDate()
    }
  ]);
  const [filteredInquiries, setFilteredInquiries] = useState(inquiries);

  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ?
        <span key={index} className="bg-yellow-200">{part}</span> : part
    );
  };
  const handleSearch = () => {
    const searchResults = inquiries.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const contentMatch = item.content.toLowerCase().includes(searchTerm.toLowerCase());
      const answerMatch = item.answer?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      return titleMatch || contentMatch || answerMatch;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
    setFilteredInquiries(searchResults);
  };

  // 엔터 키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className="w-full">
      {/* 상단 헤더 바 */}
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <h2 className="text-xl font-semibold">문의 사항</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
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
  
      {/* 테이블 헤더 */}
      <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 border-b text-sm">
        <div className="col-span-1 pl-1">ID</div>
        <div className="col-span-8 text-center ml-10">제목</div>
        <div className="col-span-2 pr-10 text-right">작성일</div>
        <div className="col-span-1 text-right pr-7">상태</div>
      </div>
  
      {/* 문의사항 리스트 */}
      <div className="px-4 py-2">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-xl">
            검색 결과가 없습니다.
          </div>
        ) : (
          filteredInquiries.map((item) => (
            <div
              key={item.id}
              className="mb-3 bg-white rounded-xl shadow-sm cursor-pointer"
              onClick={() => setOpenItemId(openItemId === item.id ? null : item.id)}
            >
              {/* 항목 헤더 */}
              <div className="grid grid-cols-12 items-center p-4">
                <div className="col-span-1 text-gray-600">{item.id}</div>
                <div className="col-span-8">
                  <span className="text-base pl-4">
                    {item.title.length > 30 
                      ? highlightSearchTerm(item.title.substring(0, 30) + '...', searchTerm)
                      : highlightSearchTerm(item.title, searchTerm)}
                  </span>
                </div>
                <div className="col-span-2 text-right text-gray-500">{item.date}</div>
                <div className="col-span-1 flex justify-end">
                  <StatusBadge hasAnswer={Boolean(item.answer)} />
                </div>
              </div>
  
              {/* 펼쳐지는 내용 */}
              <div
              className="transition-all ease-in-out"
              style={{
              maxHeight: openItemId === item.id ? '1000px' : '0',
              opacity: openItemId === item.id ? 1 : 0,
              overflow: 'hidden',
              visibility: openItemId === item.id ? 'visible' : 'hidden',
              transitionDuration: '500ms'
            }}
          >
            <div className="px-4 pb-4 ml-[8.33%]">
              {/* 전체 제목 */}
              <div className="p-4 bg-gray-50 rounded-md mb-[15px]">
                {item.title}
              </div>
              {/* 내용 */}
              <div className="p-4 bg-gray-50 rounded-md">
                {item.content}
              </div>
              {/* 답변이 있는 경우 */}
              {item.answer && (
                <div className="p-4 bg-gray-50 rounded-md mt-[15px]">
                  {item.answer}
                </div>
              )}
            </div>
          </div>
        </div>
          ))
        )}
      </div>
    </div>
  );
}