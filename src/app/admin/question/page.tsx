import prisma from '@/lib/prisma';
import styles from '@/styles/dashboard.module.css';
import Sidebar from '@/components/admin/sidebar'

export default async function QuestionPage() {
  const selectedfields = {
    id: true,
    userId: true,
    conversationId: true,
    createdAt: true,
    updatedAt: true
  }

  const supports = await prisma.report.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: selectedfields
  });

  return (
    <div className='flex'>
      <div>
        <Sidebar />
      </div>
      <div className={styles.dashboard_window}>
        <h1>Question Page</h1>
        <table className={styles.dashboard_table}>
          <thead>
            <tr>
              {Object.keys(selectedfields).map((field, index) => (
                <th key={index} className={styles.table_cell}>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {supports.map((support, index) => (
              <tr key={index}>
                <td className={styles.table_cell}>{support.id}</td>
                <td className={styles.table_cell}>{support.userId}</td>
                <td className={styles.table_cell}>{support.conversationId}</td>
                <td className={styles.table_cell}>{support.createdAt.getFullYear()}년 {support.createdAt.getMonth()+1}월 {support.createdAt.getDate()}일</td>
                <td className={styles.table_cell}>{support.updatedAt.getFullYear()}년 {support.updatedAt.getMonth()+1}월 {support.updatedAt.getDate()}일</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
