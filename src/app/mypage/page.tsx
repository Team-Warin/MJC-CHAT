'use client'

import styles from '@/styles/mypage.module.css';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

import Settings from '@/components/mypage/settings';
import Bookmarks from '@/components/mypage/bookmarks';
import Inquiries from '@/components/mypage/inquiries';
import Sidebar from '@/components/mypage/sideBar';

export default function MyPageMain() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('설정');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className={styles.myPageContainer}>
      <div className={styles.myPageSidebarContainer}>
        <Sidebar
          activeTab={activeTab}
          handleTabClick={handleTabClick}
        />
      </div>
      <div className={styles.contentContainer}>
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