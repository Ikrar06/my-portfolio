// app/(marketing)/about/about-client.tsx
'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import SplitText from '@/components/animated/reactbits/SplitText'
import TextType from '@/components/animated/reactbits/TextType'
import FadeIn from '@/components/motion/fade-in'
import SkillsList, { type Skill } from '@/components/skills/skills-list'
import DownloadCVButton from '@/components/download-cv-button'

interface AboutClientProps {
  skills: Skill[]
}

export default function AboutClient({ skills }: AboutClientProps) {
  const pathname = usePathname()
  const pageKey = useMemo(() => (pathname || 'about') + '-v3', [pathname])

  // =========================
  // DATA PENGALAMAN (sorted by timeline - descending)
  // =========================
  const experiences = [
    {
      icon: '💻',
      org: 'Cirebon Kuring - Cafe Management System',
      title: 'Fullstack Developer',
      type: 'Technical Role',
      dates: 'Jun 2025 – Present',
      duration: '7 mos',
      location: 'Remote',
      desc: `Building comprehensive cafe management system with cross-platform architecture. Designed database schema, implemented real-time inventory tracking with low-stock alerts, and developed both web (Next.js) and mobile (Flutter) interfaces. Focused on requirements gathering, technical specifications, and creating seamless user experiences across platforms.`,
      skills: [
        'Next.js', 'Flutter', 'TypeScript', 'Dart', 'PostgreSQL', 'Supabase',
        'Database Design', 'REST API', 'Cross-Platform Development', 'Requirements Gathering'
      ]
    },
    {
      icon: '🚀',
      org: 'Google Developer Group on Campus Hasanuddin University',
      title: 'Head of Creative Media Division',
      type: 'Leadership Role',
      dates: 'Aug 2025 – Present',
      duration: '5 mos',
      location: 'Makassar, South Sulawesi, Indonesia · On-site',
      desc: `Leading 6-member creative team with data-driven strategy achieving 46% follower growth (2,800 → 4,100) and 1M+ total content views. Managed content strategy, team coordination, and brand consistency across all channels. Peak performance: 515K monthly views (October 2025), representing 25x improvement vs previous period.`,
      extras: [
        { label: 'Instagram', value: '@gdgocunhas', href: 'https://instagram.com/gdgocunhas' }
      ],
      skills: [
        'Team Leadership (6+ members)', 'Data-Driven Strategy', 'Content Strategy', 'Social Media Strategy',
        'Brand Management', 'Performance Analytics', 'Graphic Design', 'Creative Direction'
      ]
    },
    {
      icon: '🏫',
      org: 'Coder Institute Hasanuddin University',
      title: 'Head of Creative Media Division',
      type: 'Leadership Role',
      dates: 'Feb 2025 – Present',
      duration: '11 mos',
      location: 'Gowa, South Sulawesi, Indonesia · On-site',
      desc: `Leading creative production for coding community. Managed workshop materials, educational content design, social media content strategy, and event branding. Ensured consistent brand identity across all channels while making complex coding concepts accessible through visual design.`,
      extras: [
        { label: 'Instagram', value: '@coderinstitute', href: 'https://instagram.com/coderinstitute' }
      ],
      skills: [
        'Content Strategy', 'Educational Content Design', 'Team Coordination', 'Brand Identity',
        'Graphic Design', 'Adobe Creative Suite', 'Figma', 'Social Media Graphics'
      ]
    },
    {
      icon: '🧩',
      org: 'Recursion UH (National Informatics Competition)',
      title: 'Publication, Design, and Documentation Coordinator',
      type: 'Leadership Role',
      dates: 'Sep 2024 – Apr 2025',
      duration: '8 mos',
      location: 'Makassar, South Sulawesi, Indonesia · On-site',
      desc: `Built social media presence from 0 → 894 followers in 7 months for inaugural national competition. Managed complete content pipeline, published 96+ content pieces, coordinated visual identity across all platforms. Promoted multi-campus competition with consistent branding and engagement strategy.`,
      extras: [
        { label: 'Instagram', value: '@recursion.uh', href: 'https://instagram.com/recursion.uh' }
      ],
      skills: [
        'Social Media Growth Strategy', 'Content Pipeline Management', 'Brand Identity', 'Visual Design',
        'Adobe Creative Suite', 'Figma', 'Video Editing', 'Team Coordination', 'Logo Design'
      ]
    },
    {
      icon: '🎟️',
      org: 'Coder Institute — NEXUS 2024 Seminar',
      title: 'Publication, Design, and Documentation Team Member',
      type: 'Event Project',
      dates: 'Aug 2024 – Sep 2024',
      duration: '2 mos',
      location: 'Remote',
      desc: `Created complete visual identity from scratch for national tech seminar. Designed logo, mascot, certificates, merchandise, and live event report graphics. Delivered cohesive branding system that enhanced participant experience and event engagement.`,
      skills: [
        'Complete Brand System Design', 'Logo Design', 'Mascot Design', 'Event Graphics',
        'Adobe Creative Suite', 'Figma', 'Print Design', 'Merchandise Design'
      ]
    },
    {
      icon: '📘',
      org: 'MAN Insan Cendekia Gorontalo',
      title: 'Creative Team on Xenavion Year Book Committee',
      type: 'Committee',
      dates: 'Jan 2023 – Jul 2023',
      duration: '7 mos',
      location: 'Gorontalo, Indonesia',
      desc: `My first real taste of publication design. Working on the Xenavion yearbook taught me how to maintain visual consistency across hundreds of pages while making sure every spread told its own story. It was meticulous work, but seeing classmates flip through the finished book made every late night worth it.`,
      skills: ['Graphic Design', 'Layout', 'Adobe Photoshop', 'Adobe Illustrator']
    },
    {
      icon: '🎭',
      org: 'NAYANGKARA',
      title: 'Creative Team',
      type: 'Arts Activity',
      dates: 'Sep 2022 – Jan 2023',
      duration: '5 mos',
      location: 'Gorontalo, Indonesia',
      desc: `This project was all about blending traditional Kecak dance with modern digital storytelling. I created digital content that complemented our performances, learning how to capture the energy of live art through video and graphics. It opened my eyes to how design can honor tradition while reaching new audiences.`,
      skills: ['Adobe Premiere Pro', 'After Effects', 'Editing', 'Graphic Design', 'Social Media Graphic Design']
    },
    {
      icon: '🎨',
      org: 'MAN Insan Cendekia Gorontalo Student Council',
      title: 'Art and Culture Division Member',
      type: 'Student Organization',
      dates: 'Oct 2021 – Aug 2022',
      duration: '11 mos',
      location: 'Gorontalo, Indonesia',
      desc: `This role taught me that good design serves a purpose beyond aesthetics. I organized cultural events and created content that actually got students excited about participating in arts programs. Managing our Instagram account was like running a mini creative agency, complete with content calendars and engagement strategies.`,
      skills: ['Adobe Premiere Pro', 'After Effects', 'Editing', 'Graphic Design', 'Adobe Photoshop', 'Adobe Illustrator']
    },
    {
      icon: '✨',
      org: 'INSPIRAL 2021',
      title: 'Creative Team',
      type: 'School Event',
      dates: 'Nov 2021 – Dec 2021',
      duration: '2 mos',
      location: 'Gorontalo, Indonesia',
      desc: `INSPIRAL was where I first experienced the rush of creating under pressure. With final exams behind us, we had this amazing opportunity to showcase what students could really do. I handled everything from logo design to promotional materials, learning that sometimes the best creative work happens when you're having fun with it.`,
      skills: ['Adobe Premiere Pro', 'After Effects', 'Editing', 'Graphic Design', 'Adobe Photoshop', 'Adobe Illustrator', 'Logo Design']
    }
  ]

  return (
    <>
      {/* Hero + Profile Snapshot */}
      <section className="relative min-h-[80vh] flex flex-col justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Tagline */}
          <div className="mb-8">
            <TextType
              key={`about-tagline-${pageKey}`}
              text="Data Scientist • ML Engineer • Full-Stack Developer • 5+ Years Design Leadership"
              className="text-sm md:text-base text-white/60 font-medium tracking-wider uppercase"
              typingSpeed={80}
              showCursor={false}
              initialDelay={0}
              startOnVisible={false}
              as="p"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 md:gap-12 items-start">
            {/* FOTO HD WITH BACKDROP BOX */}
            <div className="relative w-[300px] h-[300px] md:w-[440px] md:h-[440px] mx-auto md:mx-0">
              {/* Backdrop box */}
              <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-3xl p-3 hover:bg-white/[0.05] transition-all duration-700 hover:border-white/20 h-full flex flex-col items-center justify-center group">
                {/* Photo container */}
                <div className="relative w-[260px] h-[260px] md:w-[380px] md:h-[380px]">
                  <Image
                    src="/images/foto-ikrar.jpg"
                    alt="Foto Ikrar Gempur Tirani"
                    fill
                    sizes="(max-width: 768px) 200px, 420px"
                    priority
                    quality={100}
                    className="rounded-3xl object-cover border border-white/10 group-hover:border-white/20 transition-all duration-500"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
              </div>
            </div>

            {/* Bio singkat */}
            <FadeIn key={`about-bio-${pageKey}`} delay={0.1}>
              <div className="mt-8 md:mt-0">
                <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light mb-4">
                  Hi, I'm <span className="font-semibold text-white">Ikrar Gempur Tirani</span>, an{' '}
                  <span className="text-white">Informatics Engineering student</span> at Hasanuddin University (GPA 3.91/4.00) specializing in <span className="text-white">Data Science and Machine Learning</span> with focus on Natural Language Processing.
                </p>
                <p className="text-base md:text-lg text-white/60 leading-relaxed font-light mb-4">
                  I transform complex data into actionable insights through statistical analysis and hypothesis testing. From simulating 7,500-agent marketplaces to fine-tuning deep learning models with <span className="text-white">90%+ accuracy</span>, I combine rigorous data science methodology with production ML engineering.
                </p>
                <p className="text-base md:text-lg text-white/60 leading-relaxed font-light">
                  My experience spans the full spectrum: exploratory data analysis, statistical modeling, deep learning, and deploying ML systems to production. With full-stack development skills (Next.js, Flutter, Flask) and <span className="text-white">5 years of design leadership</span>, I bring a unique perspective to building AI products that are technically sound, production-ready, and intuitive for users.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-white/60">
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Born and raised in Gorontalo, January 6, 2005</div>
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Currently living in Makassar, South Sulawesi</div>
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Fifth semester Informatics student at Hasanuddin University (GPA 3.91)</div>
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Pursuing Data Science and ML Engineering roles</div>
                </div>

                <div className="mt-8">
                  <DownloadCVButton />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Layanan / Keahlian */}
      <section className="relative py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="py-4">
              <FadeIn key={`services-title-${pageKey}`}>
                <SplitText
                  key={`services-split-${pageKey}`}
                  text="What I Do"
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
                  splitType="words"
                  delay={60}
                  duration={0.6}
                  ease="power2.out"
                  from={{ opacity: 0, y: 50, scale: 0.9 }}
                  to={{ opacity: 1, y: 0, scale: 1 }}
                  threshold={0.2}
                  startOnVisible
                />
              </FadeIn>
            </div>
            <FadeIn key={`services-desc-${pageKey}`} delay={0.2}>
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
                My expertise spans data science, machine learning engineering, and full-stack development, with a unique differentiator in design leadership. This combination allows me to build AI products that are technically sound, production-ready, and user-friendly.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Data Science & Analytics',
                desc: 'Transforming data into insights through statistical analysis and hypothesis testing. From exploratory data analysis to experimental design, I apply rigorous methodology to extract meaningful patterns and validate findings.',
                icon: '📊',
                specialties: ['Exploratory Data Analysis', 'Statistical Modeling', 'Hypothesis Testing', 'Data Visualization']
              },
              {
                title: 'Machine Learning & NLP',
                desc: 'Building intelligent systems from training to production. Specializing in natural language processing and deep learning, with focus on fine-tuning transformers and deploying models that solve real-world problems.',
                icon: '🤖',
                specialties: ['Deep Learning (PyTorch)', 'Natural Language Processing', 'Model Training & Optimization', 'Production ML Systems']
              },
              {
                title: 'Full-Stack Development',
                desc: 'Shipping applications that bring ML models to users. Building responsive web and mobile interfaces with modern frameworks, connecting them to backend APIs, and deploying to production environments.',
                icon: '💻',
                specialties: ['React & Next.js', 'Flutter Mobile Apps', 'Flask APIs', 'Database Design']
              },
              {
                title: 'Design Leadership',
                desc: 'Leading creative teams with data-driven strategy. 5 years of hands-on experience with proven metrics: 1M+ content views, 46% follower growth. Bringing UI/UX thinking to AI products and technical projects.',
                icon: '🎨',
                specialties: ['Team Management (6+ members)', 'Brand Strategy', 'UI/UX for AI Products', 'Proven Growth Metrics']
              }
            ].map((service, i) => (
              <FadeIn key={`service-${i}-${pageKey}`} delay={0.1 * i}>
                <div className="group h-full">
                  <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-all duration-700 hover:border-white/20 h-full flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500">
                      <span className="text-3xl" aria-hidden="true">{service.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed mb-6 group-hover:text-white/70 transition-colors duration-300 flex-1">
                      {service.desc}
                    </p>
                    <div className="space-y-2">
                      {service.specialties.map((specialty, idx) => (
                        <div key={idx} className="flex items-center text-sm text-white/50 group-hover:text-white/60 transition-colors duration-300">
                          <div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" />
                          {specialty}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Keahlian Teknis */}
      <section className="relative py-24 border-t border-white/5" aria-labelledby="skills-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="py-4">
              <FadeIn key={`skills-title-${pageKey}`}>
                <SplitText
                  key={`skills-split-${pageKey}`}
                  text="Technical Skills"
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
                  splitType="words"
                  delay={60}
                  duration={0.6}
                  ease="power2.out"
                  from={{ opacity: 0, rotationY: 15 }}
                  to={{ opacity: 1, rotationY: 0 }}
                  startOnVisible
                />
              </FadeIn>
            </div>
            <FadeIn key={`skills-desc-${pageKey}`} delay={0.2}>
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
                Tools and technologies I use to transform data into insights, build intelligent systems, and ship production-ready applications. From statistical analysis to deep learning to full-stack development.
              </p>
            </FadeIn>
          </div>

          <FadeIn key={`skills-list-${pageKey}`} delay={0.3}>
            <div className="max-w-4xl mx-auto">
              <SkillsList skills={skills} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pengalaman */}
      <section className="relative py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn key={`exp-title-${pageKey}`}>
              <SplitText
                key={`exp-split-${pageKey}`}
                text="Experience & Leadership"
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
                splitType="words, chars"
                delay={80}
                duration={0.5}
                ease="power2.out"
                from={{ opacity: 0, scale: 0.8, rotationZ: 10 }}
                to={{ opacity: 1, scale: 1, rotationZ: 0 }}
                startOnVisible
              />
            </FadeIn>
            <FadeIn key={`exp-desc-${pageKey}`} delay={0.2}>
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
                From full-stack development to leading creative teams with data-driven strategy. My journey combines technical skills with proven leadership metrics: 1M+ content views and 46% follower growth.
              </p>
            </FadeIn>
          </div>

          {/* Timeline Layout */}
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/40 via-white/30 to-white/10 transform -translate-x-0.5"></div>

            <div className="space-y-12 md:space-y-16">
              {experiences.map((exp, i) => (
                <FadeIn key={`exp-${i}-${pageKey}`} delay={0.12 * i}>
                  <div className="relative flex items-center">
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute left-1/2 top-8 w-6 h-6 bg-white/30 rounded-full border-4 border-black shadow-lg transform -translate-x-1/2 z-10">
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>

                    {/* Content */}
                    <div className={`w-full md:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:ml-auto'}`}>
                      <article className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-700 group relative">
                        {/* Timeline dot for mobile */}
                        <div className="md:hidden w-5 h-5 bg-white/30 rounded-full absolute -left-2.5 top-8 border-2 border-black shadow-lg z-10">
                          <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>

                        <header className="flex items-start mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mr-5 group-hover:bg-white/15 transition-colors duration-500 flex-shrink-0">
                            <span className="text-2xl" aria-hidden="true">{exp.icon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                            <p className="text-white/80 font-medium">{exp.org}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm">
                              <span className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                                {exp.type}
                              </span>
                              <span className="text-white/60">•</span>
                              <span className="text-white/60">{exp.dates}</span>
                              <span className="text-white/50">({exp.duration})</span>
                            </div>
                            {exp.location && exp.location !== 'Remote' && (
                              <p className="text-white/40 text-xs mt-1">{exp.location}</p>
                            )}
                          </div>
                        </header>

                        <p className="text-white/70 leading-relaxed mb-5">{exp.desc}</p>

                        {/* Extras (link IG, dsb) */}
                        {exp.extras?.length ? (
                          <div className="flex flex-wrap gap-3 mb-5">
                            {exp.extras.map((ex, idx) => (
                              <a
                                key={idx}
                                href={ex.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-3 py-1 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-colors"
                                aria-label={`${ex.label}: ${ex.value}`}
                                title={`${ex.label}: ${ex.value}`}
                              >
                                {ex.label}: {ex.value}
                              </a>
                            ))}
                          </div>
                        ) : null}

                        {/* Skills chips */}
                        {exp.skills?.length ? (
                          <ul className="flex flex-wrap gap-2">
                            {exp.skills.map((s, idx) => (
                              <li
                                key={idx}
                                className="text-[11px] leading-5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/70"
                              >
                                {s}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </article>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <FadeIn key={`about-cta-${pageKey}`}>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Work Together?
              </h2>
              <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed">
                I'd love to hear about your project and explore how we can create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/contact"
                  className="group relative px-10 py-4 bg-framer-blue text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-framer-blue-hover hover:shadow-2xl hover:shadow-framer-blue/20"
                >
                  <span className="relative z-10">Get in Touch</span>
                </Link>
                <Link
                  href="/projects"
                  className="group px-10 py-4 border border-white/20 text-white font-medium rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
                >
                  <span>View My Work</span>
                  <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300 inline-block">→</span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
