// components/contact-links.tsx
'use client'

import { useState } from 'react'

type ContactLinksProps = {
  email: string
  linkedinUrl: string
  whatsappNumber: string  // example: "+6281234567890" or "081234567890"
  instagramUrl?: string
  phoneNumber?: string    // optional, example: "+6281xxxx"
  defaultMessage?: string // optional: pre-filled WA message
  showLabels?: boolean
  variant?: 'default' | 'compact' | 'buttons' | 'cards'
  className?: string
}

export default function ContactLinks({
  email,
  linkedinUrl,
  whatsappNumber,
  instagramUrl,
  phoneNumber,
  defaultMessage = 'Hi, I\'m interested in working together. (sent from your portfolio website)',
  showLabels = true,
  variant = 'default',
  className = ''
}: ContactLinksProps) {
  const [copiedEmail, setCopiedEmail] = useState(false)
  
  // Normalize WA number (remove non-digits, allow plus at the beginning)
  const waDigits = whatsappNumber.replace(/[^\d+]/g, '')
  const waUrl = `https://wa.me/${waDigits.replace(/^\+/, '')}${defaultMessage ? `?text=${encodeURIComponent(defaultMessage)}` : ''}`
  
  const onTrack = (name: string, data?: any) => {
    try { 
      (window as any).va?.('event', name, data) 
    } catch { 
      /* no-op */ 
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopiedEmail(true)
      onTrack('contact_email_copied')
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch {
      // Fallback - just open email client
      window.location.href = `mailto:${email}`
    }
  }

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent default mailto behavior
    
    // Track the click
    onTrack('contact_click_email')
    
    // Try to open Gmail compose in new tab
    const subject = encodeURIComponent('Inquiry from Portfolio')
    const body = encodeURIComponent('Hi Ikrar,\n\nI found your portfolio and would like to discuss a potential project.\n\nBest regards,')
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&subject=${subject}&body=${body}`
    
    // Open Gmail compose in new tab
    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  }

  const contactItems = [
    {
      id: 'email',
      label: 'Email',
      value: email,
      icon: '✉️',
      href: '#', // Changed to # since we handle click manually
      description: 'Professional inquiries',
      color: 'emerald',
      action: handleEmailClick,
      canCopy: true
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      value: whatsappNumber,
      icon: '💬',
      href: waUrl,
      description: 'Quick messages',
      color: 'green',
      target: '_blank',
      action: () => onTrack('contact_click_whatsapp')
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'Professional network',
      icon: '🔗',
      href: linkedinUrl,
      description: 'Connect professionally',
      color: 'blue',
      target: '_blank',
      action: () => onTrack('contact_click_linkedin')
    },
    ...(instagramUrl ? [{
      id: 'instagram',
      label: 'Instagram',
      value: 'Creative showcase',
      icon: '📸',
      href: instagramUrl,
      description: 'Behind the scenes',
      color: 'pink',
      target: '_blank',
      action: () => onTrack('contact_click_instagram')
    }] : []),
    ...(phoneNumber ? [{
      id: 'phone',
      label: 'Phone',
      value: phoneNumber,
      icon: '📞',
      href: `tel:${phoneNumber}`,
      description: 'Direct calls',
      color: 'gray',
      action: () => onTrack('contact_click_phone')
    }] : [])
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: 'border-emerald-600 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-900/20',
      green: 'border-[#25D366] text-[#0b5d2b] hover:bg-[#e7f9ef] dark:border-[#25D366]/80 dark:text-[#25D366] dark:hover:bg-green-900/20',
      blue: 'border-[#0A66C2] text-[#0A66C2] hover:bg-[#eaf3ff] dark:border-[#0A66C2]/80 dark:text-[#0A66C2] dark:hover:bg-blue-900/20',
      pink: 'border-pink-500 text-pink-600 hover:bg-pink-50 dark:border-pink-500/80 dark:text-pink-400 dark:hover:bg-pink-900/20',
      gray: 'border-gray-400 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-900/20'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.gray
  }

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
        {contactItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target={item.target}
            rel={item.target ? 'noreferrer' : undefined}
            onClick={item.action || undefined}
            className="group w-12 h-12 bg-white/5 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            aria-label={item.label}
            title={item.label}
          >
            <span className="text-xl group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
          </a>
        ))}
      </div>
    )
  }

  if (variant === 'cards') {
    return (
      <div className={`flex flex-wrap justify-center gap-4 max-w-5xl mx-auto ${className}`}>
        {contactItems.map((item) => (
          <div key={item.id} className="group relative w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] min-w-[280px] max-w-[400px]">
            <a
              href={item.href}
              target={item.target}
              rel={item.target ? 'noreferrer' : undefined}
              onClick={item.action || undefined}
              className="block p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center group-hover:from-white/20 group-hover:to-white/10 transition-all">
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{item.label}</h3>
                  <p className="text-xs text-white/60">{item.description}</p>
                </div>
              </div>
              <p className="text-sm text-white/70 truncate">{item.value}</p>
            </a>
            
            {item.canCopy && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  copyEmail()
                }}
                className="absolute top-2 right-2 w-6 h-6 bg-white/10 hover:bg-white/20 border border-white/20 rounded flex items-center justify-center text-xs text-white/70 hover:text-white transition-all"
                title="Copy email"
              >
                {copiedEmail ? '✓' : '📋'}
              </button>
            )}
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'buttons') {
    return (
      <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
        {contactItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target={item.target}
            rel={item.target ? 'noreferrer' : undefined}
            onClick={item.action || undefined}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-medium transition-all duration-300 hover:scale-105 ${getColorClasses(item.color)}`}
          >
            <span>{item.icon}</span>
            {showLabels && <span>{item.label}</span>}
          </a>
        ))}
      </div>
    )
  }

  // Default variant - Fixed untuk center alignment
  return (
    <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-4xl mx-auto place-items-center">
        {contactItems.map((item) => (
          <div key={item.id} className="relative group w-full max-w-sm">
            <a
              href={item.href}
              target={item.target}
              rel={item.target ? 'noreferrer' : undefined}
              onClick={item.action || undefined}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950 w-full group-hover:scale-[1.02] ${getColorClasses(item.color)}`}
              aria-label={`${item.label}: ${item.value}`}
            >
              <span className="text-base">{item.icon}</span>
              {showLabels && (
                <div className="flex flex-col items-start">
                  <span>{item.label}</span>
                  {item.description && (
                    <span className="text-xs opacity-70 font-normal">
                      {item.description}
                    </span>
                  )}
                </div>
              )}
            </a>
            
            {/* Copy functionality for email */}
            {item.canCopy && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  copyEmail()
                }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0"
                title="Copy email address"
              >
                {copiedEmail ? '✓' : '📋'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}