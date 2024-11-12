'use client';

import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/button";
import style from "@/styles/chat.module.css";

export default function ChatBookMark() {
    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    isIconOnly
                    className={style.bookmark_btn}
                    variant='solid'
                    color='primary'
                    size='md'
                    radius='lg'
                    startContent={<FontAwesomeIcon icon={faBookmark} />}
                />
            </PopoverTrigger>
            <PopoverContent>
                <div className={style.bookmark_list}>
                    <div className={style.bookmark_items}>
                        <h1>안녕하세요</h1>
                        <p>안녕하세요. 저는 명지전문대학 학사도우미 명전이 입니다.</p>
                    </div>
                    <div className={style.bookmark_items}>
                        <h1>안녕하세요</h1>
                        <p>안녕하세요. 저는 명지전문대학 학사도우미 명전이 입니다.</p>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}