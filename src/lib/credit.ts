export interface Profile {
  name: string;
  studentId: number;
  avatar: string | null;
  role: string[];
  social: { [key: string]: string };
}

export const dev: Profile[] = [
  {
    name: '손연제',
    studentId: 2024931006,
    avatar: '/avatar/INIRU.gif',
    role: [
      'Project Leader',
      'Full-Stack Developer',
      'Web Animation',
      'Ai Modeling',
      'Database',
      'DataSet',
    ],
    social: {
      github: 'INIRU',
      email: 'iniru@kakao.com',
      instagram: 'ou._.jy',
    },
  },
  {
    name: '이현준',
    studentId: 2024931017,
    avatar: '/avatar/hjlee.webp',
    role: ['Project Director', 'Front-End Developer', 'UI/UX Design'],
    social: {
      github: 'joonda',
      instagram: 'x___x_hyun',
      email: 'hyunndev@gmail.com',
    },
  },
  {
    name: '김길호',
    studentId: 2024931001,
    avatar: '/avatar/reroro.webp',
    role: [
      'Project Developer',
      'Front-End Developer',
      'Ai Modeling',
      'DataSet',
    ],
    social: {
      github: 'reroro1',
      email: 'yoyoppu64@gmail.com',
      instagram: 'roro._.__.2',
    },
  },
  {
    name: '진건희',
    studentId: 2024931024,
    avatar: '/avatar/kunhee.webp',
    role: ['Project Developer', 'Back-End Developer', 'Product Manager'],
    social: {
      github: 'gh100435',
      email: 'gh10043510@gmail.com',
      instagram: 'kun__hi',
    },
  },
];
