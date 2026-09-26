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
  type Experience = {
    org: string
    title: string
    dates: string
    location: string
    highlights: string[]
    skills: string[]
    links?: { label: string; href: string }[]
  }

  const engineering: Experience[] = [
    {
      org: 'Universitas Hasanuddin (DSITD) · UniAI',
      title: 'AI Engineer Intern — RAG Core',
      dates: 'Feb 2026 – Present',
      location: 'Makassar',
      highlights: [
        'Building the retrieval core of UniAI, the university’s academic assistant: Qwen3 embeddings, BGE reranker, Qdrant, and Redis semantic caching to cut latency and inference cost.',
        'Designed a 6-layer safety and routing pipeline: keyword filter, Llama Guard, IndoBERT intent classifier, private API handler, RAG, and output filter.',
        'Built a three-tier OCR ingestion strategy (PyMuPDF, Tesseract, Qwen3-VL) for university documents.',
        'Serving Qwen3-VL-8B-Instruct with vLLM behind FastAPI and Nginx on an NVIDIA L40S, load-testing toward 500 concurrent users.',
      ],
      skills: ['RAG', 'vLLM', 'Qdrant', 'FastAPI', 'Redis', 'Docker'],
    },
    {
      org: 'PLN Icon Plus (ICONNET)',
      title: 'Full Stack Developer Intern',
      dates: 'Feb 2026 – Apr 2026',
      location: 'Makassar',
      highlights: [
        'Built an internal finance dashboard in a 4-person intern team covering OPEX, cash advance, contract budget, and vehicle monitoring.',
        'Replaced manual spreadsheet reconciliation with reviewed Excel/CSV imports matched against budget references.',
        'Piloted on the office LAN, then deployed to a Hetzner Linux VPS and remediated every finding from a full penetration test.',
      ],
      skills: ['Next.js', 'Express', 'PostgreSQL', 'Redis', 'Linux'],
      links: [{ label: 'Case study', href: '/project/iconnet-opex-dashboard' }],
    },
    {
      org: 'Cirebon Kuring Cafe',
      title: 'Full Stack Developer',
      dates: 'Jun 2025 – Mar 2026',
      location: 'Remote',
      highlights: [
        'Designed and built the cafe’s operating system solo: QR table ordering, a Flutter staff tablet, an employee portal, and an owner dashboard.',
        'Modeled orders, inventory with moving-average costing, attendance, and payroll in PostgreSQL on Supabase.',
        'Gathered requirements with the owner and translated operational needs into technical specifications.',
      ],
      skills: ['Next.js', 'Flutter', 'Supabase', 'PostgreSQL'],
      links: [{ label: 'Case study', href: '/project/cirebon-kuring-cafe' }],
    },
  ]

  const leadership: Experience[] = [
    {
      org: 'Google Developer Group on Campus — Hasanuddin University',
      title: 'Head of Creative Media',
      dates: 'Aug 2025 – Aug 2026',
      location: 'Makassar',
      highlights: [
        'Led a 6-person creative media team for one term.',
        'Grew Instagram by 46% (2,800 → 4,100 followers) and generated 1M+ total content views.',
        'Reached a record 515K views in October 2025, 25x the pre-leadership baseline, guided by engagement analytics.',
      ],
      skills: ['Team Leadership', 'Content Strategy', 'Analytics'],
      links: [{ label: '@gdgocunhas', href: 'https://instagram.com/gdgocunhas' }],
    },
    {
      org: 'Coder Institute Hasanuddin University',
      title: 'Publication, Design & Documentation Coordinator',
      dates: 'Feb 2025 – Feb 2026',
      location: 'Makassar',
      highlights: [
        'Led the team producing visual content, event documentation, and promotional materials for the campus coding community.',
        'Coordinated with technical and organizing teams to support community programs.',
      ],
      skills: ['Team Coordination', 'Brand Identity'],
      links: [{ label: '@coderinstitute', href: 'https://instagram.com/coderinstitute' }],
    },
    {
      org: 'Recursion UH',
      title: 'Publication, Design & Documentation Coordinator',
      dates: 'Sep 2024 – Apr 2025',
      location: 'Makassar',
      highlights: [
        'Led publication for the university’s first national-level informatics competition (CTF, UX Design, ICT Business Plan, Competitive Programming).',
        'Built its social presence from zero to 894 followers and 96+ posts in eight months.',
      ],
      skills: ['Publication', 'Social Media Growth'],
      links: [{ label: '@recursion.uh', href: 'https://instagram.com/recursion.uh' }],
    },
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
              text="AI Engineer • Informatics Engineering Student"
              className="text-xs sm:text-sm md:text-base text-white/60 font-medium tracking-wider uppercase"
              typingSpeed={80}
              showCursor={false}
              initialDelay={0}
              startOnVisible={false}
              as="p"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 lg:gap-14 items-start">
            {/* Photo + actions */}
            <div className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[380px] mx-auto md:mx-0 space-y-3">
              <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10">
                <PixelatedImage
                  src="/images/foto-ikrar.jpg"
                  pixelatedSrc="/images/foto-ikrar-pixelated.PNG"
                  alt="Foto Ikrar Gempur Tirani"
                  className="w-full h-full"
                />
              </div>
              <DownloadCVButton />
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://github.com/Ikrar06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-sm py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/25 transition-colors"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/ikrargempurtirani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-sm py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/25 transition-colors"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>

            {/* Bio */}
            <FadeIn key={`about-bio-${pageKey}`} delay={0.1}>
              <div className="mt-6 md:mt-0 max-w-2xl">
                <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-snug font-medium mb-5 sm:mb-6">
                  Hi, I&apos;m <span className="text-white font-semibold">Ikrar Gempur Tirani</span>, an AI Engineer and Informatics Engineering student at Hasanuddin University.
                </p>
                <div className="space-y-4 text-sm sm:text-base text-white/60 leading-relaxed">
                  <p>
                    I&apos;m currently an <span className="text-white">AI Engineer intern</span> building the data and RAG core of{' '}
                    <span className="text-white">UniAI</span>, the university&apos;s academic assistant, working across document ingestion,
                    embeddings, retrieval, and model serving with <span className="text-white">vLLM</span>. My other work ranges from
                    fine-tuned transformers for NLP to agent-based simulations driven by LLMs.
                  </p>
                  <p>
                    I also build the full-stack products around these models, and I have led creative media teams at Google Developer
                    Groups on Campus and Coder Institute, so I care about how a product communicates, not only how it works.
                  </p>
                </div>

                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6">
                  {[
                    { label: 'Currently', value: 'AI Engineer Intern, UniAI' },
                    { label: 'Education', value: 'Informatics, Hasanuddin University · GPA 3.92' },
                    { label: 'Based in', value: 'Makassar, Indonesia' },
                    { label: 'Open to', value: 'AI roles, internships, freelance' },
                  ].map((f) => (
                    <div key={f.label}>
                      <dt className="text-[11px] uppercase tracking-wider text-white/40">{f.label}</dt>
                      <dd className="text-sm text-white/80 mt-1">{f.value}</dd>
                    </div>
                  ))}
                </dl>
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
                LLM systems, machine learning, and the full-stack work that turns them into products people can use.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {[
              {
                title: 'LLM & RAG Engineering',
                desc: 'Retrieval pipelines, vector search, reranking and model serving with vLLM, plus the safety and routing layers that make LLMs usable for real institutions.',
                tags: ['vLLM', 'Qdrant', 'Reranking', 'Llama Guard'],
                highlight: true,
              },
              {
                title: 'Machine Learning & NLP',
                desc: 'Fine-tuning transformers and building NLP pipelines in PyTorch, from dataset construction and leakage-free evaluation to deployed models.',
                tags: ['PyTorch', 'Hugging Face', 'RoBERTa', 'Scikit-learn'],
              },
              {
                title: 'Data Science & Analytics',
                desc: 'Large-scale data mining and statistical validation: frequent-pattern mining on 21M+ records, hypothesis testing, and simulations with LLM-driven agents.',
                tags: ['Polars', 'FP-Growth', 'SciPy', 'MESA'],
              },
              {
                title: 'Full-Stack Development',
                desc: 'Next.js, Flutter and API backends that put models in front of users, with deployment and security hardening handled end to end.',
                tags: ['Next.js', 'Flutter', 'FastAPI', 'Supabase'],
              },
            ].map((service, i) => (
              <FadeIn key={`service-${i}-${pageKey}`} delay={0.08 * i}>
                <div
                  className={`h-full flex flex-col rounded-2xl sm:rounded-3xl border p-6 sm:p-7 transition-colors duration-300 ${
                    service.highlight
                      ? 'border-framer-blue/25 bg-framer-blue/[0.05] hover:border-framer-blue/40'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-xs sm:text-sm font-semibold tabular-nums text-framer-blue">0{i + 1}</span>
                    <h3 className="text-base sm:text-lg font-semibold text-white">{service.title}</h3>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed flex-1">{service.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {service.tags.map((t) => (
                      <span
                        key={t}
                        className={`text-[11px] sm:text-xs px-2.5 py-1 rounded-full border ${
                          service.highlight
                            ? 'border-framer-blue/30 bg-framer-blue/10 text-blue-100'
                            : 'border-white/10 bg-white/[0.03] text-white/60'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
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
                The stack I use most, from LLM serving and model training to the applications built around them.
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
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
                Engineering roles first, followed by the community work where I lead creative teams.
              </p>
            </FadeIn>
          </div>

          <div className="space-y-14 sm:space-y-16">
            {[
              { label: 'Engineering', items: engineering },
              { label: 'Leadership & Community', items: leadership },
            ].map((group) => (
              <div key={group.label}>
                <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white/40 mb-6 sm:mb-8 md:pl-[220px]">
                  {group.label}
                </h3>

                <div>
                  {group.items.map((exp, i) => {
                    const current = exp.dates.includes('Present')
                    return (
                      <FadeIn key={`exp-${group.label}-${i}-${pageKey}`} delay={0.08 * i}>
                        <div className="relative md:grid md:grid-cols-[180px_1fr] md:gap-10 pl-6 md:pl-0 border-l md:border-l-0 border-white/10 pb-10 md:pb-0">
                          {/* Dot (mobile) */}
                          <span
                            className={`md:hidden absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-[#0A0A0A] ${current ? 'bg-framer-blue' : 'bg-white/30'}`}
                            aria-hidden
                          />

                          {/* Meta */}
                          <div className="md:text-right md:pt-0.5 mb-2 md:mb-0">
                            <p className={`text-xs sm:text-sm font-medium tabular-nums ${current ? 'text-framer-blue' : 'text-white/70'}`}>
                              {exp.dates}
                            </p>
                            <p className="text-[11px] sm:text-xs text-white/35 mt-0.5">{exp.location}</p>
                          </div>

                          {/* Content */}
                          <div className="relative md:pl-10 md:border-l md:border-white/10 md:pb-12">
                            <span
                              className={`hidden md:block absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-[#0A0A0A] ${current ? 'bg-framer-blue' : 'bg-white/30'}`}
                              aria-hidden
                            />

                            <h4 className="text-base sm:text-lg font-semibold text-white leading-snug">{exp.title}</h4>
                            <p className="text-sm text-white/55 mt-0.5">{exp.org}</p>

                            <ul className="mt-4 space-y-2">
                              {exp.highlights.map((h, idx) => (
                                <li key={idx} className="relative pl-4 text-sm text-white/65 leading-relaxed">
                                  <span className="absolute left-0 top-[0.6em] w-1 h-1 rounded-full bg-white/35" aria-hidden />
                                  {h}
                                </li>
                              ))}
                            </ul>

                            <div className="flex flex-wrap items-center gap-2 mt-4">
                              {exp.skills.map((sk) => (
                                <span
                                  key={sk}
                                  className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/60"
                                >
                                  {sk}
                                </span>
                              ))}
                              {exp.links?.map((l) =>
                                l.href.startsWith('/') ? (
                                  <Link
                                    key={l.href}
                                    href={l.href}
                                    className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full text-framer-blue hover:text-framer-blue-hover transition-colors"
                                  >
                                    {l.label} →
                                  </Link>
                                ) : (
                                  <a
                                    key={l.href}
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full text-white/50 hover:text-white transition-colors"
                                  >
                                    {l.label} ↗
                                  </a>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </FadeIn>
                    )
                  })}
                </div>
              </div>
            ))}
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
                Hiring for an AI engineering role, or need an AI or full-stack system built? I'd be glad to hear about it.
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