import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// GET /api/posts – publiczne (tylko opublikowane)
router.get('/', (req: Request, res: Response) => {
  const db = getDb();
  const now = new Date().toISOString();
  const posts = db.prepare(`
    SELECT id, title, slug, excerpt, status, published_at, created_at
    FROM posts
    WHERE status = 'published' AND (published_at IS NULL OR published_at <= ?)
    ORDER BY published_at DESC, created_at DESC
  `).all(now);
  res.json(posts);
});

// GET /api/posts/all – admin (wszystkie posty)
router.get('/all', requireAuth, (_req: AuthRequest, res: Response) => {
  const db = getDb();
  const posts = db.prepare(`
    SELECT id, title, slug, excerpt, status, published_at, created_at, updated_at
    FROM posts
    ORDER BY created_at DESC
  `).all();
  res.json(posts);
});

// GET /api/posts/:slug – pojedynczy post (publiczny)
router.get('/:slug', (req: Request, res: Response) => {
  const db = getDb();
  const now = new Date().toISOString();
  const post = db.prepare(`
    SELECT * FROM posts
    WHERE slug = ? AND status = 'published' AND (published_at IS NULL OR published_at <= ?)
  `).get(req.params.slug, now);

  if (!post) {
    res.status(404).json({ error: 'Post nie istnieje' });
    return;
  }
  res.json(post);
});

// POST /api/posts – utwórz post (admin)
router.post('/', requireAuth, (req: AuthRequest, res: Response) => {
  const { title, content, excerpt, status, published_at } = req.body as {
    title: string;
    content: string;
    excerpt?: string;
    status: 'draft' | 'published' | 'scheduled';
    published_at?: string;
  };

  if (!title || !content) {
    res.status(400).json({ error: 'Tytuł i treść są wymagane' });
    return;
  }

  const db = getDb();
  let slug = slugify(title);

  // Upewnij się że slug jest unikalny
  const existing = db.prepare('SELECT id FROM posts WHERE slug = ?').get(slug);
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  const result = db.prepare(`
    INSERT INTO posts (title, slug, content, excerpt, status, published_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(title, slug, content, excerpt || null, status || 'draft', published_at || null);

  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(post);
});

// PUT /api/posts/:id – edytuj post (admin)
router.put('/:id', requireAuth, (req: AuthRequest, res: Response) => {
  const { title, content, excerpt, status, published_at } = req.body as {
    title: string;
    content: string;
    excerpt?: string;
    status: 'draft' | 'published' | 'scheduled';
    published_at?: string;
  };

  const db = getDb();
  const existing = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id) as
    | { id: number; slug: string }
    | undefined;

  if (!existing) {
    res.status(404).json({ error: 'Post nie istnieje' });
    return;
  }

  let slug = existing.slug;
  if (title) {
    const newSlug = slugify(title);
    if (newSlug !== existing.slug) {
      const slugConflict = db.prepare('SELECT id FROM posts WHERE slug = ? AND id != ?').get(newSlug, req.params.id);
      slug = slugConflict ? `${newSlug}-${Date.now()}` : newSlug;
    }
  }

  db.prepare(`
    UPDATE posts
    SET title = ?, slug = ?, content = ?, excerpt = ?, status = ?, published_at = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(
    title,
    slug,
    content,
    excerpt || null,
    status || 'draft',
    published_at || null,
    req.params.id
  );

  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
  res.json(post);
});

// DELETE /api/posts/:id – usuń post (admin)
router.delete('/:id', requireAuth, (req: AuthRequest, res: Response) => {
  const db = getDb();
  const post = db.prepare('SELECT id FROM posts WHERE id = ?').get(req.params.id);

  if (!post) {
    res.status(404).json({ error: 'Post nie istnieje' });
    return;
  }

  db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;
