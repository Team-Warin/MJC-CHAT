import type { MDXRemoteProps } from 'next-mdx-remote/rsc';

import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {};

export default function Markdown(props: MDXRemoteProps) {
  return <MDXRemote {...props} />;
}
