'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { markdownComponents } from '@/lib/docs-markdown';

interface DocsContentProps {
  rawMarkdown: string;
  slug: string;
  title: string;
}

export default function DocsContent({
  rawMarkdown,
  slug,
  title,
}: DocsContentProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  function handleCopy(): void {
    void navigator.clipboard.writeText(rawMarkdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload(): void {
    const blob = new Blob([rawMarkdown], {
      type: 'text/markdown;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <article className='py-2'>
      {/* Action buttons */}
      <div className='mb-8 flex items-center justify-end'>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={handleCopy}
            className='flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted transition-colors hover:border-primary/40 hover:text-foreground'
            title='Copy sebagai Markdown'
          >
            {copied ? (
              <>
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                >
                  <polyline points='20 6 9 17 4 12' />
                </svg>
                Tersalin!
              </>
            ) : (
              <>
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                >
                  <rect x='9' y='9' width='13' height='13' rx='2' ry='2' />
                  <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
                </svg>
                Copy Markdown
              </>
            )}
          </button>

          <button
            type='button'
            onClick={handleDownload}
            className='flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted transition-colors hover:border-primary/40 hover:text-foreground'
            title={`Unduh ${slug}.md`}
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden='true'
            >
              <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
              <polyline points='7 10 12 15 17 10' />
              <line x1='12' y1='15' x2='12' y2='3' />
            </svg>
            Download .md
          </button>
        </div>
      </div>

      {/* Markdown content */}
      <div className='min-w-0'>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {rawMarkdown}
        </ReactMarkdown>
      </div>

      {/* Hidden for screen readers */}
      <p className='sr-only'>{title}</p>
    </article>
  );
}
