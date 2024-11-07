import style from '@/styles/main.module.css';

import Link from 'next/link';

import * as motion from 'framer-motion/client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@nextui-org/button';

import Footer from '@/components/footer';
import BannerChat from '@/components/bannerchat';
import Mjc_Animation from '@/components/animation/leaf';

/** Main Page */
export default function Main() {
  return (
    <>
      <main>
        <Banner />
        <Intro />
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
  return <div id='intro' className={style.intro}></div>;
}
