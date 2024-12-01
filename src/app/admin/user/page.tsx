import prisma from '@/lib/prisma';
import styles from '@/styles/dashboard.module.css';
import Sidebar from '@/components/admin/sidebar';
import Image from 'next/image';
import { Code } from "@nextui-org/code";

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
    }
  });

  return (
    <div className={styles.dashboard_window}>
      <h1>UserControl Page</h1>
      <table className={styles.dashboard_table}>
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
                    alt={`${user.nickname ?? 'User'}`}
                    width={27}
                    height={27}
                    className='rounded-lg'
                  />
                ) : ('No Avatar')}
              </td>
              <td className={styles.table_cell}>{user.nickname ?? 'null'}</td>
              <td className={styles.table_cell}>{user.email}</td>
              <td className={styles.table_cell}>
                {user.roles && user.roles.length > 0 ? (() => {
                  const role = JSON.parse(user.roles[0]).role;

                  if (role === 'admin') {
                    return <Code color='danger'>{role}</Code>
                  } else if (role === 'student') {
                    return <Code color='primary'>{role}</Code>
                  } else if (role === 'professor') {
                    return <Code color='warning'>{role}</Code>
                  } else if (role === 'staff') {
                    return <Code color='secondary'>{role}</Code>
                  }
                })() : "No role"}
              </td>
              <td className={styles.table_cell}>{user.createdAt.getFullYear()}년 {user.createdAt.getMonth() + 1}월 {user.createdAt.getDate()}일</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
