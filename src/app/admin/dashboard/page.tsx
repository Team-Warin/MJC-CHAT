import styles from '@/styles/dashboard.module.css';

import prisma from '@/lib/prisma';

import TableComponent from '@/components/ui/table';

export default async function AdminPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      avatar: true,
      nickname: true,
      email: true,
      roles: true,
      createdAt: true,
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.user_management}>
        <h1>사용자 관리</h1>
        <TableComponent users={users} />
      </div>
    </div>
  );
}
