// components/footer.tsx
import Link from 'next/link'
import Image from 'next/image'

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/krargmprr',
    description: 'Behind the scenes & daily work',
    iconPath: '/icons/instagram.svg'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ikrargempurtirani/',
    description: 'Professional network',
    iconPath: '/icons/linkedin.svg'
  },
  {
    name: 'Github',
    href: 'https://github.com/Ikrar06',
    description: 'Open source projects & code',
    iconPath: '/icons/github.svg'
  }
] as const

const quickLinks = [
  { href: '/project', label: 'My Work', description: 'See what I\'ve created' },
  { href: '/about', label: 'About Me', description: 'Get to know me' },
  { href: '/contact', label: 'Let\'s Talk', description: 'Start your project' }
] as const

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-20 mb-6" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-lg">
          
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            
            {/* Brand & Personal Message */}
            <div className="space-y-4 lg:max-w-md">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-framer-blue via-framer-blue-light to-framer-blue bg-clip-text text-transparent">
                  Ikrar Gempur Tirani
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed text-justify">
                Informatics engineering student focusing on Data Science and ML. Learning to build intelligent systems with statistical analysis, NLP, and full-stack development.
              </p>
              <p className="text-sm text-text-tertiary">
                Available for Data Science/ML roles and research collaborations.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col sm:flex-row gap-12">
              
              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Explore</h3>
                <ul className="space-y-3">
                  {quickLinks.map(({ href, label, description }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="group block transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-framer-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-sm"
                      >
                        <span className="text-sm font-medium text-text-secondary group-hover:text-framer-blue transition-colors duration-200">
                          {label}
                        </span>
                        <p className="text-xs text-text-tertiary group-hover:text-text-secondary transition-colors duration-200 mt-0.5">
                          {description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Connect</h3>
                <ul className="space-y-3">
                  {socialLinks.map(({ name, href, description, iconPath }) => (
                    <li key={name}>
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 transition-all duration-200 hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-framer-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-sm"
                        aria-label={`Visit my ${name} profile (opens in new tab)`}
                      >
                        <span className="flex-shrink-0 mt-0.5 relative w-5 h-5">
                          <Image
                            src={iconPath}
                            alt={`${name} icon`}
                            width={20}
                            height={20}
                            className="transition-all duration-200 opacity-70 group-hover:opacity-100 brightness-90 group-hover:brightness-110 group-hover:scale-110"
                            style={{
                              filter: 'brightness(0) saturate(100%) invert(64%) sepia(6%) saturate(394%) hue-rotate(185deg) brightness(96%) contrast(85%)'
                            }}
                          />
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{
                              background: `url(${iconPath}) no-repeat center`,
                              backgroundSize: 'contain',
                              filter: 'brightness(0) saturate(100%) invert(50%) sepia(98%) saturate(2878%) hue-rotate(186deg) brightness(101%) contrast(107%)'
                            }}
                          />
                        </span>
                        <div>
                          <span className="text-sm font-medium text-text-secondary group-hover:text-framer-blue transition-colors duration-200 block">
                            {name}
                          </span>
                          <p className="text-xs text-text-tertiary group-hover:text-text-secondary transition-colors duration-200">
                            {description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-6 border-t border-slate-700/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <p className="text-center sm:text-left">
                © {currentYear} Ikrar Gempur Tirani
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <p className="flex items-center gap-1">
                  <span className="text-slate-400">Makassar, Indonesia</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}