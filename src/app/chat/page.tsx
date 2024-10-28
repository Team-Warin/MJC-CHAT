import style from '@/styles/chat.module.css';
import ChatroomNav from '@/components/chatroomnav';

export default async function Chat() {
  return (
    <main className={style.container}>
      <ChatroomNav></ChatroomNav>
      <div className={style.chat_container}>
        
      </div>
      <div className={style.chat_container}>
        <div className={style.chat_header}>
          <img src='Settings.png' alt='' />
        </div>
        <div className={style.chat_screen}>

        </div>
        <div className={style.message_box}>
          <form>
            <div className={style.send_msg}>
              <input placeholder='메시지를 입력하세요' />
              <img
                src='../favicon.ico'
                alt=''
                style={{ width: '40', height: '40' }}
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}