import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Loader2 } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Theme Constants
  const colors = {
    primary: '#002046',
    secondary: '#206393',
    surface: '#fdf9f6',
    surfaceContainer: '#f1edea',
    onSurface: '#1c1b1a',
    onSurfaceVariant: '#44474e',
    outline: '#c4c6cf',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Błąd logowania');
      localStorage.setItem('admin_token', data.token);
      onLogin(data.token);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Błąd połączenia z serwerem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.surface,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Manrope', sans-serif",
      padding: '24px',
    }}>
      <div style={{
        background: '#ffffff',
        border: `1px solid ${colors.outline}`,
        borderRadius: '24px',
        padding: '56px 48px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 20px 50px rgba(0,32,70,0.08)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'rgba(0,32,70,0.04)',
            borderRadius: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.primary,
            marginBottom: '20px',
          }}>
            <ShieldCheck size={32} strokeWidth={1.5} />
          </div>
          <h1 style={{ 
            color: colors.primary, 
            fontSize: '28px', 
            fontWeight: 800, 
            margin: '0 0 8px',
            letterSpacing: '-0.02em'
          }}>
            Panel Administracyjny
          </h1>
          <p style={{ color: colors.onSurfaceVariant, fontSize: '15px', margin: 0, opacity: 0.8 }}>
            Wprowadź dane, aby zarządzać treścią strony
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              color: colors.primary, 
              fontSize: '13px', 
              fontWeight: 700, 
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Adres Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ 
                position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                color: colors.outline
              }} />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@akwengym.pl"
                required
                style={{
                  width: '100%', padding: '14px 16px 14px 48px', boxSizing: 'border-box',
                  background: colors.surfaceContainer,
                  border: '1px solid transparent',
                  borderRadius: '12px', color: colors.onSurface, fontSize: '15px',
                  outline: 'none', transition: 'all 0.2s',
                }}
                onFocus={e => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.background = '#fff';
                  e.target.style.boxShadow = `0 0 0 4px rgba(0,32,70,0.05)`;
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'transparent';
                  e.target.style.background = colors.surfaceContainer;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ 
              display: 'block', 
              color: colors.primary, 
              fontSize: '13px', 
              fontWeight: 700, 
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Hasło dostępu
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ 
                position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                color: colors.outline
              }} />
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '14px 16px 14px 48px', boxSizing: 'border-box',
                  background: colors.surfaceContainer,
                  border: '1px solid transparent',
                  borderRadius: '12px', color: colors.onSurface, fontSize: '15px',
                  outline: 'none', transition: 'all 0.2s',
                }}
                onFocus={e => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.background = '#fff';
                  e.target.style.boxShadow = `0 0 0 4px rgba(0,32,70,0.05)`;
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'transparent';
                  e.target.style.background = colors.surfaceContainer;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fee2e2',
              borderRadius: '12px', padding: '12px 16px', color: '#b91c1c',
              fontSize: '14px', marginBottom: '24px', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: '10px'
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <button
            id="admin-login-btn"
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '16px',
              background: loading ? colors.outline : colors.primary,
              border: 'none', borderRadius: '12px', color: '#fff',
              fontSize: '16px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              letterSpacing: '0.02em',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
            }}
            onMouseOver={e => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseOut={e => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Zaloguj się do systemu'}
          </button>
        </form>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <button 
            type="button"
            onClick={() => window.location.href = '/'}
            style={{ 
              background: 'none', border: 'none', color: colors.onSurfaceVariant,
              fontSize: '14px', fontWeight: 600, cursor: 'pointer', opacity: 0.6,
              transition: 'opacity 0.2s'
            }}
            onMouseOver={e => (e.currentTarget.style.opacity = '1')}
            onMouseOut={e => (e.currentTarget.style.opacity = '0.6')}
          >
            Powrót do strony głównej
          </button>
        </div>
      </div>
    </div>
  );
}
