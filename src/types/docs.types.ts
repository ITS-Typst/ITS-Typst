export interface DocMeta {
  slug: string;
  title: string;
  description?: string;
}

export interface DocPageData extends DocMeta {
  content: string;
}

export interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
}
