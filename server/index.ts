import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cron from 'node-cron';
import bcrypt from 'bcryptjs';
import authRouter from './routes/auth.js';
import blogRouter from './routes/blog.js';
import { getDb } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/posts', blogRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Serwuj React build w produkcji
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Cron job: co minutę sprawdza scheduled posty i publikuje je
cron.schedule('* * * * *', () => {
  const db = getDb();
  const now = new Date().toISOString();
  const result = db.prepare(`
    UPDATE posts
    SET status = 'published', updated_at = datetime('now')
    WHERE status = 'scheduled' AND published_at <= ?
  `).run(now);

  if (result.changes > 0) {
    console.log(`[CRON] Opublikowano ${result.changes} post(ów) o ${now}`);
  }
});

// Seed admin jeśli nie istnieje
function seedAdmin() {
  const db = getDb();
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@akwengym.pl';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  const existing = db.prepare('SELECT id FROM admin_users WHERE email = ?').get(adminEmail);
  if (!existing) {
    const hashed = bcrypt.hashSync(adminPassword, 10);
    db.prepare('INSERT INTO admin_users (email, password) VALUES (?, ?)').run(adminEmail, hashed);
    console.log(`[SEED] Admin utworzony: ${adminEmail}`);
    console.log(`[SEED] Hasło: ${adminPassword}`);
    console.log('[SEED] ZMIEŃ HASŁO po pierwszym logowaniu!');
  }
}

app.listen(PORT, () => {
  seedAdmin();
  console.log(`\n🚀 Server uruchomiony na http://localhost:${PORT}`);
  console.log(`📝 API dostępne pod http://localhost:${PORT}/api`);
  console.log(`⏰ Cron scheduler aktywny (sprawdza co minutę)\n`);
});
