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
      org: 'Universitas Hasanuddin (DSITD)',
      title: 'AI Engineer Intern — RAG Core (UniAI Team)',
      type: 'Technical Role',
      dates: 'Feb 2026 – Present',
      location: 'Makassar, South Sulawesi',
      desc: `Building the data and RAG core of UniAI, an institutional academic chatbot for Hasanuddin University, as part of Team 2 (Data & RAG Core). Developed an end-to-end retrieval pipeline using Qwen3-Embedding for dense retrieval, a BGE-Reranker, a Qdrant vector database, and Redis semantic caching to cut latency and inference cost. Designed a 6-layer safety and routing pipeline (keyword filter, Llama Guard, IndoBERT intent classifier, private API handler, RAG pipeline, output filter) and a three-tier OCR ingestion strategy (PyMuPDF, Tesseract, Qwen3-VL). Deployed and served Qwen3-VL-8B-Instruct via vLLM behind FastAPI and Nginx on an NVIDIA L40S GPU, load-testing toward 500 concurrent users.`,
      skills: ['RAG', 'LLM', 'vLLM', 'Qdrant', 'FastAPI', 'Python', 'Embeddings', 'Redis', 'Docker']
    },
    {
      org: 'PLN Icon Plus (Iconnet)',
      title: 'Full Stack Developer Intern',
      type: 'Technical Role',
      dates: 'Feb 2026 – Apr 2026',
      location: 'Makassar, South Sulawesi',
      desc: `Designed and built an internal OPEX monitoring dashboard end-to-end using Next.js (TypeScript) and PostgreSQL to streamline budget tracking and realization reporting. Performed data reconciliation across financial and operational records, automating previously manual reporting workflows and improving data consistency for management reporting. Deployed the application to a Linux VPS and hardened it through a full penetration testing cycle, remediating all identified security vulnerabilities.`,
      skills: ['Next.js', 'TypeScript', 'PostgreSQL', 'Full-Stack Development', 'Penetration Testing', 'Data Reconciliation']
    },
    {
      org: 'Cirebon Kuring Cafe',
      title: 'Fullstack Developer',
      type: 'Technical Role',
      dates: 'June 2025 – Mar 2026',
      location: 'Remote',
      desc: `Developed web and mobile application using TypeScript (Next.js) and Flutter with PostgreSQL database architecture through the pre-launch phase. Designed database schema and data models to manage cafe operations, inventory tracking, and customer order systems. Collaborated with stakeholders to gather requirements and translate business needs into technical specifications.`,
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
      <section className="relative min-h-[80vh] flex flex-col justify-center px-4 sm:px-6 py-2">
        <div className="max-w-6xl mx-auto">
          {/* Tagline */}
          <div className="mb-6 sm:mb-8">
            <TextType
              key={`about-tagline-${pageKey}`}
              text="Informatics Engineering Student • AI / Machine Learning Engineer"
              className="text-xs sm:text-sm md:text-base text-white/60 font-medium tracking-wider uppercase"
              typingSpeed={80}
              showCursor={false}
              initialDelay={0}
              startOnVisible={false}
              as="p"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-6 md:gap-8 lg:gap-12 items-start">
            {/* FOTO HD WITH BACKDROP BOX */}
            <div className="relative w-[240px] sm:w-[280px] md:w-[380px] lg:w-[440px] mx-auto md:mx-0 space-y-3 sm:space-y-4">
              {/* Photo Box */}
              <div className="relative w-full h-[240px] sm:h-[280px] md:h-[380px] lg:h-[440px]">
                {/* Backdrop box */}
                <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-3xl p-2 sm:p-3 hover:bg-white/[0.05] transition-all duration-700 hover:border-white/20 h-full flex flex-col items-center justify-center group">
                  {/* Photo container with pixelation effect */}
                  <div className="relative w-[210px] h-[210px] sm:w-[240px] sm:h-[240px] md:w-[330px] md:h-[330px] lg:w-[380px] lg:h-[380px]">
                    <PixelatedImage
                      src="/images/foto-ikrar.jpg"
                      pixelatedSrc="/images/foto-ikrar-pixelated.PNG"
                      alt="Foto Ikrar Gempur Tirani"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Download CV Button */}
              <div className="w-full">
                <DownloadCVButton />
              </div>
            </div>

            {/* Bio singkat */}
            <FadeIn key={`about-bio-${pageKey}`} delay={0.1}>
              <div className="mt-6 md:mt-0">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 leading-relaxed font-light mb-3 sm:mb-4 text-justify">
                  Hi, I'm <span className="font-semibold text-white">Ikrar Gempur Tirani</span>, an{' '}
                  <span className="text-white">Informatics Engineering student</span> at Hasanuddin University (GPA 3.92/4.00) focusing on <span className="text-white">Artificial Intelligence</span> with hands-on experience in machine learning, natural language processing, and statistical modeling.
                </p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/60 leading-relaxed font-light mb-3 sm:mb-4 text-justify">
                  Currently an <span className="text-white">AI Engineer intern</span> building the data and RAG core of <span className="text-white">UniAI</span>, an institutional academic chatbot for Hasanuddin University — working across the full ML lifecycle, from document ingestion and embeddings to retrieval, model serving with <span className="text-white">vLLM</span>, and deployment. Beyond that, my projects range from agent-based market simulations to fine-tuning transformer models for NLP tasks.
                </p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/60 leading-relaxed font-light text-justify">
                  I also lead the Creative Media Division at <span className="text-white">Google Developer Groups on Campus</span>, pairing technical work with communication and leadership. With full-stack development capabilities and five years of design experience, I build AI products that are both technically sound and user-friendly.
                </p>

                <div className="mt-4 sm:mt-6 grid gap-2 sm:gap-3 text-xs sm:text-sm text-white/60">
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Born and raised in Gorontalo, January 6, 2005</div>
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Currently living in Makassar, South Sulawesi</div>
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Final-year Informatics Engineering student at Hasanuddin University (GPA 3.92)</div>
                  <div className="flex items-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" /> Pursuing AI/Machine Learning Engineer and Data Science roles</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Layanan / Keahlian */}
      <section className="relative py-16 sm:py-20 md:py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="py-2 sm:py-4">
              <FadeIn key={`services-title-${pageKey}`}>
                <SplitText
                  key={`services-split-${pageKey}`}
                  text="What I Do"
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8"
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
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed px-4">
                Data science, machine learning engineering, and full-stack development. Building AI products that are technically sound and user-friendly.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: 'Data Science & Analytics',
                desc: 'Learning statistical analysis and hypothesis testing to extract insights from data. Developing skills in exploratory analysis, data visualization, and validation.',
                // specialties: ['Exploratory Data Analysis', 'Statistical Modeling', 'Hypothesis Testing', 'Data Visualization']
                specialties: []
              },
              {
                title: 'LLM & RAG Engineering',
                desc: 'Building production LLM systems: retrieval-augmented generation, vector search, model serving with vLLM, and safety pipelines for real institutional use.',
                // specialties: ['RAG Pipelines', 'Vector Databases (Qdrant)', 'vLLM Serving', 'LLM Safety & Routing']
                specialties: []
              },
              {
                title: 'Machine Learning & NLP',
                desc: 'Developing machine learning systems with a focus on NLP. Fine-tuning deep learning models with PyTorch and TensorFlow across academic and personal projects.',
                // specialties: ['Deep Learning (PyTorch)', 'Natural Language Processing', 'Model Training & Optimization', 'Production ML Systems']
                specialties: []
              },
              {
                title: 'Full-Stack Development',
                desc: 'Building web and mobile applications to bring ML models to users. Working with modern frameworks, APIs, deployment, and security hardening.',
                // specialties: ['React & Next.js', 'Flutter Mobile Apps', 'FastAPI & Flask', 'Database Design']
                specialties: []
              }
            ].map((service, i) => (
              <FadeIn key={`service-${i}-${pageKey}`} delay={0.1 * i}>
                <div className="group h-full">
                  <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:bg-white/[0.05] transition-all duration-700 hover:border-white/20 h-full flex flex-col">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-framer-blue/20 to-framer-blue/5 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:from-framer-blue/30 group-hover:to-framer-blue/10 transition-all duration-500">
                      <span className="text-lg sm:text-xl font-bold text-framer-blue">0{i + 1}</span>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-white/90 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-white/60 leading-relaxed mb-4 sm:mb-5 md:mb-6 group-hover:text-white/70 transition-colors duration-300 flex-1 text-justify">
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
      <section className="relative py-16 sm:py-20 md:py-24 border-t border-white/5" aria-labelledby="skills-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="py-2 sm:py-4">
              <FadeIn key={`skills-title-${pageKey}`}>
                <SplitText
                  key={`skills-split-${pageKey}`}
                  text="Technical Skills"
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8"
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
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed px-4">
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
      <section className="relative py-16 sm:py-20 md:py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <FadeIn key={`exp-title-${pageKey}`}>
              <SplitText
                key={`exp-split-${pageKey}`}
                text="Experience"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8"
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
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed px-4">
                AI engineering, full-stack development, and creative leadership positions that combine technical implementation with data-driven strategy and team management.
              </p>
            </FadeIn>
          </div>

          {/* Timeline Layout */}
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/40 via-white/30 to-white/10 transform -translate-x-0.5"></div>

            <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
              {experiences.map((exp, i) => (
                <FadeIn key={`exp-${i}-${pageKey}`} delay={0.12 * i}>
                  <div className="relative flex items-center">
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute left-1/2 top-8 w-6 h-6 bg-white/30 rounded-full border-4 border-black shadow-lg transform -translate-x-1/2 z-10">
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>

                    {/* Content */}
                    <div className={`w-full md:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:ml-auto'}`}>
                      <article className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-700 group relative">
                        {/* Timeline dot for mobile */}
                        <div className="md:hidden w-4 h-4 sm:w-5 sm:h-5 bg-white/30 rounded-full absolute -left-2 sm:-left-2.5 top-6 sm:top-8 border-2 border-black shadow-lg z-10">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>

                        <header className="mb-4 sm:mb-5 md:mb-6">
                          <h3 className="text-base sm:text-lg font-bold text-white">{exp.title}</h3>
                          <p className="text-sm sm:text-base text-white/80 font-medium">{exp.org}</p>
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 text-xs sm:text-sm">
                            <span className="px-2 py-0.5 sm:py-1 rounded-full bg-white/10 text-white/70 text-[10px] sm:text-xs">
                              {exp.type}
                            </span>
                            <span className="text-white/60">•</span>
                            <span className="text-white/60">{exp.dates}</span>
                          </div>
                          {exp.location && exp.location !== 'Remote' && (
                            <p className="text-white/40 text-[10px] sm:text-xs mt-1">{exp.location}</p>
                          )}
                        </header>

                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4 sm:mb-5 text-justify">{exp.desc}</p>

                        {/* Extras (link IG, dsb) */}
                        {exp.extras?.length ? (
                          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-5">
                            {exp.extras.map((ex, idx) => (
                              <a
                                key={idx}
                                href={ex.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-colors"
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
                          <ul className="flex flex-wrap gap-1.5 sm:gap-2">
                            {exp.skills.map((s, idx) => (
                              <li
                                key={idx}
                                className="text-[10px] sm:text-[11px] leading-5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/70"
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
      <section className="relative py-16 sm:py-20 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <FadeIn key={`about-cta-${pageKey}`}>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6">
                Ready to Work Together?
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 mb-8 sm:mb-10 leading-relaxed px-4">
                I'd love to hear about your project and explore how we can create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto group relative px-8 sm:px-10 py-3 sm:py-4 bg-framer-blue text-white text-sm sm:text-base font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-framer-blue-hover hover:shadow-2xl hover:shadow-framer-blue/20"
                >
                  <span className="relative z-10">Get in Touch</span>
                </Link>
                <Link
                  href="/project"
                  className="w-full sm:w-auto group px-8 sm:px-10 py-3 sm:py-4 border border-white/20 text-white text-sm sm:text-base font-medium rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
                >
                  <span>View My Work</span>
                  <span className="ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform duration-300 inline-block">→</span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}