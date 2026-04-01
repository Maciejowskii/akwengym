import { useState, useEffect } from 'react';

import { Post } from '../../types/blog';

interface BlogListProps {
  setPage: (page: string) => void;
  onPostClick: (slug: string) => void;
}

export default function BlogList({ setPage, onPostClick }: BlogListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setPosts(data) : setError('Błąd ładowania'))
      .catch(() => setError('Nie można połączyć się z serwerem'))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('pl-PL', {
      day: '2-digit', month: 'long', year: 'numeric',
    });

  return (
    <section style={{ minHeight: '80vh', padding: '60px 24px', maxWidth: '860px', margin: '0 auto' }}>
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800,
          background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '12px',
        }}>Blog</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px' }}>
          Porady i aktualności ze świata fitnessu i wellness
        </p>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '64px', color: 'rgba(255,255,255,0.3)' }}>
          Ładowanie...
        </div>
      )}

      {error && (
        <div style={{
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: '12px', padding: '20px', color: '#fca5a5', textAlign: 'center',
        }}>
          {error}
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px', color: 'rgba(255,255,255,0.3)' }}>
          Brak postów. Zajrzyj wkrótce! 🏋️
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {posts.map((post, i) => (
          <article
            key={post.id}
            id={`blog-post-${post.slug}`}
            onClick={() => onPostClick(post.slug)}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px', padding: '28px 32px',
              cursor: 'pointer', transition: 'all 0.25s',
              animation: `fadeUp 0.4s ease ${i * 0.05}s both`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <div style={{ fontSize: '13px', color: '#6366f1', fontWeight: 600, marginBottom: '10px' }}>
              {formatDate(post.published_at || post.created_at)}
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px', color: '#fff' }}>
              {post.title}
            </h2>
            {post.excerpt && (
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.6', marginBottom: '16px' }}>
                {post.excerpt}
              </p>
            )}
            <span style={{ color: '#818cf8', fontSize: '14px', fontWeight: 500 }}>
              Czytaj dalej →
            </span>
          </article>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
