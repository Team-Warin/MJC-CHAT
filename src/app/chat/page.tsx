import style from '@/styles/chat.module.css';
import Conversation from '@/components/conversation';
import Chatroom from '@/components/chatroom';

import prisma from '@/lib/prisma';

export default async function Chat() {
  const chatRooms = await prisma.chatRoom.findMany({
    where: {
      userId: 1,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return (
    <div className={style.container}>
      <div className={style.menu_container}>
        <div className={style.menu_icon}>
          <img src='Chat-minimum.png' alt='' className='minimum' />
          <img src='new_chat.png' alt='' className='new' />
        </div>
        <div className={style.menu_chat}>
          {chatRooms.map((chatRoom) => (
            <Chatroom title={chatRoom.title}></Chatroom>
          ))}
        </div>
      </div>
      <div className={style.chat_container}>
        <div className={style.chat_header}>
          <img src='Settings.png' alt='' />
        </div>
        <div className={style.chat_screen}>
          <div className={style.chatting}>
            <Conversation
              userType='user'
              content='휴학 신청 하고 싶다고!!!'
            ></Conversation>
            <Conversation
              userType='ai'
              content='휴학 신청을 하시려 하시네요! 명지전문대학에서는 휴학을 신청하고자 하는 학생은 소속 학과장을 경유하여 보호자 연서로 교무처장에게 휴학원을 제출하여야 합니다. 휴학원 제출 시에는 다음과 같은 서류를 첨부하여야 합니다. (내규 제23조 ⑥)
                                1. 휴학원서 (학교소정양식)
                                2. 일반휴학 (보호자 사유서, 질병인 경우 의료법에서 정한 진료기관의 의사가 발행하는 진단서 )
                                3. 군입대휴학 (입영통지서 )
                                4. 창업휴학 (창업보육센터에서 창업사실을 확인한 증빙서류 )(신설 2015.02.16.)

                                휴학의 기간과 횟수에 대해서는 다음과 같습니다. (내규 제23조 ②)
                                - 일반휴학은 한 차례에 한정하여 허가하며 그 기간은 1년 이내로 한다. 다만, 병역의무로 인한 휴학기간은 휴학 횟수에 산입하지 아니하며, 부득이한 경우 총장의 승인을 얻어 일반 휴학을 추가로 허가할 수 있다.(개정 2015.2.16., 2020.10.26.,2023.01.20.,2024.7.24)

                                이 외에 휴학의 절차와 규정을 확인하시기 바랍니다.'
            ></Conversation>
            <Conversation
              userType='ai'
              content='휴학 신청을 하시려 하시네요! 명지전문대학에서는 휴학을 신청하고자 하는 학생은 소속 학과장을 경유하여 보호자 연서로 교무처장에게 휴학원을 제출하여야 합니다. 휴학원 제출 시에는 다음과 같은 서류를 첨부하여야 합니다. (내규 제23조 ⑥)
                                1. 휴학원서 (학교소정양식)
                                2. 일반휴학 (보호자 사유서, 질병인 경우 의료법에서 정한 진료기관의 의사가 발행하는 진단서 )
                                3. 군입대휴학 (입영통지서 )
                                4. 창업휴학 (창업보육센터에서 창업사실을 확인한 증빙서류 )(신설 2015.02.16.)

                                휴학의 기간과 횟수에 대해서는 다음과 같습니다. (내규 제23조 ②)
                                - 일반휴학은 한 차례에 한정하여 허가하며 그 기간은 1년 이내로 한다. 다만, 병역의무로 인한 휴학기간은 휴학 횟수에 산입하지 아니하며, 부득이한 경우 총장의 승인을 얻어 일반 휴학을 추가로 허가할 수 있다.(개정 2015.2.16., 2020.10.26.,2023.01.20.,2024.7.24)

                                이 외에 휴학의 절차와 규정을 확인하시기 바랍니다.'
            ></Conversation>
            <Conversation
              userType='ai'
              content='휴학 신청을 하시려 하시네요! 명지전문대학에서는 휴학을 신청하고자 하는 학생은 소속 학과장을 경유하여 보호자 연서로 교무처장에게 휴학원을 제출하여야 합니다. 휴학원 제출 시에는 다음과 같은 서류를 첨부하여야 합니다. (내규 제23조 ⑥)
                                1. 휴학원서 (학교소정양식)
                                2. 일반휴학 (보호자 사유서, 질병인 경우 의료법에서 정한 진료기관의 의사가 발행하는 진단서 )
                                3. 군입대휴학 (입영통지서 )
                                4. 창업휴학 (창업보육센터에서 창업사실을 확인한 증빙서류 )(신설 2015.02.16.)

                                휴학의 기간과 횟수에 대해서는 다음과 같습니다. (내규 제23조 ②)
                                - 일반휴학은 한 차례에 한정하여 허가하며 그 기간은 1년 이내로 한다. 다만, 병역의무로 인한 휴학기간은 휴학 횟수에 산입하지 아니하며, 부득이한 경우 총장의 승인을 얻어 일반 휴학을 추가로 허가할 수 있다.(개정 2015.2.16., 2020.10.26.,2023.01.20.,2024.7.24)

                                이 외에 휴학의 절차와 규정을 확인하시기 바랍니다.'
            ></Conversation>
            <Conversation
              userType='ai'
              content='휴학 신청을 하시려 하시네요! 명지전문대학에서는 휴학을 신청하고자 하는 학생은 소속 학과장을 경유하여 보호자 연서로 교무처장에게 휴학원을 제출하여야 합니다. 휴학원 제출 시에는 다음과 같은 서류를 첨부하여야 합니다. (내규 제23조 ⑥)
                                1. 휴학원서 (학교소정양식)
                                2. 일반휴학 (보호자 사유서, 질병인 경우 의료법에서 정한 진료기관의 의사가 발행하는 진단서 )
                                3. 군입대휴학 (입영통지서 )
                                4. 창업휴학 (창업보육센터에서 창업사실을 확인한 증빙서류 )(신설 2015.02.16.)

                                휴학의 기간과 횟수에 대해서는 다음과 같습니다. (내규 제23조 ②)
                                - 일반휴학은 한 차례에 한정하여 허가하며 그 기간은 1년 이내로 한다. 다만, 병역의무로 인한 휴학기간은 휴학 횟수에 산입하지 아니하며, 부득이한 경우 총장의 승인을 얻어 일반 휴학을 추가로 허가할 수 있다.(개정 2015.2.16., 2020.10.26.,2023.01.20.,2024.7.24)

                                이 외에 휴학의 절차와 규정을 확인하시기 바랍니다.'
            ></Conversation>
          </div>
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
    </div>
  );
}
