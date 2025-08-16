// components/download-cv-button.tsx
'use client'

import { Download } from 'lucide-react'

export default function DownloadCVButton() {
  const handleClick = () => {
    // Vercel Analytics custom event (aman dipanggil opsional)
    try {
      ;(window as any).va?.('event', 'download_cv')
    } catch {
      // no-op
    }
  }

  return (
    <a
      href="/cv/Ikrar-Gempur-Tirani-CV.pdf"
      download="Ikrar-Gempur-Tirani-CV.pdf"
      onClick={handleClick}
      className="group inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
      aria-label="Download CV (PDF)"
    >
      <Download className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
      <span>Download CV</span>
      <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
        (PDF)
      </span>
    </a>
  )
}