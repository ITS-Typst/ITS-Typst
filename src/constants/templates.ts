export interface Template {
  id: string;
  name: string;
  description: string;
  tags: string[];
  githubUrl: string;
  previewUrl?: string;
  previewImage?: string;
}

export const TEMPLATES: Template[] = [
  {
    id: 'ta-s1',
    name: 'Tugas Akhir S1',
    description: 'Template Tugas Akhir S1.',
    tags: ['S1', 'Tugas Akhir'],
    githubUrl: 'https://github.com/ITS-Typst/template-buku-TA',
    previewUrl: '/demo/buku-TA.pdf',
    previewImage: '/images/preview-buku-TA.webp',
  },
  {
    id: 'proposal-ta-s1',
    name: 'Proposal Tugas Akhir S1',
    description: 'Template Proposal Tugas Akhir S1.',
    tags: ['S1', 'Proposal'],
    githubUrl: 'https://github.com/ITS-Typst/template-proposal-TA',
    previewUrl: '/demo/proposal-TA.pdf',
    previewImage: '/images/preview-proposal-TA.webp',
  },
  {
    id: 'kerja-praktik',
    name: 'Kerja Praktik',
    description: 'Template Laporan Kerja Praktik.',
    tags: ['KP', 'Laporan'],
    githubUrl: 'https://github.com/ITS-Typst/template-buku-KP',
  },
  {
    id: 'magang',
    name: 'Magang',
    description: 'Template Laporan Magang.',
    tags: ['Magang', 'Laporan'],
    githubUrl: 'https://github.com/ITS-Typst/template-buku-Magang',
  },
];
