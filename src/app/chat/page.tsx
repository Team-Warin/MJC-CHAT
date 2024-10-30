import style from '@/styles/chat.module.css';
import ChatroomNav from '@/components/chatroomnav';
import ChatWindow from '@/components/chatwindow';

export default async function Chat() {
  return (
    <main className={style.container}>
      <ChatroomNav></ChatroomNav>
      <ChatWindow></ChatWindow>
    </main>
  );
}