import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['three'],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'], // .md 파일도 페이지로 사용할 수 있음.
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
