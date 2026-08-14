export interface CmsPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  body: string;
  excerpt: string | null;
  date: string | null;
  location: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T | null;
  meta?: Record<string, unknown>;
}
