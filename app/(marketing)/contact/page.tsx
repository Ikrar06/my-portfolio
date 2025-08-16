// app/(marketing)/contact/page.tsx
'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import SplitText from '@/components/animated/reactbits/SplitText'
import TextType from '@/components/animated/reactbits/TextType'
import FadeIn from '@/components/motion/fade-in'
import ContactFormLite from '@/components/contact-form'
import ContactLinks from '@/components/contact-links'

export default function ContactPage() {
  const pathname = usePathname()
  const pageKey = useMemo(() => (pathname || 'contact') + '-v4', [pathname])
  
  // Contact data - replace with your actual information
  const CONTACT_INFO = {
    EMAIL: 'ikrargempurtrn@gmail.com',
    WHATSAPP: '+6281214590205',
    LINKEDIN: 'https://www.linkedin.com/in/ikrar-gempur-tirani-867537283/',
    LOCATION: 'Makassar, South Sulawesi, Indonesia',
    TIMEZONE: 'UTC+8 (WITA)'
  }

  // Handle email CTA click - open Gmail compose
  const handleEmailCTAClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    const subject = encodeURIComponent('Ready to Start - Project Consultation')
    const body = encodeURIComponent('Hi Ikrar,\n\nI\'m ready to move forward with a design project and would like to schedule our consultation call.\n\n🎯 Project Details:\nType: \nTimeline: \nBudget: \nBrief description: \n\n📅 My availability for consultation:\n- [Day/Time]\n- [Day/Time]\n- [Day/Time]\n\nLooking forward to working together!\n\nBest regards,')
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_INFO.EMAIL}&subject=${subject}&body=${body}`
    
    // Open Gmail compose in new tab
    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {/* Hero Section with Clean Design */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 py-20">
        {/* Background Elements - Subtle without transparent gradients */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/8 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto z-10">
          {/* Status Indicator */}
          <div className="mb-8">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Available for new projects
              </div>
            </FadeIn>
          </div>

          {/* Tagline */}
          <div className="mb-8">
            <TextType
              key={`contact-tagline-${pageKey}`}
              text="Let's Create Together"
              className="text-sm md:text-base text-white/60 font-medium tracking-[0.2em] uppercase"
              typingSpeed={100}
              showCursor={false}
              initialDelay={200}
              startOnVisible={false}
              as="p"
            />
          </div>

          {/* Main Title */}
          <div className="mb-16 py-4">
            <SplitText
              key={`contact-title-${pageKey}`}
              text="Ready to Turn Ideas Into Reality?"
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.85] tracking-tight mb-8"
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
          <div className="mb-20 max-w-4xl">
            <FadeIn key={`contact-desc-${pageKey}`} delay={0.3}>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light">
                  I specialize in transforming creative visions into compelling visual experiences. 
                  From brand identity and social media strategy to publication design and creative direction.
                </p>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                  Currently accepting projects for <strong className="text-white/80">Q3-Q4 2025</strong>. 
                  I respond within 4-6 hours during business days and offer complimentary 30-minute 
                  consultation calls to discuss your project needs.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { label: 'Response Time', value: '< 6 hours' },
              { label: 'Projects Completed', value: '150+' },
              { label: 'Client Satisfaction', value: '98%' },
              { label: 'Years Experience', value: '5+' }
            ].map((stat, i) => (
              <FadeIn key={`stat-${i}-${pageKey}`} delay={0.4 + i * 0.1}>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods Section - Simplified */}
      <section className="relative py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn key={`methods-title-${pageKey}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Get In Touch
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                Choose your preferred way to reach out. I'm available through multiple channels 
                and respond quickly to all inquiries.
              </p>
            </FadeIn>
          </div>

          {/* Contact Links Display */}
          <FadeIn key={`contact-links-${pageKey}`} delay={0.2}>
            <ContactLinks
              email={CONTACT_INFO.EMAIL}
              linkedinUrl={CONTACT_INFO.LINKEDIN}
              whatsappNumber={CONTACT_INFO.WHATSAPP}
              defaultMessage="Hi Ikrar! 👋 I found your portfolio and would like to discuss a design project. When would be a good time for a consultation call?"
              variant="cards"
              className="mb-16"
            />
          </FadeIn>

          {/* Location & Availability Info */}
          <div className="text-center">
            <FadeIn key={`location-info-${pageKey}`} delay={0.5}>
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex items-center gap-2 text-white/70">
                  <span className="text-lg">📍</span>
                  <span className="text-sm font-medium">{CONTACT_INFO.LOCATION}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-white/30 rounded-full" />
                <div className="flex items-center gap-2 text-white/70">
                  <span className="text-lg">🕐</span>
                  <span className="text-sm font-medium">{CONTACT_INFO.TIMEZONE}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-white/30 rounded-full" />
                <div className="flex items-center gap-2 text-blue-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Usually online 9 AM - 6 PM</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-24 border-t border-white/10" id="contact-form">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn key={`form-section-title-${pageKey}`}>
              <SplitText
                key={`form-section-split-${pageKey}`}
                text="Send Me a Message"
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
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
              <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                Prefer to send a detailed message? Use the form below and I'll get back to you 
                within 4-6 hours with a personalized response.
              </p>
            </FadeIn>
          </div>

          <FadeIn key={`contact-form-wrapper-${pageKey}`} delay={0.3}>
            <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              
              <div className="relative">
                <ContactFormLite />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn key={`process-title-${pageKey}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                How We'll Work Together
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                A transparent, collaborative process designed to bring your vision to life efficiently
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                icon: '🎯',
                title: 'Discovery & Consultation',
                desc: 'Free 30-minute video call to understand your goals, audience, requirements, and vision. We\'ll discuss timeline, budget, and project scope.',
                timeline: 'Same day',
                deliverables: ['Project brief', 'Timeline proposal', 'Budget estimate']
              },
              {
                step: '02',
                icon: '📋',
                title: 'Proposal & Planning',
                desc: 'Detailed project proposal with deliverables, milestones, timeline, and investment. Upon approval, we kick off with mood boards and strategy.',
                timeline: '1-2 days',
                deliverables: ['Signed contract', 'Project roadmap', 'Style direction']
              },
              {
                step: '03',
                icon: '🎨',
                title: 'Design & Development',
                desc: 'I create initial concepts based on our discussions. Regular check-ins ensure we\'re aligned. Up to 3 revision rounds included.',
                timeline: '1-3 weeks',
                deliverables: ['Initial concepts', 'Revisions', 'Progress updates']
              },
              {
                step: '04',
                icon: '🚀',
                title: 'Final Delivery',
                desc: 'Final files in all requested formats, brand guidelines (if applicable), and 30 days of implementation support included.',
                timeline: '2-3 days',
                deliverables: ['Final files', 'Brand guidelines', 'Support period']
              }
            ].map((step, i) => (
              <FadeIn key={`step-${i}-${pageKey}`} delay={0.15 * i}>
                <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 group relative">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    {step.step}
                  </div>
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500">
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-white/90 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-white/60 leading-relaxed mb-4 text-center group-hover:text-white/70 transition-colors">
                    {step.desc}
                  </p>
                  
                  <div className="text-center space-y-2">
                    <div className="text-sm text-blue-400 font-medium">
                      Timeline: {step.timeline}
                    </div>
                    <div className="text-xs text-white/50">
                      <div className="font-medium mb-1">Deliverables:</div>
                      {step.deliverables.map((item, idx) => (
                        <div key={idx}>• {item}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn key={`faq-section-title-${pageKey}`}>
              <SplitText
                key={`faq-section-split-${pageKey}`}
                text="Frequently Asked Questions"
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                splitType="words"
                delay={50}
                duration={0.5}
                ease="power2.out"
                from={{ opacity: 0, rotationY: 10 }}
                to={{ opacity: 1, rotationY: 0 }}
                startOnVisible
              />
            </FadeIn>
            <FadeIn key={`faq-section-desc-${pageKey}`} delay={0.2}>
              <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                Everything you need to know about working with me
              </p>
            </FadeIn>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What design services do you specialize in?",
                a: "I focus on brand identity design, social media graphics and strategy, publication design (magazines, reports, presentations), creative direction for teams, and ongoing design coordination. I also offer consultation for creative campaigns and visual storytelling."
              },
              {
                q: "What's your typical project timeline?",
                a: "Social media graphics: 3-5 days | Logo & brand identity: 2-3 weeks | Publication design: 1-2 weeks | Website design: 3-4 weeks | Comprehensive brand packages: 4-6 weeks. Rush projects available with priority scheduling."
              },
              {
                q: "Do you work with startups and small organizations?",
                a: "Absolutely! I have extensive experience with startups, student organizations, educational institutions, and growing businesses. I offer flexible payment plans and scaled packages to fit different budgets and needs."
              },
              {
                q: "What's included in your design packages?",
                a: "All packages include: Initial consultation, concept development, up to 3 revision rounds, final files in multiple formats (PNG, JPG, PDF, source files when needed), basic brand guidelines, and 30 days of implementation support."
              },
              {
                q: "How do you handle revisions and feedback?",
                a: "I encourage detailed feedback and provide up to 3 rounds of revisions in every package. I use collaborative tools for easy feedback collection and maintain open communication throughout the process. Additional revisions are available at a transparent hourly rate."
              },
              {
                q: "What information do you need to get started?",
                a: "I'll need: Project goals and target audience, preferred timeline and budget range, brand guidelines (if existing), reference materials or inspiration, and any specific requirements or constraints. We'll cover all this in our discovery call."
              },
              {
                q: "Do you offer ongoing design support?",
                a: "Yes! I offer monthly retainer packages for clients who need regular design work, social media content, or creative direction. This includes priority scheduling, reduced rates, and dedicated monthly hours."
              },
              {
                q: "What are your rates and payment terms?",
                a: "Rates vary by project scope and timeline. I offer: Fixed-price packages for defined projects, hourly rates for ongoing work, and monthly retainers for regular needs. Payment terms: 50% upfront, 50% on completion. Multiple payment methods accepted."
              }
            ].map((faq, i) => (
              <FadeIn key={`faq-item-${i}-${pageKey}`} delay={0.05 * i}>
                <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 group">
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-white/90 transition-colors duration-300 flex items-start gap-3">
                    <span className="text-blue-400 text-xl flex-shrink-0">Q.</span>
                    {faq.q}
                  </h3>
                  <p className="text-white/60 leading-relaxed group-hover:text-white/70 transition-colors duration-300 ml-8">
                    {faq.a}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      

      {/* Call to Action - Enhanced */}
      <section className="relative py-24 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn key={`final-cta-${pageKey}`}>
            <div className="relative backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/8 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    Ready to start your project?
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    Let's Create Something
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                      Extraordinary Together
                    </span>
                  </h2>
                  
                  <p className="text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
                    I'm excited to learn about your project and explore how we can bring your vision to life. 
                    Choose your preferred way to get started, and let's create something amazing.
                  </p>
                </div>

                {/* CTA Buttons - Fixed */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <a 
                    href={`https://wa.me/${CONTACT_INFO.WHATSAPP.replace(/[^\d]/g, '')}?text=${encodeURIComponent('Hi Ikrar! 🚀\n\nI\'m ready to start a design project and would love to schedule a consultation call.\n\nProject type: \nTimeline: \nBudget range: \n\nWhen would be a good time to chat?\n\nThanks!')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 min-w-[200px]"
                  >
                    <span className="mr-2">💬</span>
                    Start on WhatsApp
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                  
                  <button
                    onClick={handleEmailCTAClick}
                    className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 min-w-[200px]"
                  >
                    <span className="mr-2">✉️</span>
                    Send Detailed Email
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>

                {/* Additional Info */}
                <div className="text-center space-y-2 text-white/50">
                  <p className="text-sm">
                    ⚡ Free 30-minute consultation • 📞 Usually respond within 4-6 hours • 🎯 Custom proposals
                  </p>
                  <p className="text-xs">
                    Currently booking projects for Q3-Q4 2025 • Based in {CONTACT_INFO.LOCATION}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}