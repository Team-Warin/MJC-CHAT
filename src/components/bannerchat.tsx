'use client';

import style from '@/styles/bannerchat.module.css';

import { delay } from '@/lib/delay';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useWindowSize } from '@/components/hook/useWindowSize';

import { textStream } from '@/lib/textstream';

import { motion, useAnimate } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@nextui-org/button';

export default function BannerChat() {
  const window = useWindowSize();

  const events: { role: 'user' | 'ai'; content: string }[][] = [
    [
      {
        role: 'user',
        content: '안녕!',
      },
      {
        role: 'ai',
        content:
          '안녕하세요. 저는 명지전문대학 학사 도우미 명전이 입니다! 무엇을 도와드릴까요?',
      },
      {
        role: 'user',
        content:
          '아파서 오늘 수업을 못 들어서 결석이 됐는데 출석 인정을 받고 싶어.',
      },
      {
        role: 'ai',
        content:
          '본인의 질병으로 출석 인정을 받는 법을 알려드리겠습니다. 종합병원(2차 의료기관 이상) 진단서 및 진료확인서(소견서 포함)를 준비하여 2주 이내에 대체 과제물과 함께 출석 인정 서류를 제출하시면 됩니다.',
      },
      {
        role: 'user',
        content: '고마워!',
      },
      {
        role: 'ai',
        content:
          '별말씀을요. 학사관련해서 도움이 필요하다면 언제든지 저를 찾아주세요!',
      },
    ],
    [
      {
        role: 'user',
        content: '너는 누가 만들었어?',
      },
      {
        role: 'ai',
        content: '명지전문대학 Ai빅데이터학과 팀 Warin에서 만들었습니다.',
      },
      {
        role: 'user',
        content: '너는 뭘 할 수 있어?',
      },
      {
        role: 'ai',
        content: '저는 명지전문대학에 관한 학사관련 도움을 드릴 수 있습니다.',
      },
    ],
  ];

  const [btn, animate] = useAnimate();
  const [value, setValue] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'ai'; message: string }[]>(
    []
  );

  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // 이거 넘 힘들었음
  const abortController = new AbortController(); // 중단 컨트롤러
  async function chatPromise(eventIndex: number, messageIndex: number) {
    const promise = new Promise(() => {
      const currentEvent = events[eventIndex][messageIndex];
      const isUser = currentEvent.role === 'user';

      const handleUserMessage = (text: string, i: number) => {
        delay(
          50 * i,
          () => {
            setValue(text);
          },
          abortController
        ).then(() => {
          if (text === currentEvent.content) {
            delay(
              400,
              () => {
                setValue('');
                setChat((prev) => [
                  ...prev,
                  { role: currentEvent.role, message: text },
                ]);
              },
              abortController
            ).then(() => {
              if (messageIndex + 1 < events[eventIndex].length) {
                delay(
                  400,
                  () => {
                    chatPromise(eventIndex, messageIndex + 1);
                  },
                  abortController
                );
              } else {
                delay(
                  1000,
                  () => {
                    setChat([]);
                    chatPromise(
                      eventIndex + 1 < events.length ? eventIndex + 1 : 0,
                      0
                    );
                  },
                  abortController
                );
              }
            });
          }
        });
      };

      const handleAIMessage = (text: string, i: number) => {
        delay(
          30 * i,
          () => {
            setChat((prev) => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage && lastMessage.role === 'ai') {
                return [
                  ...prev.slice(0, -1),
                  { ...lastMessage, message: text },
                ];
              } else {
                return [...prev, { role: currentEvent.role, message: text }];
              }
            });
          },
          abortController
        ).then(() => {
          if (text === currentEvent.content) {
            if (messageIndex + 1 < events[eventIndex].length) {
              delay(
                400,
                () => {
                  chatPromise(eventIndex, messageIndex + 1);
                },
                abortController
              );
            } else {
              delay(
                1000,
                () => {
                  setChat([]);
                  chatPromise(
                    eventIndex + 1 < events.length ? eventIndex + 1 : 0,
                    0
                  );
                },
                abortController
              );
            }
          }
        });
      };

      // 유저 또는 AI 메시지 처리
      textStream(currentEvent.content).forEach((text, i) => {
        if (abortController.signal.aborted) return;
        isUser ? handleUserMessage(text, i) : handleAIMessage(text, i);
      });
    });

    return promise;
  }

  useEffect(() => {
    if (value.length > 1) {
      animate(btn.current, { scale: 1 }, { duration: 0.75, type: 'spring' });
    } else {
      animate(btn.current, { scale: 0 }, { duration: 0.75, type: 'spring' });
    }
  }, [value]);

  useEffect(() => {
    if (messageEndRef.current && chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: messageEndRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  }, [chat]);

  useEffect(() => {
    if ((window.width ?? 0) >= 768) chatPromise(0, 0);

    return () => {
      setChat([]);
      abortController.abort();
    };
  }, [window.width]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className={style.container}
    >
      <div className={style.chat_header}>
        <div className={style.chat_header_icon}>
          <div className={style.close}></div>
          <div className={style.minimize}></div>
          <div className={style.maximize}></div>
        </div>
        <div className={style.chat_header_title}>
          <Image src='/mjc.webp' alt='mjc' width={20} height={20} />
          <p>명전이</p>
        </div>
        <div className={style.dummy}></div>
      </div>
      <div ref={chatBodyRef} className={style.chat_body}>
        {chat.map((item, i) => (
          <div
            key={i}
            className={`${style.chat_message} ${
              item.role !== 'ai' && style.user
            }`}
          >
            <motion.p
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 50 }}
            >
              {item.message}
            </motion.p>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <div className={style.chat_footer}>
        <div className={style.chat_footer_input_container}>
          <input
            className={style.chat_footer_input}
            type='text'
            readOnly
            value={value}
            placeholder='자유롭게 대화해 보세요.'
          />
          <motion.div ref={btn} initial={{ scale: 0 }}>
            <Button isIconOnly radius='full' size='sm'>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </motion.div>
        </div>
        <p>이 팝업은 예시 입니다. 실제 답변은 다를 수 도 있습니다.</p>
      </div>
    </motion.div>
  );
}
