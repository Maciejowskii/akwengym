import { useState, useEffect } from 'react';
import { Post } from '../../types/blog';

interface BlogListProps {
  setPage: (page: string) => void;
  onPostClick: (slug: string) => void;
}

export default function BlogList({ onPostClick }: BlogListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Theme Colors
  const colors = {
    primary: '#002046',
    secondary: '#206393',
    surface: '#fdf9f6',
    onSurface: '#1c1b1a',
    onSurfaceVariant: '#44474e',
    outlineVariant: '#e5e7eb',
  };

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
    <section style={{ 
      minHeight: '80vh', 
      padding: '80px 24px', 
      maxWidth: '900px', 
      margin: '0 auto',
      fontFamily: "'Manrope', sans-serif" 
    }}>
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 56px)', 
          fontWeight: 900,
          color: colors.primary,
          marginBottom: '16px',
          letterSpacing: '-0.03em',
          lineHeight: 1.1
        }}>
          Blog Akwen
        </h1>
        <p style={{ 
          color: colors.onSurfaceVariant, 
          fontSize: '18px',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6,
          opacity: 0.8
        }}>
          Poznaj tajniki treningu, regeneracji i zdrowego trybu życia. Ekspercka wiedza z pierwszej ręki.
        </p>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '100px', color: colors.onSurfaceVariant }}>
          <div className="animate-pulse" style={{ fontWeight: 600 }}>Ładowanie artykułów...</div>
        </div>
      )}

      {error && (
        <div style={{
          background: '#fef2f2', border: `1px solid #fee2e2`,
          borderRadius: '24px', padding: '32px', color: '#b91c1c', 
          textAlign: 'center', fontWeight: 600
        }}>
          {error}
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div style={{ 
          textAlign: 'center', padding: '100px', 
          background: colors.outlineVariant, 
          borderRadius: '32px',
          color: colors.onSurfaceVariant,
          opacity: 0.6
        }}>
          <p style={{ fontSize: '18px', fontWeight: 600 }}>Jeszcze nic nie napisaliśmy, ale wrócimy wkrótce! 🏋️</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        {posts.map((post, i) => (
          <article
            key={post.id}
            onClick={() => onPostClick(post.slug)}
            style={{
              background: '#ffffff',
              border: `1px solid ${colors.outlineVariant}`,
              borderRadius: '24px', 
              padding: '40px',
              cursor: 'pointer', 
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: `fadeUp 0.6s ease ${i * 0.1}s both`,
              boxShadow: '0 4px 20px rgba(0,32,70,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = colors.secondary;
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,32,70,0.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.borderColor = colors.outlineVariant;
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,32,70,0.02)';
            }}
          >
            <div style={{ 
              fontSize: '13px', 
              color: colors.secondary, 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em' 
            }}>
              {formatDate(post.published_at || post.created_at)}
            </div>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 850, 
              color: colors.primary,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              margin: '4px 0'
            }}>
              {post.title}
            </h2>
            {post.excerpt && (
              <p style={{ 
                color: colors.onSurfaceVariant, 
                fontSize: '16px', 
                lineHeight: '1.7', 
                opacity: 0.9,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {post.excerpt}
              </p>
            )}
            <div style={{ 
              color: colors.primary, 
              fontSize: '15px', 
              fontWeight: 700,
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px' 
            }}>
              Czytaj artykuł 
              <span style={{ transition: 'transform 0.2s' }}>→</span>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
