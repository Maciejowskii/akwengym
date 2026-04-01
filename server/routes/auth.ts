import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../db.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// POST /api/auth/login
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    res.status(400).json({ error: 'Email i hasło są wymagane' });
    return;
  }

  const db = getDb();
  const user = db.prepare('SELECT * FROM admin_users WHERE email = ?').get(email) as
    | { id: number; email: string; password: string }
    | undefined;

  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(401).json({ error: 'Nieprawidłowy email lub hasło' });
    return;
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, email: user.email });
});

// GET /api/auth/me
router.get('/me', requireAuth, (req: AuthRequest, res: Response) => {
  const db = getDb();
  const user = db.prepare('SELECT id, email FROM admin_users WHERE id = ?').get(req.adminId) as
    | { id: number; email: string }
    | undefined;

  if (!user) {
    res.status(404).json({ error: 'Nie znaleziono użytkownika' });
    return;
  }
  res.json(user);
});

export default router;
