import prisma from '@/lib/prisma';
import styles from '@/styles/dashboard.module.css';
import Sidebar from '@/components/admin/sidebar'
export default async function QuestionPage() {
  const supports = await prisma.report.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      userId: true,
      conversationId: true,
      createdAt: true,
      type: true,
      status: true,
      title: true,
      messages: true,
      user: true
    },
  });

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
