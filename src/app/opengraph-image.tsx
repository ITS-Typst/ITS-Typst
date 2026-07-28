import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/config/github.config';

export const runtime = 'edge';
export const alt = 'ITS Typst — Template Akademik';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, #003d7a 0%, #0060c0 50%, #0080ff 100%)',
        fontFamily: 'sans-serif',
        padding: '60px',
      }}
    >
      {/* Logo / Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '16px',
          padding: '16px 32px',
          marginBottom: '40px',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '2px',
          }}
        >
          ITS TYPST
        </span>
      </div>

      {/* Headline */}
      <div
        style={{
          color: '#ffffff',
          fontSize: '64px',
          fontWeight: 700,
          textAlign: 'center',
          lineHeight: 1.2,
          marginBottom: '24px',
          maxWidth: '900px',
        }}
      >
        Template Akademik
      </div>

      {/* Description */}
      <div
        style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '28px',
          textAlign: 'center',
          maxWidth: '800px',
          lineHeight: 1.5,
          marginBottom: '48px',
        }}
      >
        {SITE_CONFIG.description}
      </div>

      {/* URL chip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '999px',
          padding: '10px 28px',
        }}
      >
        <span style={{ color: '#ffffff', fontSize: '22px' }}>
          {SITE_CONFIG.url.replace('https://', '')}
        </span>
      </div>
    </div>,
    { ...size }
  );
}
