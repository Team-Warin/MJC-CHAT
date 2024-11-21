'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from '@/styles/MyPage.module.css';

import { Avatar } from '@nextui-org/avatar';
import Graph from './Graph';
import Settings from './Settings';  // Settings 컴포넌트 import
import Bookmarks from './Bookmarks';
import Inquiries from './Inquiries';


function Sidebar({ isVisible, toggleSidebar, activeTab, handleTabClick }) {
  return (
    <aside
      className={styles.sidebar}
      style={{
        transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
        position: 'fixed',
        top: '50px', // 전체적으로 아래로 내림
        left: '0',
        height: '100%',
        zIndex: '998',
      }}
    >
      <div className={styles.sidebarContent}>
        <h2>마이페이지</h2>
        <ul>
          <li
            className={`${styles.tabItem} ${activeTab === '내 정보' ? styles.activeTab : ''}`}
            onClick={() => handleTabClick('내 정보')}
            style={{ transform: 'none' }}
          >
            내 정보
          </li>
          <li
            className={`${styles.tabItem} ${activeTab === '북마크' ? styles.activeTab : ''}`}
            onClick={() => handleTabClick('북마크')}
            style={{ transform: 'none' }}
          >
            북마크
          </li>
          <li
            className={`${styles.tabItem} ${activeTab === '내 문의사항' ? styles.activeTab : ''}`}
            onClick={() => handleTabClick('내 문의사항')}
            style={{ transform: 'none' }}
          >
            문의사항
          </li>
          <li
            className={`${styles.tabItem} ${activeTab === '설정' ? styles.activeTab : ''}`}
            onClick={() => handleTabClick('설정')}
            style={{ transform: 'none' }}
          >
            설정
          </li>
        </ul>
      </div>
      <button className={styles.logoutBtn}>Log out</button>
    </aside>
  );
}
interface DataPoint {
  name: string;
  value: number;
}
export default function MyPage() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(session?.user?.name || '');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('내 정보');


  const [visitData, setVisitData] = useState<DataPoint[]>([]);
  const [bookmarkData, setBookmarkData] = useState<DataPoint[]>([]);
  const [inquiryData, setInquiryData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const generateDates = () => {
      const dates = [];
      for (let i = 4; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }
      return dates;
    };

    const dates = generateDates();

    const visitData: DataPoint[] = dates.map(date => ({
      name: date,
      value: Math.floor(Math.random() * 41) + 10
    }));

    const bookmarkData: DataPoint[] = dates.map(date => ({
      name: date,
      value: Math.floor(Math.random() * 21)
    }));

    const inquiryData: DataPoint[] = dates.map(date => ({
      name: date,
      value: Math.floor(Math.random() * 11)
    }));

    setVisitData(visitData);
    setBookmarkData(bookmarkData);
    setInquiryData(inquiryData);
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const lineElement = document.querySelector(`.${styles.horizontalLine}`) as HTMLElement;
    if (lineElement) {
      lineElement.style.left = isSidebarVisible ? '110px' : '0';
    }
  }, [isSidebarVisible]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    setIsSidebarVisible(false); // Close sidebar when a tab is clicked
  };

  useEffect(() => {
    if (session?.user?.image) {
      console.log('Profile Image URL:', session.user.image);
    }
  }, [session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>로그인이 필요합니다.</p>;
  }

  return (
    <div className={styles.container}>
      <Sidebar
        isVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />

      {/* 오른쪽 상단의 햄버거 아이콘 */}
      <div
        className={styles.topProfile}
        onClick={toggleSidebar}
        style={{
          cursor: 'pointer',
          border: '2px solid #333',
          padding: '3px',
          borderRadius: '12px',
          transition: 'left 0.3s ease-in-out, border 0.3s ease-in-out',
          position: 'fixed', // fixed로 설정하여 항상 클릭 가능하도록 변경
          top: '65px', // 햄버거 아이콘을 조금 내림
          left: isSidebarVisible ? '200px' : '30px', // 사이드바 열림 상태에 따라 위치 조정
          height: '34px',
          zIndex: '1000', // 사이드바 위에 나타나도록 설정
        }}
        onMouseEnter={(e) => (e.currentTarget.style.border = '2px solid #0070f3')}
        onMouseLeave={(e) => (e.currentTarget.style.border = '2px solid #333')}
      >
        {/* 햄버거 아이콘 크기 조정 */}
        <RxHamburgerMenu size={22} color="#333" /> {/* size 값을 줄여서 크기를 조정하세요 */}
      </div>

      <div className={styles.horizontalLine}></div>

      {/* 프로필 정보 */}
      <div className={styles.profileContainer}>
        {activeTab === '내 정보' && (
          <>
            <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-md max-w-md mx-auto mt-10">
              <div className="flex items-center mb-4">
                {session.user?.image ? (
                  <Avatar
                    isBordered
                    radius='lg'
                    size='md'
                    src={session.user.image}
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                )}

                <h1 className="text-2xl font-bold ml-4">{session.user?.name}</h1>
              </div>
              {isEditing ? (
                <>
                  <div className="mb-4 w-full">
                    <label className="block mb-1 text-lg font-semibold">수정:</label>
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => console.log('닉네임 저장 기능은 추후 구현됩니다.')}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                      저장
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg mb-2">
                    이메일: <span className="font-semibold">{session.user?.email}</span>
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                  >
                    닉네임 수정
                  </button>
                </>
              )}
            </div>
            {/* 활동 관련 코드*/}
            <div className="grid grid-cols-3 gap-3 mt-8">

            <div className="bg-white p-3 rounded-lg shadow-md">
              <h2 className="text-l font-bold mb-4">총 방문 횟수</h2>
              <Graph data={visitData} period="일별" />
            </div>
            
            <div className="bg-white p-3 rounded-lg shadow-md">
              <h2 className="text-l font-bold mb-4">북마크한 게시물 수</h2>
              <Graph data={bookmarkData} period="일별" />
            </div>
            
            <div className="bg-white p-3 rounded-lg shadow-md">
              <h2 className="text-l font-bold mb-4">활동한 시간</h2>
              <Graph data={inquiryData} period="일별" />
            </div>
          </div>
        </>
      )}
        {activeTab === '북마크' && <Bookmarks />}
        {activeTab === '설정' && <Settings />}
        {activeTab === '내 문의사항' && <Inquiries />}
      </div>
    </div>
  );
}

