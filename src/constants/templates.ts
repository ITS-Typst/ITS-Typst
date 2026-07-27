export interface Template {
  id: string;
  name: string;
  description: string;
  tags: string[];
  githubUrl: string;
}

export const TEMPLATES: Template[] = [
  {
    id: 'ta-s1',
    name: 'Tugas Akhir S1',
    description:
      'Template resmi penulisan Tugas Akhir Strata 1 sesuai panduan format akademik ITS terbaru. Dilengkapi cover, lembar pengesahan, dan daftar isi otomatis.',
    tags: ['S1', 'Tugas Akhir'],
    githubUrl: 'https://github.com/ITS-Typst/ITS-Typst',
  },
  {
    id: 'proposal-ta-s1',
    name: 'Proposal Tugas Akhir S1',
    description:
      'Template proposal TA S1 terstruktur untuk pengajuan topik penelitian kepada dosen pembimbing. Format bab dan referensi siap pakai.',
    tags: ['S1', 'Proposal'],
    githubUrl: 'https://github.com/ITS-Typst/template-proposal-TA',
  },
  {
    id: 'kerja-praktik',
    name: 'Kerja Praktik',
    description:
      'Template laporan Kerja Praktik lengkap dengan cover, lembar pengesahan, daftar isi, dan lampiran otomatis sesuai ketentuan ITS.',
    tags: ['KP', 'Laporan'],
    githubUrl: 'https://github.com/ITS-Typst/ITS-Typst',
  },
  {
    id: 'magang',
    name: 'Magang',
    description:
      'Template laporan Magang industri yang rapi dan siap cetak. Menyesuaikan format pelaporan program magang di lingkungan ITS.',
    tags: ['Magang', 'Laporan'],
    githubUrl: 'https://github.com/ITS-Typst/ITS-Typst',
  },
];
