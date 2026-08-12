import Link from 'next/link';

export interface BreadcrumbSegment {
  label: string;
  href?: string; // undefined = current page (active, no link)
}

interface BreadcrumbProps {
  segments: BreadcrumbSegment[];
}

const Chevron = () => (
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
    <polyline points='9 18 15 12 9 6' />
  </svg>
);

export default function Breadcrumb({
  segments,
}: BreadcrumbProps): React.JSX.Element {
  return (
    <nav aria-label='Breadcrumb' className='mb-6'>
      <ol className='flex flex-wrap items-center gap-1.5 text-sm text-muted'>
        {segments.map((segment, index) => (
          <li key={segment.label} className='flex items-center gap-1.5'>
            {index > 0 && <Chevron />}
            {segment.href !== undefined ? (
              <Link
                href={segment.href}
                className='transition-colors hover:text-foreground'
              >
                {segment.label}
              </Link>
            ) : (
              <span aria-current='page' className='font-medium text-primary'>
                {segment.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
