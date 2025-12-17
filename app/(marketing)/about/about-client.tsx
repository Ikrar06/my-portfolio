// app/(marketing)/about/about-client.tsx
'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import SplitText from '@/components/animated/reactbits/SplitText'
import TextType from '@/components/animated/reactbits/TextType'
import FadeIn from '@/components/motion/fade-in'
import SkillsList, { type Skill } from '@/components/skills/skills-list'
import DownloadCVButton from '@/components/download-cv-button'
import { PixelatedImage } from '@/components/animated/pixelated-image'

interface AboutClientProps {
  skills: Skill[]
}

export default function AboutClient({ skills }: AboutClientProps) {
  const pathname = usePathname()
  const pageKey = useMemo(() => (pathname || 'about') + '-v3', [pathname])

  // =========================
  // DATA PENGALAMAN (sorted by timeline - descending, sesuai CV)
  // =========================
  const experiences = [
    {
      org: 'Cirebon Kuring Cafe',
      title: 'Fullstack Developer',
      type: 'Technical Role',
      dates: 'June 2025 – Present',
      location: 'Remote',
      desc: `Developing web and mobile application using TypeScript (Next.js) and Flutter with PostgreSQL database architecture currently in pre-launch phase. Designing database schema and data models to manage cafe operations, inventory tracking, and customer order systems. Collaborating with stakeholders to gather requirements and translate business needs into technical specifications.`,
      skills: ['TypeScript', 'Next.js', 'Flutter', 'PostgreSQL', 'Database Design', 'Requirements Gathering']
    },
    {
      org: 'Google Developer Group on Campus - Hasanuddin University',
      title: 'Head of Creative Media Division',
      type: 'Leadership Role',
      dates: 'Aug 2025 – Present',
      location: 'Makassar, South Sulawesi',
      desc: `Lead team of 6 members, growing Instagram community by 46% (2,800 to 4,100 followers) and generating 1M+ total content views since August 2025. Achieved record monthly performance of 515K views in October 2025, representing 25x improvement from pre-leadership baseline through strategic content optimization and audience targeting. Analyze social media engagement metrics using Instagram Insights to inform data-driven decisions on content format, posting schedules, and creative direction.`,
      extras: [
        { label: 'Instagram', value: '@gdgocunhas', href: 'https://instagram.com/gdgocunhas' }
      ],
      skills: ['Team Leadership', 'Data-Driven Strategy', 'Social Media Analytics', 'Content Strategy', 'Brand Management']
    },
    {
      org: 'Coder Institute Hasanuddin University',
      title: 'Head of Creative Media Division',
      type: 'Leadership Role',
      dates: 'Feb 2025 – Present',
      location: 'Makassar, South Sulawesi',
      desc: `Lead creative team to produce visual content, event documentation, and promotional materials for university coding community. Coordinate with technical and organizational teams to support community initiatives and educational programs. Manage content production workflow ensuring consistent brand identity across social media platforms.`,
      extras: [
        { label: 'Instagram', value: '@coderinstitute', href: 'https://instagram.com/coderinstitute' }
      ],
      skills: ['Content Strategy', 'Team Coordination', 'Brand Identity', 'Graphic Design', 'Figma']
    },
    {
      org: 'Recursion UH',
      title: 'Publication, Design, and Documentation Coordinator',
      type: 'Leadership Role',
      dates: 'Sep 2024 – Apr 2025',
      location: 'Makassar, South Sulawesi',
      desc: `Coordinated publication and creative strategy for inaugural national-level informatics competition organized by Hasanuddin University, featuring CTF, UX Design, ICT Business Plan, and Competitive Programming tracks. Built social media presence from ground up, achieving 894 followers and 96+ published content pieces across Instagram platform within 8-month period. Designed promotional materials, infographics, and technical documentation to support competition promotion and participant communication across multiple university campuses.`,
      extras: [
        { label: 'Instagram', value: '@recursion.uh', href: 'https://instagram.com/recursion.uh' }
      ],
      skills: ['Social Media Growth', 'Content Management', 'Visual Design', 'Adobe Creative Suite', 'Figma']
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
              text="Informatics Engineering Student • Artificial Intelligence Enthusiast"
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
            <div className="relative w-[300px] md:w-[440px] mx-auto md:mx-0 space-y-4">
              {/* Photo Box */}
              <div className="relative w-full h-[300px] md:h-[440px]">
                {/* Backdrop box */}
                <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-3xl p-3 hover:bg-white/[0.05] transition-all duration-700 hover:border-white/20 h-full flex flex-col items-center justify-center group">
                  {/* Photo container with pixelation effect */}
                  <div className="relative w-[260px] h-[260px] md:w-[380px] md:h-[380px]">
                    <PixelatedImage
                      src="/images/foto-ikrar.jpg"
                      pixelatedSrc="/images/foto-ikrar-pixelated.PNG"
                      alt="Foto Ikrar Gempur Tirani"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Hover Me Box */}
              <div className="group relative w-full overflow-hidden rounded-2xl backdrop-blur-sm bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-700 cursor-pointer">
                {/* Content */}
                <div className="relative z-10 p-6 text-center">
                  <div className="text-sm font-semibold text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors duration-500">
                    Hover Me
                  </div>
                </div>

                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-framer-blue/10 via-transparent to-framer-blue/5" />
                </div>

                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-framer-blue/20 via-framer-blue-light/20 to-framer-blue/20 blur-xl" />
                </div>
              </div>
            </div>

            {/* Bio singkat */}
            <FadeIn key={`about-bio-${pageKey}`} delay={0.1}>
              <div className="mt-8 md:mt-0">
                <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light mb-4 text-justify">
                  Hi, I'm <span className="font-semibold text-white">Ikrar Gempur Tirani</span>, an{' '}
                  <span className="text-white">Informatics Engineering student</span> at Hasanuddin University (GPA 3.91/4.00) focusing on <span className="text-white">Artificial Intelligence</span> with growing experience in machine learning, natural language processing, and statistical modeling.
                </p>
                <p className="text-base md:text-lg text-white/60 leading-relaxed font-light mb-4 text-justify">
                  Working with <span className="text-white">Python, TensorFlow, and PyTorch</span> to build end-to-end ML systems from data preprocessing to deployment. I work on projects ranging from agent-based market simulations to fine-tuning deep learning models for NLP tasks, learning to apply rigorous methodology with production engineering practices.
                </p>
                <p className="text-base md:text-lg text-white/60 leading-relaxed font-light text-justify">
                  Currently leading Creative Media Division at <span className="text-white">Google Developer Groups on Campus</span>, developing technical expertise alongside communication and leadership skills. With full-stack development capabilities and design experience, I'm learning to build AI products that are both technically sound and user-friendly.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-white/60">
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Born and raised in Gorontalo, January 6, 2005</div>
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Currently living in Makassar, South Sulawesi</div>
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Fifth semester Informatics student at Hasanuddin University (GPA 3.91)</div>
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Pursuing Machine Learning Engineer and Data Science roles</div>
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
                Data science, machine learning engineering, and full-stack development. Building AI products that are technically sound and user-friendly.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Data Science & Analytics',
                desc: 'Learning statistical analysis and hypothesis testing to extract insights from data. Developing skills in exploratory analysis, data visualization, and validation.',
                // specialties: ['Exploratory Data Analysis', 'Statistical Modeling', 'Hypothesis Testing', 'Data Visualization']
                specialties: []
              },
              {
                title: 'Machine Learning & NLP',
                desc: 'Developing machine learning systems with focus on NLP. Learning deep learning with PyTorch and TensorFlow through academic and personal projects.',
                // specialties: ['Deep Learning (PyTorch)', 'Natural Language Processing', 'Model Training & Optimization', 'Production ML Systems']
                specialties: []
              },
              {
                title: 'Full-Stack Development',
                desc: 'Building web and mobile applications to bring ML models to users. Learning modern frameworks, APIs, and deployment practices.',
                // specialties: ['React & Next.js', 'Flutter Mobile Apps', 'Flask APIs', 'Database Design']
                specialties: []
              },
              {
                title: 'Design Leadership',
                desc: 'Leading creative teams with data-driven strategy. 5 years experience with proven metrics: 1M+ content views, 46% follower growth.',
                // specialties: ['Team Management (6+ members)', 'Brand Strategy', 'UI/UX for AI Products', 'Growth Metrics']
                specialties: []
              }
            ].map((service, i) => (
              <FadeIn key={`service-${i}-${pageKey}`} delay={0.1 * i}>
                <div className="group h-full">
                  <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-all duration-700 hover:border-white/20 h-full flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-framer-blue/20 to-framer-blue/5 rounded-2xl flex items-center justify-center mb-6 group-hover:from-framer-blue/30 group-hover:to-framer-blue/10 transition-all duration-500">
                      <span className="text-xl font-bold text-framer-blue">0{i + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed mb-6 group-hover:text-white/70 transition-colors duration-300 flex-1 text-justify">
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
                Tools and technologies for data analysis, machine learning, and production software development.
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
                text="Experience"
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
                Full-stack development and creative leadership positions that combine technical implementation with data-driven strategy and team management.
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

                        <header className="mb-6">
                          <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                          <p className="text-white/80 font-medium">{exp.org}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm">
                            <span className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                              {exp.type}
                            </span>
                            <span className="text-white/60">•</span>
                            <span className="text-white/60">{exp.dates}</span>
                          </div>
                          {exp.location && exp.location !== 'Remote' && (
                            <p className="text-white/40 text-xs mt-1">{exp.location}</p>
                          )}
                        </header>

                        <p className="text-white/70 leading-relaxed mb-5 text-justify">{exp.desc}</p>

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
                  href="/project"
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
