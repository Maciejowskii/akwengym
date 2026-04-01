import { useState, useEffect } from 'react';
import { Post } from '../../types/blog';

interface BlogPostProps {
  slug: string;
  onBack: () => void;
}

function renderContent(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const withMarkdownLinks = escaped.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#206393; text-decoration:underline; font-weight:600">$1</a>'
  );

  const withBareLinks = withMarkdownLinks.replace(
    /(?<!\")(?<!\()https?:\/\/[^\s<>"]+/g,
    url => `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#206393; text-decoration:underline; font-weight:600">${url}</a>`
  );

  const withBold = withBareLinks.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  return withBold.split(/\n\n+/).map(p =>
    `<p style="margin: 0 0 1.6em; line-height: 1.9; font-size: 18px">${p.replace(/\n/g, '<br>')}</p>`
  ).join('');
}

export default function BlogPost({ slug, onBack }: BlogPostProps) {
  const [post, setPost] = useState<Post | null>(null);
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
    fetch(`/api/posts/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Post nie znaleziony');
        return res.json();
      })
      .then(setPost)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('pl-PL', {
      day: '2-digit', month: 'long', year: 'numeric',
    });

  return (
    <section style={{ 
      minHeight: '80vh', 
      padding: '60px 24px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: "'Manrope', sans-serif" 
    }}>
      <button
        id="blog-back-btn"
        onClick={onBack}
        style={{
          background: '#fff',
          border: `1px solid ${colors.outlineVariant}`,
          borderRadius: '12px', 
          color: colors.primary,
          padding: '10px 20px', 
          fontSize: '14px', 
          cursor: 'pointer',
          marginBottom: '48px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = colors.outlineVariant;
          e.currentTarget.style.transform = 'translateX(-4px)';
          e.currentTarget.style.background = colors.surface;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = colors.outlineVariant;
          e.currentTarget.style.transform = '';
          e.currentTarget.style.background = '#fff';
        }}
      >
        <span style={{ fontSize: '18px', fontWeight: 900 }}>←</span> Powrót do Bloga
      </button>

      {loading && (
        <div style={{ textAlign: 'center', padding: '100px', color: colors.onSurfaceVariant, opacity: 0.6 }}>
          Pobieranie publikacji...
        </div>
      )}

      {error && (
        <div style={{
          background: '#fef2f2', border: '1px solid #fee2e2',
          borderRadius: '24px', padding: '32px', color: '#b91c1c', 
          textAlign: 'center', fontWeight: 600
        }}>
          Przepraszamy, nie udało się załadować tego artykułu: {error}
        </div>
      )}

      {post && (
        <article style={{ animation: 'fadeUp 0.6s ease both' }}>
          <div style={{ 
            fontSize: '14px', 
            color: colors.secondary, 
            fontWeight: 800, 
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Opublikowano: {formatDate(post.published_at || post.created_at)}
          </div>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)', 
            fontWeight: 900, 
            lineHeight: 1.1,
            marginBottom: '24px', 
            color: colors.primary,
            letterSpacing: '-0.03em'
          }}>
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p style={{
              color: colors.onSurfaceVariant, 
              fontSize: '20px', 
              fontStyle: 'italic',
              lineHeight: '1.6', 
              marginBottom: '40px',
              paddingLeft: '24px',
              borderLeft: `4px solid ${colors.secondary}`,
              opacity: 0.8
            }}>
              {post.excerpt}
            </p>
          )}

          <div
            className="blog-content"
            style={{ 
              color: colors.onSurface, 
              fontSize: '18px', 
              lineHeight: '1.85',
              fontFamily: "'Noto Serif', serif" 
            }}
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />

          <div style={{
            marginTop: '60px',
            padding: '40px 0',
            borderTop: `1px solid ${colors.outlineVariant}`,
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: colors.onSurfaceVariant,
            fontSize: '14px',
            fontStyle: 'italic'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: colors.primary, opacity: 0.1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary, fontWeight: 900 }}>A</div>
            Zespół Akwen Wellness & Fitness
          </div>
        </article>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .blog-content strong { color: ${colors.primary}; font-weight: 800; }
        .blog-content a:hover { color: ${colors.primary} !important; }
      `}</style>
    </section>
  );
}
