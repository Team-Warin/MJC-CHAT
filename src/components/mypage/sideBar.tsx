import styles from '@/styles/mypage.module.css';

interface SidebarProps {
  activeTab: string;
  handleTabClick: (tabName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, handleTabClick }) => {

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarTitleContainer}>
          <h2 className={styles.sidebarTitle}>마이페이지</h2>
        </div>
        <div className={styles.sidebarItemContainer}>
          <button
            className={`${styles.sidebarItem} ${activeTab === '설정' ? styles.activeTab : ''}`}
            onClick={() => handleTabClick('설정')}
          >
            내 설정
          </button>
        </div>
        <div className={styles.sidebarItemContainer}>
          <button
            className={`${styles.sidebarItem} ${activeTab === '북마크' ? styles.activeTab : ''}`}
            onClick={() => handleTabClick('북마크')}
          >
            북마크
          </button>
        </div>
        <div className={styles.sidebarItemContainer}>
          <button
            className={`${styles.sidebarItem} ${activeTab === '문의사항' ? styles.activeTab : ''}`}
            onClick={() => handleTabClick('문의사항')}
          >
            문의사항
          </button>
        </div>
      </div>
      <button className={styles.logoutBtn}>로그아웃</button>
    </aside>

  );
}

export default Sidebar;