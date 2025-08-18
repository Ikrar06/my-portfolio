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
    
    const subject = encodeURIComponent('Let\'s Talk About Your Project!')
    const body = encodeURIComponent('Hey Ikrar!\n\nI came across your work and I\'m really impressed. I have a project in mind and would love to chat about it.\n\n🎯 What I\'m Looking For:\nProject type: \nTimeline: \nBudget range: \nA bit about the project: \n\n📅 When I\'m free for a quick call:\n- [Day/Time]\n- [Day/Time]\n- [Day/Time]\n\nExcited to potentially work together!\n\nCheers,')
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
                Currently taking on new projects
              </div>
            </FadeIn>
          </div>

          {/* Tagline */}
          <div className="mb-8">
            <TextType
              key={`contact-tagline-${pageKey}`}
              text="Let's Make Something Amazing"
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
              text="Got a Project in Mind?"
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
                  Whether you need a fresh brand identity, killer social media graphics, or someone to lead your creative team, I'm here to help bring your vision to life. No boring corporate stuff, just real design that connects with people.
                </p>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                  I'm currently booking projects for <strong className="text-white/80">Q3-Q4 2025</strong>. 
                  I usually get back to people within a few hours (unless I'm deep in a design session), and I always offer a free 30-minute chat to see if we're a good fit.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { label: 'Response Time', value: '< 6 hours' },
              { label: 'Projects Delivered', value: '100%' },
              { label: 'Free Consultation', value: 'Always' },
              { label: 'Years Creating', value: '5+' }
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
                Let's Connect
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                Pick whatever works best for you. I'm pretty active on all these platforms and love hearing about new projects, no matter how big or small.
              </p>
            </FadeIn>
          </div>

          {/* Contact Links Display */}
          <FadeIn key={`contact-links-${pageKey}`} delay={0.2}>
            <ContactLinks
              email={CONTACT_INFO.EMAIL}
              linkedinUrl={CONTACT_INFO.LINKEDIN}
              whatsappNumber={CONTACT_INFO.WHATSAPP}
              defaultMessage="Hi Ikrar! 👋 I saw your work and would love to chat about a design project. Got a few minutes for a quick call sometime?"
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
                  <span className="text-sm font-medium">Usually around 9 AM - 6 PM</span>
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
                text="Or Drop Me a Line"
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
                More of a detailed person? I get it. Use this form to tell me all about your project and I'll get back to you with some thoughts and next steps.
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
                I keep things simple and straightforward. No confusing jargon or hidden surprises, just clear steps from idea to final design.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                icon: '🎯',
                title: 'Chat & Discovery',
                desc: 'We hop on a free 30-minute video call to talk about what you need, who you\'re trying to reach, and what success looks like. I\'ll ask lots of questions because details matter.',
                timeline: 'Same day',
                deliverables: ['Project outline', 'Timeline draft', 'Budget estimate']
              },
              {
                step: '02',
                icon: '📋',
                title: 'Proposal & Game Plan',
                desc: 'I\'ll send you a detailed proposal with everything we discussed, plus timelines and costs. Once you\'re happy, we kick off with some mood boards and creative direction.',
                timeline: '1-2 days',
                deliverables: ['Contract', 'Project timeline', 'Creative direction']
              },
              {
                step: '03',
                icon: '🎨',
                title: 'Design Magic',
                desc: 'This is where the fun happens. I create the first concepts based on our chat, then we refine them together. You get up to 3 rounds of changes to make sure it\'s perfect.',
                timeline: '1-3 weeks',
                deliverables: ['First concepts', 'Revisions', 'Regular updates']
              },
              {
                step: '04',
                icon: '🚀',
                title: 'Launch Ready',
                desc: 'Final files delivered in every format you need, plus brand guidelines if it\'s a brand project. I stick around for a month to help with any implementation questions.',
                timeline: '2-3 days',
                deliverables: ['Final files', 'Brand guidelines', '30-day support']
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
                      <div className="font-medium mb-1">You'll get:</div>
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
                text="Questions I Get Asked"
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
                The stuff people usually want to know before we start working together
              </p>
            </FadeIn>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What kind of design work do you do?",
                a: "I'm all about visual storytelling and brand identity. Think logos, social media content that actually gets people engaged, publication design for reports and magazines, creative direction for teams, and ongoing design coordination. I also love helping with creative campaigns and figuring out how to tell your story visually."
              },
              {
                q: "How long do projects usually take?",
                a: "Social media graphics: 3-5 days | Logo design: 2-3 weeks | Publication layouts: 1-2 weeks | Website design: 3-4 weeks | Full brand packages: 4-6 weeks. Need it faster? I can usually work something out with rush scheduling."
              },
              {
                q: "Do you work with smaller businesses and startups?",
                a: "Absolutely! Some of my favorite projects have been with startups, student organizations, and small businesses just getting started. I get how tight budgets can be, so I offer payment plans and different package options to make things work."
              },
              {
                q: "What exactly do I get when we work together?",
                a: "Every project includes: our initial strategy chat, concept development, up to 3 rounds of changes, final files in whatever formats you need (PNG, JPG, PDF, plus source files when it makes sense), basic brand guidelines, and I'm available for questions for 30 days after we wrap up."
              },
              {
                q: "How do you handle feedback and revisions?",
                a: "I actually love getting feedback, it makes the work so much better. Every package includes 3 rounds of revisions, and I use tools that make it super easy to leave comments and suggestions. If we need more rounds after that, I charge a fair hourly rate for additional changes."
              },
              {
                q: "What do you need from me to get started?",
                a: "Just bring your enthusiasm and some basic info: what you're trying to achieve, who you're trying to reach, rough timeline and budget, any existing brand stuff you have, and examples of things you like. We'll dig into all the details during our first call."
              },
              {
                q: "Can you handle ongoing design work?",
                a: "Yes! I love working with clients long-term. I offer monthly retainer packages for folks who need regular design work, social media content, or creative direction. You get priority scheduling, better rates, and a set number of hours each month to use however you need."
              },
              {
                q: "How much does it cost to work with you?",
                a: "It really depends on what you need and when you need it. I do fixed prices for defined projects, hourly rates for ongoing stuff, and monthly retainers for regular work. Payment is usually 50% to get started, 50% when we're done. I accept pretty much any payment method that works for you."
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
                    Let's make something awesome
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    Ready to Start Something
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                      Cool Together?
                    </span>
                  </h2>
                  
                  <p className="text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
                    I'm genuinely excited to hear about what you're working on. Every project is different and I love the challenge of figuring out how to make your vision come to life in the best way possible.
                  </p>
                </div>

                {/* CTA Buttons - Fixed */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <a 
                    href={`https://wa.me/${CONTACT_INFO.WHATSAPP.replace(/[^\d]/g, '')}?text=${encodeURIComponent('Hey Ikrar! 🎨\n\nI\'ve got a project idea and would love to chat about it.\n\nWhat I need help with: \nRough timeline: \nBudget I\'m thinking: \n\nWhen works for a quick call?\n\nThanks!')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 min-w-[200px]"
                  >
                    <span className="mr-2">💬</span>
                    Let's Chat on WhatsApp
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                  
                  <button
                    onClick={handleEmailCTAClick}
                    className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 min-w-[200px]"
                  >
                    <span className="mr-2">✉️</span>
                    Send Me an Email
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>

                {/* Additional Info */}
                <div className="text-center space-y-2 text-white/50">
                  <p className="text-sm">
                    ⚡ Free 30-minute chat • 📞 Quick responses guaranteed • 🎯 Custom approach for every project
                  </p>
                  <p className="text-xs">
                    Booking projects for Q3-Q4 2025 • Based in {CONTACT_INFO.LOCATION}
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