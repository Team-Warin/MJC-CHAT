import style from '@/styles/login.module.css';

import * as motion from 'framer-motion/client';

import Mjc_Animation from '@/components/animation/leaf';

export default function Login() {
  return (
    <main className={style.container}>
      <div className={style.modal_container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
          className={style.modal}
        ></motion.div>
      </div>
      <Mjc_Animation />
    </main>
  );
}
