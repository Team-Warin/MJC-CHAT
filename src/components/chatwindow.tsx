'use client'

import style from '@/styles/chat.module.css';
import Conversation from './conversation';
import Image from 'next/image';
import { useEffect, useState } from 'react';


import { Button } from '@nextui-org/button';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { Input } from '@nextui-org/input'
import { Textarea } from "@nextui-org/input";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal';
import { Link } from "@nextui-org/react";
import { Select, SelectItem } from '@nextui-org/react';
import { Switch } from '@nextui-org/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight, faArrowLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';


export default function ChatWindow() {

    const [isPopoverOpen, setPopoverOpen] = useState(false);
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const hasConversation = false;

    return (
        <div className={style.chat_window}>
            <div className={style.chat_header}>
                <Button
                    className={style.bookmark_btn}
                    isIconOnly
                    size='sm'
                    color='primary'
                    endContent={<FontAwesomeIcon icon={faBookmark} />}
                >
                </Button>
                <Popover
                    placement='bottom'
                    size='lg'
                    isOpen={isPopoverOpen}
                    onOpenChange={setPopoverOpen}
                >
                    <PopoverTrigger>
                        <Button
                            className={style.setting_btn}
                            isIconOnly
                            size='sm'
                            color='primary'
                            endContent={<FontAwesomeIcon icon={faUser} />}
                        >
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className={style.pop_window}>
                            <div className={style.pop_header}>
                                <Image
                                    src='/favicon.ico'
                                    alt=''
                                    width={36}
                                    height={36}
                                />
                                <div>
                                    <p className={style.pop_user_name}>Hyun Joon Lee</p>
                                    <p className={style.pop_user_email}>hjoon767@gmail.com</p>
                                </div>
                            </div>
                            <div className={style.pop_middle}>
                                <Button
                                    className={style.pop_setting_btn}
                                    radius='full'
                                    variant='ghost'
                                    color='primary'
                                    onClick={() => {
                                        onOpen();
                                        setPopoverOpen(false);
                                    }}
                                >
                                    설정
                                </Button>
                                <Button
                                    className={style.pop_logout_btn}
                                    radius='full'
                                    variant='bordered'
                                    color='danger'
                                >
                                    로그아웃
                                </Button>
                            </div>
                            <div className={style.quick_link}>
                                <div>
                                    <Link
                                        isExternal href="https://mjc.ac.kr/mjcIntro.do"
                                        color='foreground'
                                        underline='hover'
                                    >
                                        대학안내
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        isExternal href="https://sugang.mjc.ac.kr/"
                                        color='foreground'
                                        underline='hover'
                                    >
                                        수강신청
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        isExternal href="https://cyber.mjc.ac.kr/index.jsp"
                                        color='foreground'
                                        underline='hover'
                                    >
                                        E-Class
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        isExternal href="https://icampus.mjc.ac.kr/mjc/sysUser/doView.do"
                                        color='foreground'
                                        underline='hover'
                                    >
                                        I-Campus
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        isExternal href="https://ncsi.mjc.ac.kr/index.do"
                                        color='foreground'
                                        underline='hover'
                                    >
                                        역량기반 학사시스템
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    size='2xl'
                >
                    <ModalContent>
                        <ModalHeader>
                            서비스 설정
                        </ModalHeader>
                        <ModalBody>
                            <div className={style.modal_contents}>
                                <div>
                                    <p className={style.modal_content_title}>화면 테마</p>
                                    <p className={style.modal_content}>시스템 설정을 선택하면 디스플레이 설정에 따라 자동 전환됩니다</p>
                                </div>
                                <Select
                                    isRequired
                                    items={[
                                        { values: 'system', label: "시스템 설정" },
                                        { values: 'light', label: "라이트 모드" },
                                        { values: 'dark', label: "다크 모드" }
                                    ]}
                                    defaultSelectedKeys={['system']}
                                    className={style.select_box}
                                >
                                    <SelectItem
                                        key={"system"}
                                    >
                                        시스템 설정
                                    </SelectItem>
                                    <SelectItem
                                        key={"light"}
                                    >
                                        라이트모드
                                    </SelectItem>
                                    <SelectItem
                                        key={"dark"}
                                    >
                                        다크모드
                                    </SelectItem>
                                </Select>
                            </div>
                            <div className={style.modal_contents}>
                                <div>
                                    <p className={style.modal_content_title}>말풍선</p>
                                    <p className={style.modal_content}>필요에 따라 말풍선 여부를 선택합니다</p>
                                </div>
                                <Switch
                                    defaultSelected
                                />
                            </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>


            <ScrollShadow
                className={style.chat_scroll}
                orientation="vertical"
                size={500}
                offset={100}
            >
                {hasConversation ? (
                    <>
                        <Conversation
                            userType='user'
                            content='휴학 신청 하고 싶다고!!!휴학 신청 하고 싶다고!!!휴학 신청 하고 싶다고!!!휴학 신청 하고 싶다고!!!휴학 신청 하고 싶다고!!!휴학 신청 하고 싶다고!!!'
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
                    </>
                ) : null}
            </ScrollShadow>
            {!hasConversation && (
                <div className={style.chat_quick}>
                    <div className={style.quick_header}>
                        <div className={style.header_div}>
                            <p className={style.header_title}>똑똑하게 명전이 사용하기!
                                <Button
                                    isIconOnly
                                    variant='light'
                                    size='sm'
                                    endContent={<FontAwesomeIcon icon={faAngleRight} />}
                                >
                                </Button>
                            </p>
                        </div>
                        <div>
                            <Button
                                className={style.left_btn}
                                isIconOnly
                                size='sm'
                                color='primary'
                                endContent={<FontAwesomeIcon icon={faArrowLeft} />}
                            >
                            </Button>
                            <Button
                                className={style.right_btn}
                                isIconOnly
                                size='sm'
                                color='primary'
                                endContent={<FontAwesomeIcon icon={faArrowRight} />}
                            >
                            </Button>
                        </div>
                    </div>
                    <div className={style.quick_cards}>
                        <Card
                            className={style.card}
                            shadow='none'
                            isHoverable
                            isPressable
                        >
                            <CardBody>
                                <p>오늘 학식 메뉴가 뭐야?</p>
                            </CardBody>
                        </Card>
                        <Card
                            className={style.card}
                            shadow='none'
                            isHoverable
                            isPressable
                        >
                            <CardBody>
                                <p>학교 주변 지하철 역 알려줘</p>
                            </CardBody>
                        </Card>
                        <Card
                            className={style.card}
                            shadow='none'
                            isHoverable
                            isPressable
                        >
                            <CardBody>
                                <p>학사 관련해서 문의하려는데 연락처를 알려줘</p>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )}
            <div className={style.chat_div}>
                <Textarea
                    className={style.chat_message}
                    placeholder='자유롭게 대화해 보세요'
                    minRows={2}
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
    );
}