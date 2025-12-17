// app/(marketing)/contact/contact-client.tsx
'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import SplitText from '@/components/animated/reactbits/SplitText'
import TextType from '@/components/animated/reactbits/TextType'
import FadeIn from '@/components/motion/fade-in'
import ContactFormLite from '@/components/contact-form'
import ContactLinks from '@/components/contact-links'

interface ContactInfo {
  EMAIL: string
  WHATSAPP: string
  LINKEDIN: string
  LOCATION: string
  TIMEZONE: string
}

interface ContactClientProps {
  contactInfo: ContactInfo
}

export default function ContactClient({ contactInfo }: ContactClientProps) {
  const pathname = usePathname()
  const pageKey = useMemo(() => (pathname || 'contact') + '-v4', [pathname])

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section with Clean Design */}
      <section className="relative min-h-screen flex flex-col justify-start px-4 sm:px-6 pt-16 pb-12 w-full overflow-hidden">
        {/* Background Elements removed to avoid visual artifacts */}

        <div className="relative max-w-6xl mx-auto z-10 w-full">
          {/* Status Indicator */}
          <div className="mb-8 w-full">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-framer-blue/10 border border-framer-blue/20 text-framer-blue text-sm font-medium max-w-full">
                <div className="w-2 h-2 bg-framer-blue rounded-full animate-pulse flex-shrink-0" />
                <span className="truncate">Open to Data Science & ML opportunities</span>
              </div>
            </FadeIn>
          </div>

          {/* Tagline */}
          <div className="mb-8 w-full">
            <TextType
              key={`contact-tagline-${pageKey}`}
              text="Let's Make Something Amazing"
              className="text-sm md:text-base text-white/60 font-medium tracking-[0.1em] sm:tracking-[0.2em] uppercase break-words"
              typingSpeed={100}
              showCursor={false}
              initialDelay={200}
              startOnVisible={false}
              as="p"
            />
          </div>

          {/* Main Title */}
          <div className="mb-16 py-4 w-full">
            <SplitText
              key={`contact-title-${pageKey}`}
              text="Got a Project in Mind?"
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.85] tracking-tight mb-8 break-words"
              splitType="words, chars"
              delay={30}
              duration={0.8}
              ease="power3.out"
              from={{ opacity: 0, y: 100, rotationX: -45, scale: 0.8 }}
              to={{ opacity: 1, y: 0, rotationX: 0, scale: 1 }}
              startOnVisible={false}
            />
          </div>

          {/* Enhanced Description */}
          <div className="mb-12 max-w-4xl w-full">
            <FadeIn key={`contact-desc-${pageKey}`} delay={0.3}>
              <div className="space-y-6">
                <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed font-light break-words">
                  Open to full-time Data Science/ML roles, internships, research collaborations, and freelance projects.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed font-light break-words">
                  Let's build production ML systems and AI products that make an impact.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Methods Section - Simplified */}
      <section className="relative py-24 border-t border-white/10 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <div className="text-center mb-20">
            <FadeIn key={`methods-title-${pageKey}`}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 break-words">
                Let's Connect
              </h2>
              <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed break-words">
                Available for Data Science roles, ML projects, and collaboration opportunities.
              </p>
            </FadeIn>
          </div>

          {/* Contact Links Display */}
          <FadeIn key={`contact-links-${pageKey}`} delay={0.2}>
            <div className="w-full">
              <ContactLinks
                email={contactInfo.EMAIL}
                linkedinUrl={contactInfo.LINKEDIN}
                whatsappNumber={contactInfo.WHATSAPP}
                defaultMessage="Hi Ikrar! I saw your portfolio and would love to discuss a Data Science/ML opportunity or collaboration. Are you available for a quick chat?"
                variant="cards"
                className="mb-16"
              />
            </div>
          </FadeIn>

          {/* Location & Availability Info */}
          <div className="text-center w-full">
            <FadeIn key={`location-info-${pageKey}`} delay={0.5}>
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-4 sm:px-6 py-4 bg-white/5 border border-white/10 rounded-2xl max-w-full">
                <div className="flex items-center gap-2 text-white/70 text-center sm:text-left">
                  <span className="text-xs sm:text-sm font-medium break-words">{contactInfo.LOCATION}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-white/30 rounded-full flex-shrink-0" />
                <div className="flex items-center gap-2 text-white/70">
                  <span className="text-xs sm:text-sm font-medium">{contactInfo.TIMEZONE}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-white/30 rounded-full flex-shrink-0" />
                <div className="flex items-center gap-2 text-framer-blue">
                  <div className="w-2 h-2 bg-framer-blue rounded-full animate-pulse flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">Usually around 9 AM - 6 PM</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-24 border-t border-white/10 w-full" id="contact-form">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
          <div className="text-center mb-16">
            <FadeIn key={`form-section-title-${pageKey}`}>
              <SplitText
                key={`form-section-split-${pageKey}`}
                text="Or Drop Me a Line"
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 break-words"
                splitType="words"
                delay={40}
                duration={0.6}
                ease="power2.out"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                startOnVisible
              />
            </FadeIn>
            <FadeIn key={`form-section-desc-${pageKey}`} delay={0.2}>
              <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed break-words">
                Got a design project in mind? Share the details and I'll get back to you with creative ideas and next steps.
              </p>
            </FadeIn>
          </div>

          <FadeIn key={`contact-form-wrapper-${pageKey}`} delay={0.3}>
            <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden w-full">
              <div className="relative w-full">
                <ContactFormLite />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
