import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Grass Roots Sports — Community Basketball Academy, Pattaya';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top: location badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#2d6a4f',
            borderRadius: '100px',
            padding: '8px 20px',
          }}
        >
          <span style={{ color: '#ffffff', fontSize: '18px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Pattaya, Thailand
          </span>
        </div>

        {/* Middle: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ color: '#52b788', fontSize: '28px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Grass Roots Sports
          </div>
          <div style={{ color: '#ffffff', fontSize: '80px', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em' }}>
            Where Athletes Grow.
          </div>
          <div style={{ color: '#52b788', fontSize: '80px', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em' }}>
            Communities Connect.
          </div>
        </div>

        {/* Bottom: programs row */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {['Youth Basketball', 'Teen Academy', 'Adult Leagues', 'Private Coaching'].map((label) => (
            <div
              key={label}
              style={{
                background: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
                padding: '10px 20px',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
