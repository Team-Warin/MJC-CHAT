import style from '@/styles/main.module.css';

import * as motion from 'framer-motion/client';

import Mjc_Animation from '@/components/animation/leaf';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@nextui-org/button';
import BannerChat from '@/components/bannerchat';

/** Main Page */
export default function Main() {
  return (
    <main>
      <Banner />
      <Intro />
    </main>
  );
}

/** Banner */
function Banner() {
  return (
    <div className={style.banner}>
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
            <Button
              size='lg'
              color='primary'
              endContent={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
            >
              명전이와 대화하기
            </Button>
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
  return <div className={style.intro}></div>;
}
