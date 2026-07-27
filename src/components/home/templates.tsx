import { TEMPLATES, type Template } from '@/constants/templates';

export default function Templates(): React.JSX.Element {
  return (
    <section
      id='templates'
      className='py-24'
      aria-labelledby='templates-heading'
    >
      <div className='mx-auto max-w-6xl px-8'>
        <div className='max-w-xl'>
          <p className='mb-3 text-sm font-semibold uppercase tracking-widest text-primary'>
            Open Source
          </p>
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
          {TEMPLATES.map((template) => (
            <li key={template.id}>
              <TemplateCard template={template} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TemplateCard({ template }: { template: Template }): React.JSX.Element {
  return (
    <a
      href={template.githubUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='group flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/40 hover:shadow-md'
    >
      <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10'>
        <DocumentIcon />
      </div>

      <h3 className='mb-2 font-semibold text-foreground transition-colors group-hover:text-primary'>
        {template.name}
      </h3>
      <p className='mb-4 flex-1 text-sm leading-relaxed text-muted'>
        {template.description}
      </p>

      <div className='flex flex-wrap gap-2'>
        {template.tags.map((tag) => (
          <span
            key={tag}
            className='rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary'
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

function DocumentIcon(): React.JSX.Element {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='text-primary'
      aria-hidden='true'
    >
      <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
      <polyline points='14 2 14 8 20 8' />
      <line x1='16' y1='13' x2='8' y2='13' />
      <line x1='16' y1='17' x2='8' y2='17' />
    </svg>
  );
}
