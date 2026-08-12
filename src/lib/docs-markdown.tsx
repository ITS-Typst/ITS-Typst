import type { Components } from 'react-markdown';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function extractH2Headings(markdown: string): string[] {
  return markdown
    .split('\n')
    .filter((line) => /^## /.test(line))
    .map((line) => line.replace(/^## /, '').trim());
}

export const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1
      id={slugify(String(children))}
      className='mb-6 mt-8 scroll-mt-20 text-3xl font-bold text-foreground first:mt-0'
    >
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      id={slugify(String(children))}
      className='mb-4 mt-8 scroll-mt-20 text-xl font-semibold text-foreground'
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      id={slugify(String(children))}
      className='mb-3 mt-6 scroll-mt-20 text-base font-semibold text-foreground'
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className='mb-4 leading-7 text-foreground/80'>{children}</p>
  ),
  ul: ({ children }) => (
    <ul className='mb-4 list-disc space-y-1 pl-6 text-foreground/80'>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className='mb-4 list-decimal space-y-1 pl-6 text-foreground/80'>
      {children}
    </ol>
  ),
  li: ({ children }) => <li className='leading-7'>{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      className='text-primary underline underline-offset-4 hover:text-primary/80'
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className='mb-4 border-l-4 border-primary/40 pl-4 italic text-muted'>
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.startsWith('language-');
    if (isBlock) {
      return (
        <code className='block w-full font-mono text-sm text-foreground'>
          {children}
        </code>
      );
    }
    return (
      <code className='rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-primary'>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className='mb-4 overflow-x-auto rounded-xl border border-border bg-surface p-4 text-sm'>
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className='mb-4 overflow-x-auto rounded-xl border border-border'>
      <table className='w-full text-sm'>{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className='border-b border-border bg-surface'>{children}</thead>
  ),
  th: ({ children }) => (
    <th className='px-4 py-3 text-left font-semibold text-foreground'>
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className='border-t border-border px-4 py-3 text-foreground/80'>
      {children}
    </td>
  ),
  hr: () => <hr className='my-8 border-border' />,
  strong: ({ children }) => (
    <strong className='font-semibold text-foreground'>{children}</strong>
  ),
};
