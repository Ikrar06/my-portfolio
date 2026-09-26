// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const alt = 'Ikrar Gempur Tirani — AI Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0A0A0A',
          backgroundImage:
            'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,255,255,0.10), transparent 70%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: '#0099FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              fontStyle: 'italic',
              fontWeight: 700,
            }}
          >
            I
          </div>
          <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.5)' }}>ikrar.dev</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            Ikrar Gempur Tirani
          </div>
          <div style={{ fontSize: 40, color: '#0099FF', fontWeight: 600 }}>AI Engineer</div>
          <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.6)', maxWidth: 900, lineHeight: 1.4 }}>
            RAG systems, NLP, and full-stack AI products · Informatics, Hasanuddin University
          </div>
        </div>
      </div>
    ),
    size
  )
}
