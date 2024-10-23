import '@/styles/markdown.css';

export default function MDXProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='markdown-body'>{children}</div>;
}
