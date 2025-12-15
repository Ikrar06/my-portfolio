// components/nav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const links = useMemo(
    () => [
      { href: '/', label: 'Home' },
      { href: '/project', label: 'Project' },
      { href: '/design', label: 'Design' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
    []
  )

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-4 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-surface p-4 flex items-center justify-between">
          
          {/* Logo/Brand */}
          <Link
            href="/"
            className="group flex-shrink-0 font-bold text-lg text-white hover:text-framer-blue transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-framer-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-lg px-2 py-1"
            aria-label="Kembali ke halaman utama"
            onClick={closeMobileMenu}
          >
            <span className="bg-gradient-to-r from-framer-blue via-framer-blue-light to-framer-blue bg-clip-text text-transparent group-hover:from-framer-blue-light group-hover:via-white group-hover:to-framer-blue-light transition-colors duration-300">
              Ikrar Gempur Tirani
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Navigasi utama" className="hidden md:flex">
            <ul className="flex items-center space-x-2">
              {links.map(({ href, label }) => {
                // For /design page, also highlight if on /shots
                const isActive = pathname === href ||
                                (href === '/design' && pathname === '/shots')
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`
                        relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-framer-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
                        group overflow-hidden
                        ${isActive
                          ? 'text-white shadow-lg transform scale-105'
                          : 'text-text-secondary hover:text-white hover:scale-105'
                        }
                      `}
                    >
                      {/* Background untuk active state */}
                      <div
                        className={`
                          absolute inset-0 rounded-xl transition-all duration-300 ease-out
                          ${isActive
                            ? 'bg-framer-blue opacity-100 scale-100'
                            : 'bg-framer-blue opacity-0 scale-95 group-hover:opacity-80 group-hover:scale-100'
                          }
                        `}
                      />

                      {/* Glass overlay untuk depth */}
                      <div
                        className={`
                          absolute inset-0 rounded-xl backdrop-blur-sm transition-all duration-300
                          ${isActive
                            ? 'bg-white/10 border border-white/20'
                            : 'bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100'
                          }
                        `}
                      />
                      
                      {/* Text content */}
                      <span className="relative z-10 font-semibold">
                        {label}
                      </span>
                      
                      {/* Active indicator - dihapus */}
                      
                      {/* Bottom shine effect */}
                      {isActive && (
                        <div 
                          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-framer-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary transition-colors duration-200"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            onClick={toggleMobileMenu}
          >
            <svg 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>
      
      {/* Mobile Navigation - Outside main container */}
      {isMobileMenuOpen && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-2">
          <nav 
            id="mobile-menu" 
            aria-label="Navigasi mobile" 
            className="md:hidden"
          >
            <ul className="space-y-2 glass-surface p-4">
              {links.map(({ href, label }) => {
                // For /design page, also highlight if on /shots
                const isActive = pathname === href ||
                                (href === '/design' && pathname === '/shots')
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`
                        relative block px-4 py-4 rounded-xl text-sm font-medium transition-all duration-300
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-framer-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
                        group overflow-hidden
                        ${isActive
                          ? 'text-white transform scale-[1.02]'
                          : 'text-text-secondary hover:text-white hover:scale-[1.02]'
                        }
                      `}
                      onClick={closeMobileMenu}
                    >
                      {/* Background untuk mobile active state */}
                      <div
                        className={`
                          absolute inset-0 rounded-xl transition-all duration-300
                          ${isActive
                            ? 'bg-framer-blue opacity-100'
                            : 'bg-framer-blue opacity-0 group-hover:opacity-70'
                          }
                        `}
                      />

                      {/* Glass overlay untuk mobile */}
                      <div
                        className={`
                          absolute inset-0 rounded-xl backdrop-blur-sm transition-all duration-300
                          ${isActive
                            ? 'bg-white/10 border-l-4 border-framer-blue'
                            : 'bg-white/5 border-l-4 border-transparent group-hover:border-framer-blue/50'
                          }
                        `}
                      />
                      
                      {/* Text content untuk mobile */}
                      <span className="relative z-10 font-semibold">
                        {label}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}