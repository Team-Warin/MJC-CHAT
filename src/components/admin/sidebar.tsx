'use client';

import styles from '@/styles/sidebar.module.css';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { Button } from '@nextui-org/button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLinks}>
        <Link
          className={pathname === '/admin/dashboard' ? styles.active : ''}
          href='/admin/dashboard'
        >
          <Button
            variant='light'
            startContent={<FontAwesomeIcon icon={faTable} />}
          >
            DASHBOARD
          </Button>
        </Link>
      </div>
    </div>
  );
}
