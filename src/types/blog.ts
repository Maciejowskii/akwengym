export interface Post {
  id?: number;
  title: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  status?: 'draft' | 'published' | 'scheduled';
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
}
