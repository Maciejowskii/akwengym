import React, { useState, useEffect } from 'react';
import { PenTool, Plus, LogOut, FileText, Trash2, Edit3, Loader2 } from 'lucide-react';

import { Post } from '../../types/blog';

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
  onEdit: (post: Post | null) => void;
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  published: { bg: 'rgba(34,197,94,0.15)', text: '#4ade80', label: 'Opublikowany' },
  scheduled: { bg: 'rgba(251,191,36,0.15)', text: '#fbbf24', label: 'Zaplanowany' },
  draft: { bg: 'rgba(148,163,184,0.15)', text: '#94a3b8', label: 'Szkic' },
};

export default function AdminDashboard({ token, onLogout, onEdit }: AdminDashboardProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/posts/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setPosts(data);
      else if (res.status === 401) onLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const deletePost = async (id: number) => {
    await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setDeleteConfirm(null);
    fetchPosts();
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('pl-PL', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const s: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #0f172a 100%)',
    fontFamily: "'Inter', sans-serif",
    color: '#fff',
  };

  return (
    <div style={s}>
      {/* Top bar */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff'
          }}>
            <PenTool size={18} strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.5px' }}>Blog Admin</span>
          <span style={{
            background: 'rgba(99,102,241,0.2)', color: '#818cf8',
            fontSize: '11px', fontWeight: 600, padding: '3px 8px',
            borderRadius: '6px', letterSpacing: '0.5px',
          }}>AKWEN GYM</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            id="new-post-btn"
            onClick={() => onEdit(null)}
            style={{
              padding: '8px 18px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none', borderRadius: '8px', color: '#fff',
              fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            <Plus size={16} strokeWidth={3} />
            Nowy post
          </button>
          <button
            id="logout-btn"
            onClick={onLogout}
            style={{
              padding: '8px 18px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', color: 'rgba(255,255,255,0.6)',
              fontSize: '14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            <LogOut size={16} />
            Wyloguj
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {(['published', 'scheduled', 'draft'] as const).map(status => {
            const count = posts.filter(p => p.status === status).length;
            const sc = statusColors[status];
            return (
              <div key={status} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px', padding: '20px 24px',
              }}>
                <div style={{ fontSize: '28px', fontWeight: 700, color: sc.text }}>{count}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '4px' }}>{sc.label}</div>
              </div>
            );
          })}
        </div>

        <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'rgba(255,255,255,0.7)' }}>
          Wszystkie posty
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '64px', color: 'rgba(255,255,255,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <Loader2 size={32} className="animate-spin text-indigo-400 opacity-50" />
            Ładowanie...
          </div>
        ) : posts.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '64px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px dashed rgba(255,255,255,0.1)',
            borderRadius: '16px', color: 'rgba(255,255,255,0.3)',
          }}>
            <FileText size={48} strokeWidth={1} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <div>Brak postów. Kliknij "+ Nowy post" aby zacząć.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {posts.map(post => {
              const currentStatus = post.status || 'draft';
              const sc = statusColors[currentStatus];
              return (
                <div key={post.id} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px', padding: '18px 24px',
                  display: 'flex', alignItems: 'center', gap: '16px',
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {post.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', display: 'flex', gap: '16px' }}>
                      <span>/{post.slug}</span>
                      <span>Utworzono: {formatDate(post.created_at)}</span>
                      {post.published_at && <span>Publikacja: {formatDate(post.published_at)}</span>}
                    </div>
                  </div>

                  <span style={{
                    background: sc.bg, color: sc.text,
                    padding: '4px 10px', borderRadius: '6px',
                    fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap',
                  }}>
                    {sc.label}
                  </span>

                  {deleteConfirm === post.id ? (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: '#fca5a5' }}>Na pewno?</span>
                      <button
                        onClick={() => post.id && deletePost(post.id)}
                        style={{
                          padding: '6px 12px', background: 'rgba(239,68,68,0.8)',
                          border: 'none', borderRadius: '6px', color: '#fff',
                          fontSize: '12px', cursor: 'pointer', fontWeight: 600,
                        }}
                      >Usuń</button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        style={{
                          padding: '6px 12px', background: 'rgba(255,255,255,0.08)',
                          border: 'none', borderRadius: '6px', color: '#fff',
                          fontSize: '12px', cursor: 'pointer',
                        }}
                      >Anuluj</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        id={`edit-post-${post.id}`}
                        onClick={() => onEdit(post)}
                        style={{
                          padding: '7px 14px',
                          background: 'rgba(99,102,241,0.15)',
                          border: '1px solid rgba(99,102,241,0.3)',
                          borderRadius: '7px', color: '#818cf8',
                          fontSize: '13px', cursor: 'pointer', fontWeight: 500,
                          display: 'flex', alignItems: 'center', gap: '6px',
                        }}
                      >
                        <Edit3 size={14} />
                        Edytuj
                      </button>
                      <button
                        id={`delete-post-${post.id}`}
                        onClick={() => post.id && setDeleteConfirm(post.id)}
                        style={{
                          padding: '7px 14px',
                          background: 'rgba(239,68,68,0.1)',
                          border: '1px solid rgba(239,68,68,0.2)',
                          borderRadius: '7px', color: '#fca5a5',
                          fontSize: '13px', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: '6px',
                        }}
                      >
                        <Trash2 size={14} />
                        Usuń
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
