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

  // Handle email CTA click - open Gmail compose
  const handleEmailCTAClick = (e: React.MouseEvent) => {
    e.preventDefault()

    const subject = encodeURIComponent('Data Science/ML Opportunity Discussion')
    const body = encodeURIComponent('Hey Ikrar!\n\nI came across your Data Science and ML portfolio and I\'m really impressed with your work. I have an opportunity/project in mind and would love to discuss it.\n\n🎯 Opportunity Details:\nRole/Project type: \nCompany/Organization: \nKey requirements: \nTimeline: \n\n📅 When I\'m available for a call:\n- [Day/Time]\n- [Day/Time]\n- [Day/Time]\n\nLooking forward to connecting!\n\nBest,')
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.EMAIL}&subject=${subject}&body=${body}`

    // Open Gmail compose in new tab
    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section with Clean Design */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-20 w-full overflow-hidden">
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
          <div className="mb-20 max-w-4xl w-full">
            <FadeIn key={`contact-desc-${pageKey}`} delay={0.3}>
              <div className="space-y-6">
                <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed font-light break-words">
                  Whether you need data-driven insights for your business, a production ML system, or a full-stack application that brings AI to users, I'm here to help transform your data into impact with rigorous methodology and clean code.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed font-light break-words">
                  I'm currently available for <strong className="text-white/80">full-time Data Science/ML roles • internships • research collaborations • freelance projects</strong>.
                  I usually get back to people within a few hours (unless I'm deep in a training run), and I always offer a free 30-minute chat to discuss opportunities.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 w-full">
            {[
              { label: 'Response Time', value: '< 6 hours' },
              { label: 'Projects Delivered', value: '100%' },
              { label: 'Free Consultation', value: 'Always' },
              { label: 'Years Creating', value: '5+' }
            ].map((stat, i) => (
              <FadeIn key={`stat-${i}-${pageKey}`} delay={0.4 + i * 0.1}>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 break-words">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/60 break-words">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
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
                Pick whatever works best for you. I'm active on all these platforms and would love to discuss Data Science roles, ML projects, or collaboration opportunities.
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
                defaultMessage="Hi Ikrar! 👋 I saw your portfolio and would love to discuss a Data Science/ML opportunity or collaboration. Are you available for a quick chat?"
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
                  <span className="text-lg flex-shrink-0">📍</span>
                  <span className="text-xs sm:text-sm font-medium break-words">{contactInfo.LOCATION}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-white/30 rounded-full flex-shrink-0" />
                <div className="flex items-center gap-2 text-white/70">
                  <span className="text-lg flex-shrink-0">🕐</span>
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
                Prefer to share more details? Use this form to tell me about your opportunity, project, or collaboration idea and I'll get back to you with my thoughts.
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

      {/* Process Section */}
      <section className="relative py-24 border-t border-white/10 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <div className="text-center mb-20">
            <FadeIn key={`process-title-${pageKey}`}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 break-words">
                How We'll Work Together
              </h2>
              <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed break-words">
                I keep things simple and straightforward. No confusing jargon or hidden surprises, just clear steps from idea to final design.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
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
                <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 group relative w-full">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-framer-blue text-white text-sm font-bold rounded-full flex items-center justify-center flex-shrink-0">
                    {step.step}
                  </div>

                  <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500 flex-shrink-0">
                    <span className="text-3xl">{step.icon}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 text-center group-hover:text-white/90 transition-colors break-words">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-4 text-center group-hover:text-white/70 transition-colors break-words">
                    {step.desc}
                  </p>

                  <div className="text-center space-y-2">
                    <div className="text-sm text-framer-blue font-medium">
                      Timeline: {step.timeline}
                    </div>
                    <div className="text-xs text-white/50">
                      <div className="font-medium mb-1">You'll get:</div>
                      {step.deliverables.map((item, idx) => (
                        <div key={idx} className="break-words">• {item}</div>
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
      <section className="relative py-24 border-t border-white/10 w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
          <div className="text-center mb-20">
            <FadeIn key={`faq-section-title-${pageKey}`}>
              <SplitText
                key={`faq-section-split-${pageKey}`}
                text="Questions I Get Asked"
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 break-words"
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
              <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed break-words">
                The stuff people usually want to know before we start working together
              </p>
            </FadeIn>
          </div>

          <div className="space-y-4 w-full">
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
                <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 group w-full">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 group-hover:text-white/90 transition-colors duration-300 flex items-start gap-3 break-words">
                    <span className="text-framer-blue text-xl flex-shrink-0">Q.</span>
                    <span className="break-words">{faq.q}</span>
                  </h3>
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed group-hover:text-white/70 transition-colors duration-300 ml-8 break-words">
                    {faq.a}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Enhanced */}
      <section className="relative py-24 border-t border-white/10 w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full">
          <FadeIn key={`final-cta-${pageKey}`}>
            <div className="relative backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-12 md:p-16 text-center overflow-hidden w-full">
              {/* Background decoration removed to avoid visual artifacts */}

              <div className="relative z-10">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-framer-blue/20 border border-framer-blue/30 text-framer-blue text-sm font-medium mb-6 max-w-full">
                    <div className="w-2 h-2 bg-framer-blue rounded-full animate-pulse flex-shrink-0" />
                    <span className="truncate">Let's make something awesome</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 break-words leading-tight">
                    Ready to Start Something Cool Together?
                  </h2>

                  <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed break-words">
                    I'm genuinely excited to hear about opportunities and projects. Whether it's a Data Science role, ML collaboration, or full-stack development project, I love solving complex problems with data and code.
                  </p>
                </div>

                {/* CTA Buttons - Mobile optimized */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 w-full">
                  <a
                    href={`https://wa.me/${contactInfo.WHATSAPP.replace(/[^\d]/g, '')}?text=${encodeURIComponent('Hey Ikrar! 👋\n\nI came across your Data Science/ML portfolio and would love to discuss an opportunity.\n\nOpportunity type: \nCompany/Project: \nKey requirements: \n\nWhen works for a quick call?\n\nLooking forward to connecting!')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center px-6 sm:px-8 py-4 text-sm sm:text-base font-semibold text-white bg-framer-blue rounded-2xl hover:bg-framer-blue-hover transition-all duration-300 shadow-lg hover:shadow-framer-blue/25 w-full sm:w-auto min-w-[200px] break-words"
                  >
                    <span className="mr-2 flex-shrink-0">💬</span>
                    <span className="truncate">Let's Chat on WhatsApp</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0">→</span>
                  </a>

                  <button
                    onClick={handleEmailCTAClick}
                    className="group inline-flex items-center justify-center px-6 sm:px-8 py-4 text-sm sm:text-base font-semibold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 w-full sm:w-auto min-w-[200px] break-words"
                  >
                    <span className="mr-2 flex-shrink-0">✉️</span>
                    <span className="truncate">Send Me an Email</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0">→</span>
                  </button>
                </div>

                {/* Additional Info */}
                <div className="text-center space-y-2 text-white/50 w-full">
                  <p className="text-xs sm:text-sm break-words">
                    ⚡ Free 30-minute chat • 📞 Quick responses guaranteed • 🎯 Open to full-time, internship, and research opportunities
                  </p>
                  <p className="text-xs break-words">
                    Available for Data Science/ML roles • Based in {contactInfo.LOCATION}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
