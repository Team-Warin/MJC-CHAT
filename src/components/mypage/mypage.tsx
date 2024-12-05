'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import styles from '@/styles/mypage.module.css';
import Settings from './settings';
import Bookmarks from './bookMarks';
import Inquiries from './inquiries';
import Sidebar from './sideBar';

export default function MyPage() {
  const { data: session, status } = useSession();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('설정');

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    setIsSidebarVisible(false); // Close sidebar when a tab is clicked
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.myPageContainer}>
      <div className={styles.myPageSidebarContainer}>
        <Sidebar
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
          activeTab={activeTab}
          handleTabClick={handleTabClick}
        />
      </div>
      <div className={`${styles.contentContainer} ${isSidebarVisible ? styles.contentContainerTransition : ""}`}>
        {
          session ? (
            <>
              {activeTab === '설정' && <Settings session={session} />}
              {activeTab === '북마크' && <Bookmarks />}
              {activeTab === '문의사항' && <Inquiries />}
            </>
          ) : (
            <p>로그인이 필요합니다.</p>
          )
        }
      </div>
    </div >
  );
}

