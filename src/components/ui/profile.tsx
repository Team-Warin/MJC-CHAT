import type { Profile } from '@/lib/credit';

import style from '@/styles/profile.module.css';

import Link from 'next/link';
import Image from 'next/image';

import * as motion from 'framer-motion/client';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Profile({
  name,
  avatar,
  role,
  social,
  studentId,
}: Profile) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ width: '500px' }}
      className={style.profile}
    >
      <div className={style.avatar}>
        {avatar ? (
          <Image src={avatar} alt={name} width={100} height={100} />
        ) : null}
        <p className={style.name}>{name}</p>
        <p className={style.role}>{role[0]}</p>
      </div>
      <div className={style.info}>
        <div className={style.role_info}>
          <div>
            <p>{name}</p>
            <p>{role[0].split(' ')[1]}</p>
          </div>
          <p>{studentId} AI·빅데이터학과</p>
        </div>
        <div className={style.roles}>
          {role.slice(1).map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <div className={style.social}>
          {Object.entries(social).map(([key, value]) => {
            let icon = faEnvelope;
            let link = `mailto:${value}`;

            if (key === 'github') {
              icon = faGithub;
              link = `https://github.com/${value}`;
            } else if (key === 'instagram') {
              icon = faInstagram;
              link = `https://instagram.com/${value}`;
            }

            return (
              <Link key={key} href={link}>
                <FontAwesomeIcon icon={icon} />
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
