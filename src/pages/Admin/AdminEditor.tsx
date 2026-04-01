import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Edit2, Eye, Save, FileText, CheckCircle, Clock, Info, Loader2 } from 'lucide-react';

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
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#206393;text-decoration:underline;font-weight:600">$1</a>'
  );

  // Konwertuj bare URLs na klikalne linki
  const withBareLinks = withMarkdownLinks.replace(
    /(?<!\")(?<!\()https?:\/\/[^\s<>"]+/g,
    url => `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#206393;text-decoration:underline;font-weight:600">${url}</a>`
  );

  // Konwertuj pogrubienie **tekst**
  const withBold = withBareLinks.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Konwertuj nowe linie na paragrafy
  const paragraphs = withBold.split(/\n\n+/).map(p =>
    `<p style="margin:0 0 1.2em">${p.replace(/\n/g, '<br>')}</p>`
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

  // Theme Constants
  const colors = {
    primary: '#002046',
    secondary: '#206393',
    surface: '#fdf9f6',
    surfaceContainer: '#f1edea',
    surfaceContainerHigh: '#ebe7e4',
    onSurface: '#1c1b1a',
    onSurfaceVariant: '#44474e',
    outline: '#c4c6cf',
    outlineVariant: '#e5e7eb',
  };

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
    background: '#fff',
    border: `1px solid ${colors.outlineVariant}`,
    borderRadius: '12px', color: colors.onSurface, fontSize: '15px',
    outline: 'none', transition: 'all 0.2s',
    fontFamily: "'Manrope', sans-serif",
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', color: colors.primary,
    fontSize: '13px', fontWeight: 700, marginBottom: '8px',
    textTransform: 'uppercase', letterSpacing: '0.03em',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.surface,
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
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            id="back-btn"
            onClick={onBack}
            style={{
              background: 'transparent', border: `1px solid ${colors.outlineVariant}`,
              borderRadius: '10px', color: colors.onSurfaceVariant, padding: '8px 16px',
              fontSize: '13px', cursor: 'pointer', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
            onMouseOver={e => (e.currentTarget.style.borderColor = colors.outline)}
            onMouseOut={e => (e.currentTarget.style.borderColor = colors.outlineVariant)}
          >
            <ArrowLeft size={16} />
            Powrót
          </button>
          <div style={{ width: '1px', height: '24px', background: colors.outlineVariant }}></div>
          <span style={{ fontWeight: 800, fontSize: '18px', color: colors.primary, letterSpacing: '-0.02em' }}>
            {post?.id ? 'Edycja wpisu' : 'Nowy wpis na blogu'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            id="preview-toggle-btn"
            onClick={() => setShowPreview(p => !p)}
            style={{
              padding: '10px 18px',
              background: showPreview ? 'rgba(32,99,147,0.08)' : 'transparent',
              border: `1px solid ${showPreview ? colors.secondary : colors.outlineVariant}`,
              borderRadius: '10px', color: showPreview ? colors.secondary : colors.onSurfaceVariant,
              fontSize: '14px', cursor: 'pointer', fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: '10px',
              transition: 'all 0.2s',
            }}
          >
            {showPreview ? (
              <><Edit2 size={16} /> Edytor</>
            ) : (
              <><Eye size={16} /> Podgląd</>
            )}
          </button>
          <button
            id="save-post-btn"
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '10px 24px',
              background: saving ? colors.outline : colors.primary,
              border: 'none', borderRadius: '10px', color: '#fff',
              fontSize: '14px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: '10px',
              boxShadow: '0 4px 12px rgba(0,32,70,0.15)',
            }}
          >
            {saving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <><Save size={18} /> Opublikuj / Zapisz</>
            )}
          </button>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '40px 32px',
        display: 'grid',
        gridTemplateColumns: showPreview ? '1fr 1fr' : '1fr 340px',
        gap: '32px',
        alignItems: 'start',
      }}>
        {/* Left: Editor or Preview */}
        <div style={{ minWidth: 0 }}>
          {showPreview ? (
            <div style={{
              background: '#fff',
              border: `1px solid ${colors.outlineVariant}`,
              borderRadius: '24px', padding: '48px',
              minHeight: '600px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            }}>
              <h1 style={{ 
                fontSize: '36px', 
                fontWeight: 900, 
                marginBottom: '16px', 
                color: colors.primary, 
                fontFamily: "'Manrope', sans-serif",
                letterSpacing: '-0.03em',
                lineHeight: 1.1
              }}>
                {title || <span style={{ opacity: 0.2 }}>Twój tytuł tutaj...</span>}
              </h1>
              {excerpt && (
                <p style={{ 
                  color: colors.onSurfaceVariant, 
                  fontSize: '18px', 
                  fontStyle: 'italic', 
                  marginBottom: '32px', 
                  borderLeft: `4px solid ${colors.secondary}`,
                  paddingLeft: '20px',
                  opacity: 0.8,
                  lineHeight: 1.6
                }}>
                  {excerpt}
                </p>
              )}
              <div
                style={{ 
                  color: colors.onSurface, 
                  lineHeight: '1.8', 
                  fontSize: '17px',
                  fontFamily: "'Noto Serif', serif" 
                }}
                dangerouslySetInnerHTML={{ __html: renderContent(content) }}
              />
            </div>
          ) : (
            <div style={{
              background: '#fff',
              border: `1px solid ${colors.outlineVariant}`,
              borderRadius: '24px', padding: '32px',
              display: 'flex', flexDirection: 'column', gap: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            }}>
              {/* Tytuł */}
              <div>
                <label style={labelStyle}>Tytuł Wpisu *</label>
                <input
                  id="post-title"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Wpisz przyciągający uwagę tytuł..."
                  style={{ ...inputStyle, padding: '16px 20px', fontSize: '20px', fontWeight: 800 }}
                  onFocus={e => (e.target.style.borderColor = colors.primary)}
                  onBlur={e => (e.target.style.borderColor = colors.outlineVariant)}
                />
                {title && (
                  <div style={{ fontSize: '12px', color: colors.secondary, marginTop: '8px', fontWeight: 600 }}>
                    Przyjazny adres URL: /{slugify(title)}
                  </div>
                )}
              </div>

              {/* Zajawka */}
              <div>
                <label style={labelStyle}>Krótka zajawka (Lead)</label>
                <textarea
                  id="post-excerpt"
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  placeholder="Krótki opis, który pojawi się na liście wszystkich wpisów..."
                  rows={2}
                  style={{ ...inputStyle, padding: '14px 20px', resize: 'none' }}
                  onFocus={e => (e.target.style.borderColor = colors.primary)}
                  onBlur={e => (e.target.style.borderColor = colors.outlineVariant)}
                />
              </div>

              {/* Treść */}
              <div>
                <label style={labelStyle}>Treść artykułu *</label>
                <textarea
                  id="post-content"
                  ref={textareaRef}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Zacznij pisać swoją historię tutaj..."
                  style={{
                    ...inputStyle,
                    padding: '20px',
                    minHeight: '400px',
                    resize: 'none',
                    overflow: 'hidden',
                    lineHeight: '1.8',
                    fontSize: '16px',
                  }}
                  onFocus={e => (e.target.style.borderColor = colors.primary)}
                  onBlur={e => (e.target.style.borderColor = colors.outlineVariant)}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: colors.onSurfaceVariant, marginTop: '8px', opacity: 0.6 }}>
                  <span>Statystyki: {content.split(/\s+/).filter(Boolean).length} słów · {content.length} znaków</span>
                  <span>Auto-zapis aktywny</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Settings panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Status */}
          <div style={{
            background: '#fff',
            border: `1px solid ${colors.outlineVariant}`,
            borderRadius: '24px', padding: '28px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: colors.primary, marginBottom: '20px', margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Publikacja
            </h3>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Status wpisu</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(['draft', 'published', 'scheduled'] as const).map(s => {
                  const items = {
                    draft: { label: 'Szkic roboczy', icon: <FileText size={16} /> },
                    published: { label: 'Opublikuj teraz', icon: <CheckCircle size={16} /> },
                    scheduled: { label: 'Zaplanuj wysyłkę', icon: <Clock size={16} /> }
                  };
                  const isSelected = status === s;
                  return (
                    <label key={s} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '12px 16px',
                      background: isSelected ? 'rgba(0,32,70,0.04)' : 'transparent',
                      border: `1px solid ${isSelected ? colors.primary : colors.outlineVariant}`,
                      borderRadius: '12px', cursor: 'pointer', fontSize: '14px',
                      fontWeight: isSelected ? 700 : 500,
                      transition: 'all 0.2s',
                    }}>
                      <input
                        type="radio"
                        name="status"
                        value={s}
                        checked={isSelected}
                        onChange={() => setStatus(s)}
                        style={{ accentColor: colors.primary }}
                      />
                      <span style={{ color: isSelected ? colors.primary : colors.onSurfaceVariant }}>
                        {items[s].icon}
                      </span>
                      <span style={{ color: isSelected ? colors.primary : colors.onSurface }}>
                        {items[s].label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {status === 'scheduled' && (
              <div style={{ animation: 'fadeIn 0.3s' }}>
                <label style={labelStyle}>Data i godzina</label>
                <input
                  id="post-published-at"
                  type="datetime-local"
                  value={publishedAt}
                  onChange={e => setPublishedAt(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  style={{
                    ...inputStyle,
                    padding: '12px 14px',
                  }}
                  onFocus={e => (e.target.style.borderColor = colors.primary)}
                  onBlur={e => (e.target.style.borderColor = colors.outlineVariant)}
                />
              </div>
            )}
          </div>

          {/* Błąd */}
          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fee2e2',
              borderRadius: '16px', padding: '16px 20px', color: '#b91c1c', fontSize: '13px',
              fontWeight: 600, display: 'flex', alignItems: 'flex-start', gap: '10px'
            }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Wskazówki */}
          <div style={{
            background: colors.surfaceContainer,
            border: `1px solid ${colors.outlineVariant}`,
            borderRadius: '24px', padding: '24px',
          }}>
            <div style={{ fontWeight: 800, color: colors.secondary, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.05em' }}>
              <Info size={16} />
              Wskazówki edytorskie
            </div>
            <div style={{ fontSize: '13px', color: colors.onSurfaceVariant, lineHeight: '1.6' }}>
              <div style={{ marginBottom: '8px' }}>• Use <code style={{ background: '#fff', padding: '2px 4px', borderRadius: '4px', border: `1px solid ${colors.outlineVariant}` }}>**bold**</code> for emphasis.</div>
              <div style={{ marginBottom: '8px' }}>• Links: <code style={{ background: '#fff', padding: '2px 4px', borderRadius: '4px', border: `1px solid ${colors.outlineVariant}` }}>[title](url)</code></div>
              <div>• Leave an empty line between paragraphs for better readability.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
