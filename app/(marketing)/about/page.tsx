// app/(marketing)/about/page.tsx
'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import SplitText from '@/components/animated/reactbits/SplitText'
import TextType from '@/components/animated/reactbits/TextType'
import FadeIn from '@/components/motion/fade-in'
import SkillsList, { type Skill } from '@/components/skills/skills-list'
import skillsData from '@/data/skills.json'
import DownloadCVButton from '@/components/download-cv-button'

export default function AboutPage() {
  const pathname = usePathname()
  const pageKey = useMemo(() => (pathname || 'about') + '-v3', [pathname])
  const skills = skillsData as Skill[]

  // =========================
  // DATA PENGALAMAN (sorted by timeline - descending)
  // =========================
  const experiences = [
    {
      icon: '🚀',
      org: 'Google Developer Group on Campus Hasanuddin University',
      title: 'Head of Creative Media Division',
      type: 'Organization',
      dates: 'Aug 2025 – Present',
      duration: '1 mo',
      location: 'Makassar, South Sulawesi, Indonesia · On-site',
      desc: `Leading creative media strategies for campus developer community growth. Managing design team for videos, graphics, and educational content. Collaborating with stakeholders to optimize social platforms and amplify tech events.`,
      extras: [
        { label: 'Instagram', value: '@gdgocunhas', href: 'https://instagram.com/gdgocunhas' }
      ],
      skills: [
        'Social Media Graphic Design', 'Graphic Design', 'Branding', 'Creative Direction',
        'Content Creation', 'Social Media Strategy', 'Digital Marketing', 'Team Leadership',
        'Event Promotion & Branding', 'Project Management', 'Creative Problem-Solving'
      ]
    },
    {
      icon: '🏫',
      org: 'Coder Institute',
      title: 'Publication, Design, and Documentation Coordinator',
      type: 'Organization',
      dates: 'Feb 2025 – Present',
      duration: '7 mos',
      location: 'Gowa, South Sulawesi, Indonesia · On-site',
      desc: `Managing creation, publication, and organization of educational content. Designing promotional materials using Adobe Creative Suite and Figma for events and workshops. Overseeing development of coding tutorials and educational resources while organizing program documentation.`,
      extras: [
        { label: 'Instagram', value: '@coderinstitute', href: 'https://instagram.com/coderinstitute' }
      ],
      skills: [
        'Editing', 'Graphics', 'Graphic Design', 'Adobe Photoshop', 'Adobe Illustrator',
        'Figma (Software)', 'Canva', 'Social Media Graphic Design'
      ]
    },
    {
      icon: '🧩',
      org: 'Recursion UH',
      title: 'Publication, Design, and Documentation Coordinator',
      type: 'National Event',
      dates: 'Sep 2024 – Apr 2025',
      duration: '8 mos',
      location: 'Makassar, South Sulawesi, Indonesia · On-site',
      desc: `Oversaw end-to-end content pipeline from planning to publishing. Developed content calendar, visual guidelines, and coordinated production of social media content, event materials, and merchandise. Managed photo/video archive and delivered recap articles while monitoring analytics for content optimization.`,
      extras: [
        { label: 'Instagram', value: '@recursion.uh', href: 'https://instagram.com/recursion.uh' }
      ],
      skills: [
        'Adobe Illustrator', 'Adobe Photoshop', 'Adobe Premiere Pro', 'After Effects',
        'Branding', 'Brochures', 'Canva', 'Creative Problem Solving', 'Figma (Software)',
        'Graphic Design', 'Graphics', 'Social Media Graphic Design', 'Editing', 'Logo Design'
      ]
    },
    {
      icon: '🎟️',
      org: 'Coder Institute — NEXUS 2024',
      title: 'Publication, Design, and Documentation Team Member',
      type: 'Event',
      dates: 'Aug 2024 – Sep 2024',
      duration: '2 mos',
      location: '—',
      desc: `Created comprehensive visual elements for NEXUS 2024 tech seminar including logo, mascot, merchandise, certificates, and presentation materials. Documented event with live report designs to enhance branding and create cohesive participant experience.`,
      skills: [
        'Editing', 'Graphics', 'Graphic Design', 'Adobe Photoshop', 'Adobe Illustrator',
        'Logo Design', 'Figma (Software)', 'Canva'
      ]
    },
    {
      icon: '📘',
      org: 'MAN Insan Cendekia Gorontalo',
      title: 'Creative Team on Xenavion Year Book Committee',
      type: 'Committee',
      dates: 'Jan 2023 – Jul 2023',
      duration: '7 mos',
      location: '—',
      desc: `Developed overall design concept for Xenavion Year Book as creative team member, focusing on layout design and visual consistency throughout the publication.`,
      skills: ['Graphic Design', 'Layout', 'Adobe Photoshop', 'Adobe Illustrator']
    },
    {
      icon: '🎭',
      org: 'NAYANGKARA',
      title: 'Creative Team',
      type: 'Arts Activity',
      dates: 'Sep 2022 – Jan 2023',
      duration: '5 mos',
      location: '—',
      desc: `Developed digital specifications for art scenes in Xenavion project. Managed training, performances, and overall coordination of Kecak dance performances while creating supporting digital content.`,
      skills: ['Adobe Premiere Pro', 'After Effects', 'Editing', 'Graphic Design', 'Social Media Graphic Design']
    },
    {
      icon: '🎨',
      org: 'MAN Insan Cendekia Gorontalo Student Council',
      title: 'Art and Culture Division Member',
      type: 'Student Organization',
      dates: 'Oct 2021 – Aug 2022',
      duration: '11 mos',
      location: '—',
      desc: `Worked in cultural and artistic fields to uphold institutional values and encourage student artistic pursuits. Organized events, created engaging content for division's Instagram, and developed interactive media showcasing student artwork.`,
      skills: ['Adobe Premiere Pro', 'After Effects', 'Editing', 'Graphic Design', 'Adobe Photoshop', 'Adobe Illustrator']
    },
    {
      icon: '✨',
      org: 'INSPIRAL 2021',
      title: 'Creative Team',
      type: 'School Event',
      dates: 'Nov 2021 – Dec 2021',
      duration: '2 mos',
      location: '—',
      desc: `Contributed to creative team for student showcase event where MAN Insan Cendekia Gorontalo students demonstrated their academic, athletic, and artistic skills following final semester examinations.`,
      skills: ['Adobe Premiere Pro', 'After Effects', 'Editing', 'Graphic Design', 'Adobe Photoshop', 'Adobe Illustrator', 'Logo Design']
    }
  ]

  return (
    <>
      {/* ======================= */}
      {/* Hero + Profile Snapshot */}
      {/* ======================= */}
      <section className="relative min-h-[80vh] flex flex-col justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Tagline */}
          <div className="mb-8">
            <TextType
              key={`about-tagline-${pageKey}`}
              text="Graphic Designer • Head of Creative Media Division • 5+ Years Experience"
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
            {/* ====== FOTO HD WITH BACKDROP BOX ====== */}
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
            {/* Bio singkat */}
            <FadeIn key={`about-bio-${pageKey}`} delay={0.1}>
              <div className="mt-8 md:mt-0">
                <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light mb-4">
                  Hi there! I'm <span className="font-semibold text-white">Ikrar Gempur Tirani</span>, a passionate{' '}
                  <span className="text-white">Graphic Designer</span> born and raised in Gorontalo. At 20 years old, I've been creating visual stories for over 5 years, specializing in creative media strategies and publication design.
                </p>
                <p className="text-base md:text-lg text-white/60 leading-relaxed font-light">
                  Currently balancing my studies in <span className="text-white">Informatics Engineering</span> fifth semester at Hasanuddin University in Makassar with my role as <span className="text-white">Head of Creative Media Division</span> at Google Developer on Campus. I believe great design goes beyond aesthetics, it communicates clearly and creates meaningful connections with audiences.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-white/60">
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Born and raised in Gorontalo, January 6, 2005</div>
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Currently studying in Makassar, South Sulawesi</div>
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Informatics Engineering student, Hasanuddin University, fifth semester</div>
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Specializing in creative media strategy, brand design & team leadership</div>
                </div>

                <div className="mt-8">
                  <DownloadCVButton />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* Layanan / Keahlian */}
      {/* ===================== */}
      <section className="relative py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="py-4">
              <FadeIn key={`services-title-${pageKey}`}>
                <SplitText
                  key={`services-split-${pageKey}`}
                  text="Areas of Expertise"
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
                Services that combine creativity with strategy—ensuring visuals are not only aesthetically pleasing but also effective in achieving communication objectives.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: 'Creative Media Strategy',
                desc: 'Developing comprehensive media strategies to grow communities and enhance brand visibility through strategic visual storytelling and content planning.',
                icon: '🎯',
                specialties: ['Social Media Strategy', 'Brand Development', 'Content Planning', 'Community Growth']
              },
              {
                title: 'Graphic Design & Visual Identity',
                desc: 'Creating cohesive visual systems and compelling graphics that communicate effectively across digital and print platforms.',
                icon: '🎨',
                specialties: ['Logo & Brand Identity', 'Social Media Graphics', 'Publication Design', 'Marketing Materials']
              },
              {
                title: 'Publication & Documentation',
                desc: 'Managing end-to-end content pipelines from concept to publication, ensuring organized documentation and effective content distribution.',
                icon: '📚',
                specialties: ['Content Coordination', 'Documentation Systems', 'Editorial Design', 'Archive Management']
              }
            ].map((service, i) => (
              <FadeIn key={`service-${i}-${pageKey}`} delay={0.1 * i}>
                <div className="group h-full">
                  <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-all duration-700 hover:border-white/20 h-full flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500">
                      <span className="text-3xl">{service.icon}</span>
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

      {/* ===================== */}
      {/* Keahlian Teknis */}
      {/* ===================== */}
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
                Mastery of industry-standard design tools and digital content workflows. (Detailed list can be configured in <code>data/skills.json</code>.)
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

      {/* ===================== */}
      {/* Pengalaman (improved timeline with fixed alignment) */}
      {/* ===================== */}
      <section className="relative py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn key={`exp-title-${pageKey}`}>
              <SplitText
                key={`exp-split-${pageKey}`}
                text="Professional Journey"
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
                A chronological overview of my career progression, showcasing growth from creative team member to division head.
              </p>
            </FadeIn>
          </div>

          {/* Timeline Layout - Fixed version */}
          <div className="relative">
            {/* Timeline line - perfectly centered */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/40 via-white/30 to-white/10 transform -translate-x-0.5"></div>
            
            <div className="space-y-12 md:space-y-16">
              {experiences.map((exp, i) => (
                <FadeIn key={`exp-${i}-${pageKey}`} delay={0.12 * i}>
                  <div className="relative flex items-center">
                    {/* Timeline dot - perfectly centered on the line */}
                    <div className="hidden md:block absolute left-1/2 top-8 w-6 h-6 bg-white/30 rounded-full border-4 border-black shadow-lg transform -translate-x-1/2 z-10">
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>

                    {/* Content - alternating sides */}
                    <div className={`w-full md:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:ml-auto'}`}>
                      <article className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-700 group relative">
                        {/* Timeline dot for mobile */}
                        <div className="md:hidden w-5 h-5 bg-white/30 rounded-full absolute -left-2.5 top-8 border-2 border-black shadow-lg z-10">
                          <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                        
                        <header className="flex items-start mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mr-5 group-hover:bg-white/15 transition-colors duration-500 flex-shrink-0">
                            <span className="text-2xl">{exp.icon}</span>
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
                            {exp.location && exp.location !== '—' && (
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

    </>
  )
}