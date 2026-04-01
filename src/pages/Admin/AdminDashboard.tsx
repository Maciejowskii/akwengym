import React, { useState, useEffect } from 'react';
import { PenTool, Plus, LogOut, FileText, Trash2, Edit3, Loader2 } from 'lucide-react';

import { Post } from '../../types/blog';

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
  onEdit: (post: Post | null) => void;
}

export default function AdminDashboard({ token, onLogout, onEdit }: AdminDashboardProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Theme Constants
  const colors = {
    primary: '#002046',
    secondary: '#206393',
    surface: '#fbece2', // Slightly warmer surface for depth or #fdf9f6
    surfaceBg: '#fdf9f6',
    surfaceContainer: '#f1edea',
    surfaceContainerHigh: '#ebe7e4',
    onSurface: '#1c1b1a',
    onSurfaceVariant: '#44474e',
    outline: '#c4c6cf',
    outlineVariant: '#e5e7eb',
  };

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    published: { bg: 'rgba(0,32,70,0.06)', text: '#002046', label: 'Opublikowany' },
    scheduled: { bg: 'rgba(45,30,0,0.06)', text: '#2d1e00', label: 'Zaplanowany' },
    draft: { bg: 'rgba(68,71,78,0.06)', text: '#44474e', label: 'Szkic' },
  };

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

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.surfaceBg,
      fontFamily: "'Manrope', sans-serif",
      color: colors.onSurface,
    }}>
      {/* Top bar */}
      <div style={{
        borderBottom: `1px solid ${colors.outlineVariant}`,
        padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '72px',
        background: '#fff',
        position: 'sticky', top: 0, zIndex: 10,
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: colors.primary,
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff'
          }}>
            <PenTool size={18} strokeWidth={2.5} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em', color: colors.primary, lineHeight: 1.2 }}>
              Panel Bloga
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: colors.onSurfaceVariant, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.6 }}>
              Akwen Wellness & Fitness
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            id="new-post-btn"
            onClick={() => onEdit(null)}
            style={{
              padding: '10px 20px',
              background: colors.primary,
              border: 'none', borderRadius: '10px', color: '#fff',
              fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(0,32,70,0.15)',
            }}
            onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <Plus size={18} strokeWidth={3} />
            Dodaj post
          </button>
          <button
            id="logout-btn"
            onClick={onLogout}
            style={{
              padding: '10px 16px',
              background: 'transparent',
              border: `1px solid ${colors.outlineVariant}`,
              borderRadius: '10px', color: colors.onSurfaceVariant,
              fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#f9fafb';
              e.currentTarget.style.borderColor = colors.outline;
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = colors.outlineVariant;
            }}
          >
            <LogOut size={16} />
            Wyloguj
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '48px' }}>
          {(['published', 'scheduled', 'draft'] as const).map(status => {
            const count = posts.filter(p => p.status === status).length;
            const sc = statusColors[status];
            return (
              <div key={status} style={{
                background: '#fff',
                border: `1px solid ${colors.outlineVariant}`,
                borderRadius: '16px', padding: '24px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: sc.text }}></div>
                  <span style={{ color: colors.onSurfaceVariant, fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {sc.label}
                  </span>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: colors.primary }}>{count}</div>
                <div style={{ color: colors.onSurfaceVariant, fontSize: '12px', marginTop: '4px', opacity: 0.6 }}>Ostatnia aktualizacja: dzisiaj</div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: colors.primary, letterSpacing: '-0.01em' }}>
            Twoje publikacje
          </h2>
          <div style={{ fontSize: '13px', color: colors.onSurfaceVariant, fontWeight: 500 }}>
            Łącznie: <span style={{ fontWeight: 700, color: colors.primary }}>{posts.length}</span> postów
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: colors.onSurfaceVariant, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <Loader2 size={32} className="animate-spin" style={{ color: colors.primary, opacity: 0.4 }} />
            <span style={{ fontWeight: 600, fontSize: '15px' }}>Pobieranie danych...</span>
          </div>
        ) : posts.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px',
            background: colors.surfaceContainer,
            border: `2px dashed ${colors.outline}`,
            borderRadius: '24px', color: colors.onSurfaceVariant,
          }}>
            <FileText size={48} strokeWidth={1.5} style={{ marginBottom: '20px', opacity: 0.3 }} />
            <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Brak postów w systemie</div>
            <p style={{ margin: 0, opacity: 0.6, fontSize: '14px' }}>Kliknij „Dodaj post”, aby stworzyć swój pierwszy wpis na bloga.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {posts.map(post => {
              const currentStatus = post.status || 'draft';
              const sc = statusColors[currentStatus];
              return (
                <div key={post.id} style={{
                  background: '#fff',
                  border: `1px solid ${colors.outlineVariant}`,
                  borderRadius: '16px', padding: '20px 28px',
                  display: 'flex', alignItems: 'center', gap: '24px',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = colors.outline;
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = colors.outlineVariant;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: '17px', color: colors.primary, marginBottom: '6px', letterSpacing: '-0.01em' }}>
                      {post.title}
                    </div>
                    <div style={{ fontSize: '13px', color: colors.onSurfaceVariant, display: 'flex', gap: '20px', opacity: 0.8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ opacity: 0.5 }}>URL:</span> /{post.slug}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ opacity: 0.5 }}>Utworzono:</span> {formatDate(post.created_at)}
                      </span>
                    </div>
                  </div>

                  <span style={{
                    background: sc.bg, color: sc.text,
                    padding: '6px 12px', borderRadius: '8px',
                    fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap',
                    textTransform: 'uppercase', letterSpacing: '0.02em',
                    border: `1px solid transparent`,
                  }}>
                    {sc.label}
                  </span>

                  {deleteConfirm === post.id ? (
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: '#fef2f2', padding: '8px 16px', borderRadius: '12px', border: '1px solid #fee2e2' }}>
                      <span style={{ fontSize: '13px', color: '#b91c1c', fontWeight: 700 }}>Usunąć trwale?</span>
                      <button
                        onClick={() => post.id && deletePost(post.id)}
                        style={{
                          padding: '6px 12px', background: '#b91c1c',
                          border: 'none', borderRadius: '8px', color: '#fff',
                          fontSize: '12px', cursor: 'pointer', fontWeight: 700,
                        }}
                      >Tak, usuń</button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        style={{
                          padding: '6px 12px', background: '#fff',
                          border: `1px solid #fee2e2`, borderRadius: '8px', color: '#b91c1c',
                          fontSize: '12px', cursor: 'pointer', fontWeight: 600,
                        }}
                      >Anuluj</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        id={`edit-post-${post.id}`}
                        onClick={() => onEdit(post)}
                        style={{
                          padding: '8px 16px',
                          background: '#fff',
                          border: `1px solid ${colors.outlineVariant}`,
                          borderRadius: '10px', color: colors.secondary,
                          fontSize: '13px', cursor: 'pointer', fontWeight: 700,
                          display: 'flex', alignItems: 'center', gap: '8px',
                          transition: 'all 0.2s',
                        }}
                        onMouseOver={e => {
                          e.currentTarget.style.borderColor = colors.secondary;
                          e.currentTarget.style.background = 'rgba(32,99,147,0.03)';
                        }}
                        onMouseOut={e => {
                          e.currentTarget.style.borderColor = colors.outlineVariant;
                          e.currentTarget.style.background = '#fff';
                        }}
                      >
                        <Edit3 size={15} />
                        Edytuj
                      </button>
                      <button
                        id={`delete-post-${post.id}`}
                        onClick={() => post.id && setDeleteConfirm(post.id)}
                        style={{
                          padding: '8px 16px',
                          background: 'rgba(239,68,68,0.03)',
                          border: `1px solid rgba(239,68,68,0.1)`,
                          borderRadius: '10px', color: '#dc2626',
                          fontSize: '13px', cursor: 'pointer', fontWeight: 700,
                          display: 'flex', alignItems: 'center', gap: '8px',
                          transition: 'all 0.2s',
                        }}
                        onMouseOver={e => {
                          e.currentTarget.style.borderColor = '#dc2626';
                          e.currentTarget.style.background = 'rgba(239,68,68,0.08)';
                        }}
                        onMouseOut={e => {
                          e.currentTarget.style.borderColor = 'rgba(239,68,68,0.1)';
                          e.currentTarget.style.background = 'rgba(239,68,68,0.03)';
                        }}
                      >
                        <Trash2 size={15} />
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
