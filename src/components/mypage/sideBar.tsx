import styles from '@/styles/mypage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  isSidebarVisible: boolean;
  activeTab: string;
  handleTabClick: (tabName: string) => void;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarVisible, activeTab, handleTabClick, toggleSidebar }) => {

  return (
    <aside className={`${styles.sidebar} 
    transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out z-50`}>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarTitleContainer}>
          <h2 className={styles.sidebarTitle}>마이페이지</h2>
          <button
            className={`${styles.sidebarToggle} 
             ${isSidebarVisible ? styles.sidebarVisible : styles.sidebarHidden}`}
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
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