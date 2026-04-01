import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminEditor from './AdminEditor';

import { Post } from '../../types/blog';

type AdminView = 'login' | 'dashboard' | 'editor';

export default function AdminPanel() {
  const [token, setToken] = useState<string | null>(null);
  const [view, setView] = useState<AdminView>('login');
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('admin_token');
    if (stored) {
      // Verify the token is still valid
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${stored}` } })
        .then(res => {
          if (res.ok) {
            setToken(stored);
            setView('dashboard');
          } else {
            localStorage.removeItem('admin_token');
          }
        })
        .catch(() => {
          // Server may not be running in dev without server
        });
    }
  }, []);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setView('login');
  };

  const handleEdit = (post: Post | null) => {
    setEditingPost(post);
    setView('editor');
  };

  const handleSaved = () => {
    setEditingPost(null);
    setView('dashboard');
  };

  if (view === 'login' || !token) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (view === 'editor') {
    return (
      <AdminEditor
        token={token}
        post={editingPost}
        onSaved={handleSaved}
        onBack={() => setView('dashboard')}
      />
    );
  }

  return (
    <AdminDashboard
      token={token}
      onLogout={handleLogout}
      onEdit={handleEdit}
    />
  );
}
