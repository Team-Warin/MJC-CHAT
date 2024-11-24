import type { MDXRemoteProps } from 'next-mdx-remote/rsc';

import style from '@/styles/markdown.module.css';

import Link from 'next/link';

import { MDXRemote } from 'next-mdx-remote/rsc';

import hljs from 'highlight.js/lib/core';

import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);

export const components = {
  // 여기는 any를 어쩔 수 없게 써야할듯 뭘 넣어도 빨간줄 뜨네
  /* eslint-disable @typescript-eslint/no-explicit-any */
  a: (props: any) => (
    <Link href={props.href} prefetch={true} className={style.link}>
      {props.children}
    </Link>
  ),
  pre: (props: any) => {
    if (props.children.props.className) {
      let childSplit: string[];

      if (props.children.props.children) {
        childSplit = props.children.props.children
          .replace(/\n$/, '')
          .split('\n');
      } else {
        return props.children;
      }

      const fileSplit: string[] = props.children.props.className.split('|');
      const codeLanguage = fileSplit[0].replace(/language-/, '');
      const codeInfo = (): {
        lang: string;
        filter?: string;
        image?: 'plain' | 'original';
      } => {
        if (/^ts/.test(codeLanguage)) {
          return {
            lang: /x$/.test(codeLanguage) ? 'react' : 'typescript',
            filter: /x$/.test(codeLanguage)
              ? 'invert(49%) sepia(15%) saturate(7175%) hue-rotate(162deg) brightness(95%) contrast(101%)'
              : 'none',
            image: /x$/.test(codeLanguage) ? 'original' : 'plain',
          };
        } else if (/^js/.test(codeLanguage)) {
          return {
            lang: /x$/.test(codeLanguage) ? 'react' : 'javascript',
            image: /x$/.test(codeLanguage) ? 'original' : 'plain',
          };
        }
        return { lang: codeLanguage };
      };

      return (
        <div>
          <div></div>
          <pre className={style.pre}>
            <code className={style.fileCode}>
              {childSplit.map((code, i) => {
                let codeHg: string;
                try {
                  codeHg = hljs.highlight(code, {
                    language: codeLanguage,
                  }).value;
                } catch {
                  codeHg = code;
                }

                return (
                  <span
                    key={i}
                    className={`markdown-hg ${style.code_Line}`}
                    dangerouslySetInnerHTML={{
                      __html: codeHg,
                    }}
                  ></span>
                );
              })}
            </code>
          </pre>
        </div>
      );
    }
  },
};

export const options = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
};

export default function Markdown(props: MDXRemoteProps) {
  return <MDXRemote options={options} {...props} components={components} />;
}
