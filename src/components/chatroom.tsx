import style from '@/styles/chat.module.css';

export default function Chatroom({ title }: { title: string }) {
  return (
    <div className={style.chat_list}>
      <span>{title}</span>
      <img src='Vector.png' alt='' />
    </div>
  );
}
