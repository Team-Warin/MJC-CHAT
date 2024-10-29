import style from '@/styles/404.module.css';

import * as motion from 'framer-motion/client';

export default function NotFound() {
  return (
    <main className={style.container}>
      <div className={style.content}>
        <div className={style.error_code}>
          {'404'.split('').map((item, i) => (
            <motion.h1
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.5,
                type: 'spring',
                stiffness: 100,
                delay: 0.05 * i + 1,
              }}
            >
              {item}
            </motion.h1>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 100,
            delay: 1,
          }}
        >
          페이지를 찾을 수 없습니다.
        </motion.p>
      </div>
    </main>
  );
}