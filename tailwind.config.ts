import type { Config } from 'tailwindcss';

import { nextui } from '@nextui-org/theme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',

    // NextUi Tailwind setup 추가할때마다 | 넣고 추가로 써줘야함
    './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input|avatar|popover|dropdown|modal|select|tabl|code).js',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        mjcblue: '#002968',
        mjcsky: '#0086D1',
        google: '#f1f4f9',
      },
    },
  },
  plugins: [nextui()],
};
export default config;
