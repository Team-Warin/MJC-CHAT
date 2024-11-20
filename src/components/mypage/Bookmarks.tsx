import { useState } from 'react';
import { Button } from "@nextui-org/react";

interface BookmarkItem {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function Bookmarks() {
  const generateRandomDate = () => {
    const start = new Date(2024, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
      .toISOString().split('T')[0];
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const [bookmarks] = useState<BookmarkItem[]>([
    {
      id: 1,
      title: '휴학 신청은 어떻게? 내가 곧 있으면 군대를 가게 되는데 어떻게 해야할지 모르겠어 관련 서류도 많은 거 같고',
      content: '휴학 횟수를 수업연한 기준 1회(1년)로 축소하고 재등록 제한(2회)을 통해 재학연한을 단축함 (2023학년도 신입생부터 적용하며, 2022학년도 이전 입학한 재적생은 종전의 학칙을 적용함) - 학칙 제19조(휴학) ④ 일반휴학은 1회에 한하여 허가하며 그 기간은 1년 이내로 한다. 다만, 병역의무로 인한 휴학 기간은 휴학 횟수에 산입하지 아니하며, 부득이한 경우 총장의 승인을 얻어 일반휴학을 추가로 허가할 수 있다.',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 2,
      title: '두 번째 북마크 제목입니다',
      content: '두 번째 북마크의 내용입니다. 여기에는 중요한 정보가 담겨있습니다.',
      date: generateRandomDate()
    },
    {
      id: 3,
      title: '세 번째 북마크입니다',
      content: '세 번째 북마크에 대한 상세한 내용을 여기에 작성합니다.',
      date: generateRandomDate()
    },
    {
      id: 4,
      title: '네 번째 북마크 제목',
      content: '네 번째 북마크의 자세한 내용입니다. 이 내용은 나중에 다시 확인하고 싶은 정보입니다.',
      date: generateRandomDate()
    }
  ]);

  const [filteredBookmarks, setFilteredBookmarks] = useState(bookmarks);

  // 검색어 하이라이트 함수
  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ?
        <span key={index} className="bg-yellow-200">{part}</span> : part
    );
  };

  // 검색 처리 함수
  const handleSearch = () => {
    const searchResults = bookmarks.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const contentMatch = item.content.toLowerCase().includes(searchTerm.toLowerCase());
      return titleMatch || contentMatch;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setFilteredBookmarks(searchResults);
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
        <h2 className="text-xl font-semibold">북마크</h2>
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

      {/* 테이블 헤더 - 간격 조절 가능 */}
      <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 border-b text-sm">
        <div className="col-span-1 pl-1">ID</div>
        <div className="col-span-9 text-center mr-9">제목</div>
        <div className="col-span-2 pr-10 text-right">작성일</div>
      </div>

      {/* 북마크 리스트 */}
      <div className="px-4 py-2">
        {filteredBookmarks.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-xl">
            검색 결과가 없습니다.
          </div>
        ) : (
          filteredBookmarks.map((item) => (
            <div
              key={item.id}
              className="mb-3 bg-white rounded-xl shadow-sm cursor-pointer"
              onClick={() => setOpenItemId(openItemId === item.id ? null : item.id)}
            >
              {/* 항목 헤더 - 간격 및 폰트 크기 조절 가능 */}
              <div className="grid grid-cols-12 items-center p-4">
                <div className="col-span-1 text-gray-600">{item.id}</div>
                <div className="col-span-9">
                  <span className="text-base pl-4">
                    {item.title.length > 30 ? highlightSearchTerm(item.title.substring(0, 30) + 
                    '...', searchTerm) : highlightSearchTerm(item.title, searchTerm)}
                  </span>
                </div>
                <div className="col-span-2 text-right text-gray-500">{item.date}</div>
              </div>

              {/* 펼쳐지는 내용 - 패딩 및 애니메이션 속도 조절 가능 */}
              <div
                className="transition-all ease-in-out"
                style={{
                  maxHeight: openItemId === item.id ? '500px' : '0',
                  opacity: openItemId === item.id ? 1 : 0,
                  overflow: 'hidden',
                  visibility: openItemId === item.id ? 'visible' : 'hidden',
                  transitionDuration: '500ms' // 애니메이션 속도 조절
                }}
              >
                <div className="px-4 pb-4 ml-[8.33%]"> {/* 제목 위치에 맞춰 정렬 */}
                  <div className="p-4 bg-gray-50 rounded-md">
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
