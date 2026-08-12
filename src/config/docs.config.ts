export interface DocPage {
  slug: string;
  title: string;
  description?: string;
}

export const docsNav: DocPage[] = [
  {
    slug: 'introduction',
    title: 'Pendahuluan',
    description: 'Apa itu ITS-Typst dan bagaimana cara kerjanya',
  },
  {
    slug: 'installation',
    title: 'Instalasi',
    description: 'Cara mengunduh dan menginstal template',
  },
  {
    slug: 'faq',
    title: 'FAQ',
    description: 'Pertanyaan yang sering diajukan',
  },
];

export const DOCS_DIR = 'content/docs';
