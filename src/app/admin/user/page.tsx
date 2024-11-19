// import prisma from '@/lib/prisma';
import styles from '@/styles/dashboard.module.css';
import Sidebar from '@/components/admin/sidebar'

export default async function UserControlPage() {
  // const users = await prisma.user.findMany({
  //   orderBy: {
  //     createdAt: 'desc',
  //   },
  //   select: {
  //     avatar: true,
  //     nickname: true,
  //     email: true,
  //     roles: true,
  //     createdAt: true,
  //   },
  // });

  return (
    <div className='flex'>
      <div>
        <Sidebar />
      </div>
      <div className={styles.user_window}>
        <h1>UserControl Page</h1>
        <table>
          <thead>
            <tr>
              <th>Avartar</th>
              <th>Nickname</th>
              <th>E-mail</th>
              <th>Roles</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>null</td>
              <td>hjoon767@gmail.com</td>
              <td>관리자</td>
              <td>2024년 11월 15일</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
