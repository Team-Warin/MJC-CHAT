import style from '@/styles/main.module.css';

import Link from 'next/link';
import Image from 'next/image';

import * as motion from 'framer-motion/client';

import { dev } from '@/lib/credit';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@nextui-org/button';

import Footer from '@/components/footer';
import Profile from '@/components/ui/profile';
import BannerChat from '@/components/bannerchat';
import Mjc_Animation from '@/components/animation/leaf';

/** Main Page */
export default function Main() {
  return (
    <>
      <main>
        <Banner />
        <Intro />
        <Credit />
      </main>
      <Footer />
    </>
  );
}

/** Banner */
function Banner() {
  return (
    <div className={style.banner}>
      <motion.div
        className='absolute bottom-10 flex w-full justify-center text-2xl'
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <FontAwesomeIcon icon={faAnglesDown} />
      </motion.div>
      <div className={style.banner_content}>
        <div className={style.banner_text}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            명전이
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            명지전문대학 학사도우미
          </motion.p>
          <motion.div
            className='mt-3'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Link href='/chat'>
              <Button
                size='lg'
                color='primary'
                endContent={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
              >
                명전이와 대화하기
              </Button>
            </Link>
          </motion.div>
        </div>
        <div className={style.banner_chat}>
          <BannerChat />
        </div>
      </div>
      <Mjc_Animation />
    </div>
  );
}

/** Intro */
function Intro() {
  return (
    <div id='intro' className={style.intro}>
      <motion.div
        initial={{ opacity: 0, y: 100, rotate: 10 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{
          duration: 0.7,
          stiffness: 100,
          type: 'spring',
          delay: 1,
        }}
      >
        <Image src='/mascot/pos_2.svg' alt='intro' width={400} height={400} />
      </motion.div>
      <div className={style.intro_text_box}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 1.5,
            type: 'spring',
            stiffness: 100,
            ease: 'easeInOut',
          }}
          className={style.intro_text}
        >
          <h1>안녕 나는 학사도우미 명전이야!!!!</h1>
        </motion.div>
        <div className={style.intro_mascot_box}>
          {new Array(3).fill(0).map((_, i: number) => (
            <motion.div
              key={i}
              className={style.intro_mascot}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 2 + i * 0.1 }}
            >
              <Image
                src={`/mascot/pos_${i + 1}.svg`}
                alt='intro'
                width={200}
                height={200}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Credit() {
  return (
    <div id='credit' className={style.credit}>
      <motion.h1
        className={style.credit_title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        이런 사람들이 개발했어요~!!
      </motion.h1>
      <div className={style.dev_credit}>
        {dev.map((item) => (
          <Profile key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}
