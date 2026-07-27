import type { Metadata } from 'next';
import { Google_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/theme.context';
import { SITE_CONFIG } from '@/config/github.config';

const googleSans = Google_Sans({
  variable: '--font-google-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme'),p=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.classList.toggle('dark',(t||p)==='dark')}catch(e){}})()`;

export const metadata: Metadata = {
  title: 'ITS Typst — Template Akademik',
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
};

export default function RootLayout({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <html lang='id' suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className={`${googleSans.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
