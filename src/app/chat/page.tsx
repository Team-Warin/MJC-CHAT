import style from '@/styles/chat.module.css';
import SideNav from '@/components/chat/sidenav';
import ChatWindow from '@/components/chat/chatwindow';

export default async function Chat() {
  return (
    <div className={style.chat_container}>
      <SideNav></SideNav>
      <ChatWindow></ChatWindow>
    </div>
  );
} 