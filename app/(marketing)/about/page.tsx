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
      desc: `Leading creative media strategies that actually get people excited about tech. I manage a team of designers creating everything from event visuals to educational content, and honestly, seeing our community grow through great design is pretty rewarding. My focus is on making tech events feel approachable and fun, not intimidating.`,
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
      desc: `I handle the creative side of educational content here, from designing workshop materials to organizing all our documentation. Using Adobe Creative Suite and Figma, I make sure everything looks cohesive and actually helps people learn. There's something satisfying about turning complex coding concepts into visuals that just click.`,
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
      desc: `This was where I really learned what it means to manage a complete content pipeline. From brainstorming sessions to final posts, I coordinated everything while keeping our visual identity tight across all platforms. The analytics told a great story too, seeing engagement grow month by month was incredibly motivating.`,
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
      location: 'Remote',
      desc: `NEXUS 2024 was my playground for creating a complete visual identity from scratch. I designed everything from the logo and mascot to certificates and merch. The live event reports were particularly fun to create, giving the seminar a real-time energy that participants still talk about.`,
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
      {/* ======================= */}
      {/* Hero + Profile Snapshot */}
      {/* ======================= */}
      <section className="relative min-h-[80vh] flex flex-col justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Tagline */}
          <div className="mb-8">
            <TextType
              key={`about-tagline-${pageKey}`}
              text="Graphic Designer • Creative Lead • AI Enthusiast • 5+ Years Experience"
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
            <FadeIn key={`about-bio-${pageKey}`} delay={0.1}>
              <div className="mt-8 md:mt-0">
                <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light mb-4">
                  Hey there! I'm <span className="font-semibold text-white">Ikrar Gempur Tirani</span>, a{' '}
                  <span className="text-white">graphic designer</span> from Gorontalo who's been turning ideas into visuals for over 5 years now. What started as messing around with Photoshop in high school has become this genuine love for making complex things look simple and beautiful.
                </p>
                <p className="text-base md:text-lg text-white/60 leading-relaxed font-light">
                  Currently balancing my fifth semester in <span className="text-white">Informatics Engineering</span> at Hasanuddin University while leading creative media at Google Developer on Campus. I'm that person who gets excited about clean typography and perfectly aligned layouts, but also loves diving deep into how AI is reshaping the creative industry. For me, great design isn't just about looking good, it's about creating that instant connection where people just get it.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-white/60">
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Born and raised in Gorontalo, January 6, 2005</div>
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Currently living in Makassar, South Sulawesi</div>
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Fifth semester Informatics student at Hasanuddin University</div>
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Always curious about the intersection of design, technology, and human behavior</div>
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
                  text="What Gets Me Excited"
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
                These are the areas where I lose track of time. I believe the best work happens when you genuinely enjoy what you're doing, and every project becomes an opportunity to learn something new.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Creative Strategy & Community Building',
                desc: 'There\'s something special about watching communities grow through thoughtful design. I help organizations tell their stories in ways that actually resonate with people, using visuals that spark conversations and bring people together.',
                icon: '🎯',
                specialties: ['Social Media Strategy', 'Brand Development', 'Content Planning', 'Community Growth']
              },
              {
                title: 'Visual Design & Brand Identity',
                desc: 'From sketching logos to building complete brand systems, I create visuals that stick in people\'s minds. Whether it\'s digital or print, every design needs to serve a purpose and tell a story worth remembering.',
                icon: '🎨',
                specialties: ['Logo & Brand Identity', 'Social Media Graphics', 'Publication Design', 'Marketing Materials']
              },
              {
                title: 'Content Management & Documentation',
                desc: 'I love turning chaos into beautiful, organized systems. From content calendars to creative workflows, I make sure nothing gets lost and everything looks intentional. Good organization is good design.',
                icon: '📚',
                specialties: ['Content Coordination', 'Documentation Systems', 'Editorial Design', 'Archive Management']
              },
              {
                title: 'AI Engineering & Creative Tech',
                desc: 'The intersection of AI and design fascinates me. I\'m constantly exploring how machine learning can enhance creativity rather than replace it, and I love experimenting with new tools that push the boundaries of what\'s possible.',
                icon: '🤖',
                specialties: ['AI-Assisted Design', 'Creative Automation', 'Design Systems', 'Emerging Technologies']
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
                  text="My Creative Arsenal"
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
                These tools have become extensions of my creativity over the years. Each one serves a different purpose in my workflow, and I'm always excited to learn new ones that can help bring ideas to life more effectively.
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
                text="My Creative Journey"
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
                From designing my first school event poster to leading creative teams, here's how I've grown as a designer and discovered what it really means to create work that connects with people.
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

    </>
  )
}