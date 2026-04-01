import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Edit2, Eye, Save, FileText, CheckCircle, Clock, Info } from 'lucide-react';

import { Post } from '../../types/blog';

interface AdminEditorProps {
  token: string;
  post: Post | null;
  onSaved: () => void;
  onBack: () => void;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Prosta funkcja renderująca tekst z linkami do HTML
function renderContent(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Konwertuj [tekst](url) na linki
  const withMarkdownLinks = escaped.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#818cf8;text-decoration:underline">$1</a>'
  );

  // Konwertuj bare URLs na klikalne linki
  const withBareLinks = withMarkdownLinks.replace(
    /(?<!\")(?<!\()https?:\/\/[^\s<>"]+/g,
    url => `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#818cf8;text-decoration:underline">${url}</a>`
  );

  // Konwertuj pogrubienie **tekst**
  const withBold = withBareLinks.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Konwertuj nowe linie na paragrafy
  const paragraphs = withBold.split(/\n\n+/).map(p =>
    `<p style="margin:0 0 1em">${p.replace(/\n/g, '<br>')}</p>`
  ).join('');

  return paragraphs;
}

export default function AdminEditor({ token, post, onSaved, onBack }: AdminEditorProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>(post?.status || 'draft');
  const [publishedAt, setPublishedAt] = useState(
    post?.published_at ? post.published_at.slice(0, 16) : ''
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Tytuł i treść są wymagane');
      return;
    }
    if (status === 'scheduled' && !publishedAt) {
      setError('Wybierz datę publikacji dla zaplanowanego posta');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const body = {
        title,
        content,
        excerpt,
        status,
        published_at: status === 'scheduled' && publishedAt
          ? new Date(publishedAt).toISOString()
          : status === 'published'
          ? new Date().toISOString()
          : null,
      };

      const url = post?.id ? `/api/posts/${post.id}` : '/api/posts';
      const method = post?.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Błąd zapisu');
      onSaved();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Błąd połączenia');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', color: '#fff', fontSize: '15px',
    outline: 'none', transition: 'border-color 0.2s',
    fontFamily: "'Inter', sans-serif",
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', color: 'rgba(255,255,255,0.6)',
    fontSize: '13px', fontWeight: 500, marginBottom: '8px',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #0f172a 100%)',
      fontFamily: "'Inter', sans-serif",
      color: '#fff',
    }}>
      {/* Top bar */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            id="back-btn"
            onClick={onBack}
            style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', color: 'rgba(255,255,255,0.7)', padding: '7px 14px',
              fontSize: '13px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            <ArrowLeft size={14} />
            Powrót
          </button>
          <span style={{ fontWeight: 700, fontSize: '18px' }}>
            {post?.id ? 'Edytuj post' : 'Nowy post'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            id="preview-toggle-btn"
            onClick={() => setShowPreview(p => !p)}
            style={{
              padding: '8px 16px',
              background: showPreview ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${showPreview ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '8px', color: showPreview ? '#818cf8' : 'rgba(255,255,255,0.7)',
              fontSize: '13px', cursor: 'pointer', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            {showPreview ? (
              <>
                <Edit2 size={14} />
                Edytor
              </>
            ) : (
              <>
                <Eye size={14} />
                Podgląd
              </>
            )}
          </button>
          <button
            id="save-post-btn"
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '8px 20px',
              background: saving ? 'rgba(99,102,241,0.4)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none', borderRadius: '8px', color: '#fff',
              fontSize: '14px', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            {saving ? (
              'Zapisywanie...'
            ) : (
              <>
                <Save size={16} />
                Zapisz
              </>
            )}
          </button>
        </div>
      </div>

      <div style={{
        maxWidth: '1100px', margin: '0 auto', padding: '32px',
        display: 'grid',
        gridTemplateColumns: showPreview ? '1fr 1fr' : '1fr 320px',
        gap: '24px',
        alignItems: 'start',
      }}>
        {/* Left: Editor or Preview */}
        <div>
          {showPreview ? (
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px', padding: '32px',
              minHeight: '500px',
            }}>
              <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', color: '#fff' }}>
                {title || <span style={{ color: 'rgba(255,255,255,0.2)' }}>Tytuł posta...</span>}
              </h1>
              {excerpt && (
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', fontStyle: 'italic', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
                  {excerpt}
                </p>
              )}
              <div
                style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.8', fontSize: '15px' }}
                dangerouslySetInnerHTML={{ __html: renderContent(content) }}
              />
            </div>
          ) : (
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px', padding: '24px',
              display: 'flex', flexDirection: 'column', gap: '20px',
            }}>
              {/* Tytuł */}
              <div>
                <label style={labelStyle}>Tytuł *</label>
                <input
                  id="post-title"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Wpisz tytuł posta..."
                  style={{ ...inputStyle, padding: '12px 16px', fontSize: '18px', fontWeight: 600 }}
                  onFocus={e => (e.target.style.borderColor = '#6366f1')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
                {title && (
                  <div style={{ fontSize: '12px', color: '#6366f1', marginTop: '6px' }}>
                    Slug: /{slugify(title)}
                  </div>
                )}
              </div>

              {/* Zajawka */}
              <div>
                <label style={labelStyle}>Zajawka (krótki opis – wyświetlany na liście bloga)</label>
                <input
                  id="post-excerpt"
                  type="text"
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  placeholder="Krótki opis posta..."
                  style={{ ...inputStyle, padding: '10px 16px' }}
                  onFocus={e => (e.target.style.borderColor = '#6366f1')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>

              {/* Treść */}
              <div>
                <label style={labelStyle}>
                  Treść *
                  <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.35)', marginLeft: '8px' }}>
                    Wklej tekst. Linki: [tekst](https://...) lub same URL. **Pogrubienie**
                  </span>
                </label>
                <textarea
                  id="post-content"
                  ref={textareaRef}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Wklej lub napisz treść posta tutaj...

Możesz używać:
- Zwykłego tekstu
- Linków: [kliknij tutaj](https://example.com) lub same https://...
- **Pogrubionego tekstu**

Puste linie tworzą nowe akapity."
                  style={{
                    ...inputStyle,
                    padding: '14px 16px',
                    minHeight: '320px',
                    resize: 'none',
                    overflow: 'hidden',
                    lineHeight: '1.7',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#6366f1')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginTop: '4px' }}>
                  {content.length} znaków · {content.split(/\s+/).filter(Boolean).length} słów
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Settings panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Status */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px', padding: '24px',
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '16px', margin: '0 0 16px' }}>
              Ustawienia publikacji
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Status</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(['draft', 'published', 'scheduled'] as const).map(s => {
                  const labels = {
                    draft: { label: 'Szkic', icon: <FileText size={14} /> },
                    published: { label: 'Opublikuj teraz', icon: <CheckCircle size={14} /> },
                    scheduled: { label: 'Zaplanuj', icon: <Clock size={14} /> }
                  };
                  return (
                    <label key={s} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 14px',
                      background: status === s ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${status === s ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
                      transition: 'all 0.2s',
                    }}>
                      <input
                        type="radio"
                        name="status"
                        value={s}
                        checked={status === s}
                        onChange={() => setStatus(s)}
                        style={{ accentColor: '#6366f1' }}
                      />
                      {labels[s].icon}
                      {labels[s].label}
                    </label>
                  );
                })}
              </div>
            </div>

            {status === 'scheduled' && (
              <div>
                <label style={labelStyle}>Data i godzina publikacji</label>
                <input
                  id="post-published-at"
                  type="datetime-local"
                  value={publishedAt}
                  onChange={e => setPublishedAt(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  style={{
                    ...inputStyle,
                    padding: '10px 14px',
                    colorScheme: 'dark',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#6366f1')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
            )}
          </div>

          {/* Błąd */}
          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '10px', padding: '12px 16px', color: '#fca5a5', fontSize: '13px',
            }}>
              {error}
            </div>
          )}

          {/* Wskazówki */}
          <div style={{
            background: 'rgba(99,102,241,0.06)',
            border: '1px solid rgba(99,102,241,0.15)',
            borderRadius: '16px', padding: '20px',
            fontSize: '13px', color: 'rgba(255,255,255,0.5)',
            lineHeight: '1.7',
          }}>
            <div style={{ fontWeight: 600, color: '#818cf8', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={16} />
              Formatowanie tekstu
            </div>
            <div><code style={{ color: '#c4b5fd' }}>[tekst](https://...)</code> → klikalne linki</div>
            <div style={{ marginTop: '6px' }}><code style={{ color: '#c4b5fd' }}>https://...</code> → auto-link</div>
            <div style={{ marginTop: '6px' }}><code style={{ color: '#c4b5fd' }}>**tekst**</code> → <strong>pogrubienie</strong></div>
            <div style={{ marginTop: '6px' }}>Pusta linia → nowy akapit</div>
          </div>
        </div>
      </div>
    </div>
  );
}
