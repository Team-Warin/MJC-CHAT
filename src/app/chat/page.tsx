import style from '@/styles/chat.module.css';
import SideNav from '@/components/sidenav';
import ChatWindow from '@/components/chatwindow';

export default async function Chat() {
  return (
    <div className={style.chat_container}>
      <SideNav></SideNav>
      <ChatWindow></ChatWindow>
    </div>
  );
} 