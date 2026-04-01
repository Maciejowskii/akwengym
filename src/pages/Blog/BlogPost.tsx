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
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  const withBareLinks = withMarkdownLinks.replace(
    /(?<!\")(?<!\()https?:\/\/[^\s<>"]+/g,
    url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  );

  const withBold = withBareLinks.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  return withBold.split(/\n\n+/).map(p =>
    `<p>${p.replace(/\n/g, '<br>')}</p>`
  ).join('');
}

export default function BlogPost({ slug, onBack }: BlogPostProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    <section style={{ minHeight: '80vh', padding: '48px 24px', maxWidth: '760px', margin: '0 auto' }}>
      <button
        id="blog-back-btn"
        onClick={onBack}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px', color: 'rgba(255,255,255,0.6)',
          padding: '8px 16px', fontSize: '14px', cursor: 'pointer',
          marginBottom: '40px',
        }}
      >
        ← Powrót do bloga
      </button>

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

      {post && (
        <article>
          <div style={{ fontSize: '13px', color: '#6366f1', fontWeight: 600, marginBottom: '12px' }}>
            {formatDate(post.published_at || post.created_at)}
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, lineHeight: '1.2',
            marginBottom: '16px', color: '#fff',
          }}>
            {post.title}
          </h1>
          {post.excerpt && (
            <p style={{
              color: 'rgba(255,255,255,0.55)', fontSize: '17px', fontStyle: 'italic',
              lineHeight: '1.6', marginBottom: '32px',
              paddingBottom: '28px', borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              {post.excerpt}
            </p>
          )}
          <div
            className="blog-content"
            style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: '1.85' }}
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />
        </article>
      )}

      <style>{`
        .blog-content p { margin: 0 0 1.4em; }
        .blog-content a {
          color: #818cf8;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .blog-content a:hover { color: #c4b5fd; }
        .blog-content strong { color: #fff; font-weight: 700; }
      `}</style>
    </section>
  );
}
