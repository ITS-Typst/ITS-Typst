import Image from 'next/image';

import { TEMPLATES, type Template } from '@/constants/templates';

export default function Templates(): React.JSX.Element {
  return (
    <section
      id='templates'
      className='py-12 md:py-24'
      aria-labelledby='templates-heading'
    >
      <div className='mx-auto max-w-6xl px-4 md:px-8'>
        <div className='max-w-xl'>
          <h2
            id='templates-heading'
            className='mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl'
          >
            Template Tersedia
          </h2>
          <p className='text-base leading-relaxed text-muted'>
            Semua template siap pakai, gratis, dan dapat dikustomisasi sesuai
            kebutuhan departemenmu.
          </p>
        </div>

        <ul
          className='mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2'
          role='list'
        >
          {TEMPLATES.map((template, index) => (
            <li key={template.id}>
              <TemplateCard template={template} priority={index === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TemplateCard({
  template,
  priority = false,
}: {
  template: Template;
  priority?: boolean;
}): React.JSX.Element {
  const hasPreview = !!template.previewImage;

  return (
    <div className='group flex h-full overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-primary/40 hover:shadow-md'>
      {/* Left: content */}
      <div className='flex flex-1 flex-col p-4 sm:p-6'>
        <div className='mb-3 flex flex-wrap gap-2'>
          {template.tags.map((tag) => (
            <span
              key={tag}
              className='rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary'
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className='mb-2 font-semibold text-foreground transition-colors group-hover:text-primary'>
          {template.name}
        </h3>
        <p className='mb-4 flex-1 text-sm leading-relaxed text-muted'>
          {template.description}
        </p>

        <div className='flex flex-wrap gap-2'>
          <a
            href={template.githubUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary'
          >
            <GitHubIcon />
            GitHub
          </a>
          {template.previewUrl && (
            <a
              href={template.previewUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-fg transition-colors hover:bg-primary/80'
            >
              <EyeIcon />
              Demo
            </a>
          )}
        </div>
      </div>

      {/* Right: preview image (desktop only) */}
      {hasPreview && (
        <div className='relative hidden w-44 shrink-0 items-center justify-center overflow-hidden bg-background sm:flex'>
          <Image
            src={template.previewImage!}
            alt={`Preview ${template.name}`}
            fill
            className='object-contain p-3 drop-shadow-sm'
            sizes='176px'
            priority={priority}
          />
        </div>
      )}
    </div>
  );
}

function GitHubIcon(): React.JSX.Element {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden='true'
    >
      <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z' />
    </svg>
  );
}

function EyeIcon(): React.JSX.Element {
  return (
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
      <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  );
}
