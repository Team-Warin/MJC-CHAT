'use client'

import style from '@/styles/chat.module.css';
import Conversation from './conversation';
import { useEffect, useState } from 'react';


import { Button } from '@nextui-org/button';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { Input } from '@nextui-org/input'
import { Textarea } from "@nextui-org/input";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';


export default function ChatWindow() {
    return (
        <div className={style.chat_window}>
            <Button
                className={style.setting_btn}
                isIconOnly
                size='sm'
                color='primary'
                endContent={<FontAwesomeIcon icon={faUser} />}
            >
            </Button>
            <ScrollShadow
                className={style.chat_scroll}
                orientation="vertical"
                size={500}
                offset={100}
            >
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
            </ScrollShadow>

            <div className={style.chat_div}>
                <Textarea
                    className={style.chat_message}
                />
                <Button
                    className={style.chat_btn}
                    isIconOnly
                    size='sm'
                    radius='full'
                    color='default'
                    endContent={<FontAwesomeIcon icon={faArrowUp} />}
                />
            </div>

        </div>
    )
}