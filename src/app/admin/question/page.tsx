// import prisma from '@/lib/prisma';
import styles from '@/styles/dashboard.module.css';
import Sidebar from '@/components/admin/sidebar'
export default async function QuestionPage() {
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
      <div className='grow'>
        <p>Question Page</p>
      </div>
    </div>
  );
}
