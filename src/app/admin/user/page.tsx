import prisma from '@/lib/prisma';
import styles from '@/styles/dashboard.module.css';
import Sidebar from '@/components/admin/sidebar';
import Image from 'next/image';
import {Code} from "@nextui-org/code";

export default async function UserControlPage() {
  const selectedFields = {
    avatar: true,
    nickname: true,
    email: true,
    roles: true,
    createdAt: true,
  }

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: selectedFields
  });

  return (
    <div className='flex'>
      <div>
        <Sidebar />
      </div>
      <div className={styles.user_window}>
        <h1>UserControl Page</h1>
        <table className={styles.user_table}>
          <thead>
            <tr>
              {Object.keys(selectedFields).map((field, index) => (
                <th key={index} className={styles.table_cell}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className={styles.table_cell}>
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={`${user.nickname ?? 'User' }`}
                      width={30}
                      height={30}
                      className='rounded-lg'
                    />
                  ) : ('No Avatar')}
                </td>
                <td className={styles.table_cell}>{user.nickname ?? 'null'}</td>
                <td className={styles.table_cell}>{user.email}</td>
                <td className={styles.table_cell}><Code color='danger'>관리자</Code></td>
                <td className={styles.table_cell}>{user.createdAt.getFullYear()}년 {user.createdAt.getMonth() + 1}월 {user.createdAt.getDate()}일</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
