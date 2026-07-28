import { GITHUB_CONFIG } from '@/config/github.config';

export default function Footer(): React.JSX.Element {
  return (
    <footer className='py-6 text-center text-xs text-muted'>
      © {new Date().getFullYear()} ITS Typst. Dirilis dengan{' '}
      <a
        href={`${GITHUB_CONFIG.repoUrl}/blob/main/LICENSE`}
        target='_blank'
        rel='noopener noreferrer'
        className='text-primary hover:underline'
      >
        lisensi MIT
      </a>
      .
    </footer>
  );
}
