import style from '@/styles/login.module.css';

import Link from 'next/link';
import Image from 'next/image';

import * as motion from 'framer-motion/client';

import { signIn } from '@/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Mjc_Animation from '@/components/animation/leaf';

import { Button } from '@nextui-org/button';

export default function Login({
  searchParams,
}: {
  searchParams: { callbackurl?: string };
}) {
  return (
    <main className={style.container}>
      <Link
        className='absolute top-2 left-2 z-20'
        href={searchParams.callbackurl || '/'}
      >
        <Button isIconOnly size='lg' variant='light'>
          <FontAwesomeIcon className='text-2xl' icon={faArrowLeft} />
        </Button>
      </Link>
      <div className={style.modal_container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          className={style.modal}
        >
          <div className={style.modal_title}>
            <Link href='/' className={style.modal_title_logo}>
              <Image
                src={'/webps/mjc.webp'}
                alt='logo'
                width={45}
                height={45}
              />
              <h1 className='text-mjcblue'>명전이</h1>
            </Link>
            <p>명지전문대학 학사도우미 Ai 서비스 명전이!</p>
          </div>
          <div className={style.modal_content}>
            <form
              action={async () => {
                'use server';
                await signIn('google', {
                  redirectTo: searchParams.callbackurl ?? '/',
                });
              }}
            >
              <Button
                type='submit'
                size='lg'
                className='bg-google'
                startContent={
                  <Image
                    src='/svgs/google.svg'
                    alt='google'
                    width={20}
                    height={20}
                  />
                }
              >
                <p>
                  <strong>Google</strong>로 시작하기
                </p>
              </Button>
            </form>
          </div>
          <div className={style.modal_footer}>
            <p>명전이 로그인은 명지전문대학의 로그인과는 다른 서비스입니다.</p>
          </div>
        </motion.div>
      </div>
      <Mjc_Animation />
    </main>
  );
}
