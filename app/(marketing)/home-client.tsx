// app/(marketing)/home-client.tsx
'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import LightRays from '@/components/animated/reactbits/LightRays'
import FadeIn from '@/components/motion/fade-in'
import { InteractiveHeroText } from '@/components/animated/interactive-hero-text'
import type { ProjectMeta } from '@/lib/mdx'

interface HomeClientProps {
  featuredProjects: ProjectMeta[]
}

export default function HomeClient({ featuredProjects }: HomeClientProps) {
  const pathname = usePathname()
  const pageKey = useMemo(() => (pathname || 'home') + '-v1', [pathname])
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how centered the section is (0 to 1)
      // 1 = perfectly centered, 0 = out of view
      const sectionCenter = rect.top + rect.height / 2
      const windowCenter = windowHeight / 2
      const distanceFromCenter = Math.abs(sectionCenter - windowCenter)
      const maxDistance = windowHeight / 2 + rect.height / 2

      // Calculate progress: 1 when centered, 0 when far
      const progress = Math.max(0, Math.min(1, 1 - distanceFromCenter / maxDistance))

      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* Ambient Light Effects */}
      <div className="absolute -top-20 inset-0 flex items-center justify-center pointer-events-none z-0">
        <LightRays
          key={`light-${pageKey}`}
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.3}
          lightSpread={0.5}
          rayLength={1.6}
          pulsating
          fadeDistance={1.2}
          saturation={1}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.005}
          distortion={0}
          respectReducedMotion
        />
      </div>

      {/* HERO Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 sm:px-6 -mt-20">
        <div className="relative text-center max-w-5xl mx-auto z-10 space-y-4 sm:space-y-6">
          {/* Tagline */}
          <p className="text-xs sm:text-sm md:text-base text-text-tertiary font-medium tracking-wider uppercase px-2">
            Informatics Engineering Student • Artificial Intelligence Enthusiast
          </p>

          {/* Main Hero Heading - Interactive */}
          <InteractiveHeroText />

          {/* Hero Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto pt-2 px-2">
            Informatics student at Hasanuddin University focusing on artificial intelligence with hands-on experience in machine learning and NLP.
            Building end-to-end ML and RAG systems with Python, vLLM, TensorFlow, and PyTorch.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-6 px-4">
            <Link
              href="/project"
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-framer-blue text-white text-sm sm:text-base font-medium rounded-full transition-all duration-200 hover:bg-framer-blue-hover"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border border-border text-text-primary text-sm sm:text-base font-medium rounded-full hover:border-border-hover hover:bg-bg-secondary transition-all duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work Showcase */}
      <section className="relative py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Featured Work
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl mx-auto px-4">
              Selected projects in data science, ML engineering, and full-stack development.
            </p>
            <Link
              href="/project"
              className="inline-flex items-center text-text-secondary hover:text-framer-blue transition-colors font-medium group pt-2"
            >
              <span>View all projects</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>

          {/* Projects Grid - Dynamic from MDX */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 max-w-7xl mx-auto">
            {featuredProjects.map((project, i) => (
              <FadeIn key={`project-${project.slug}-${pageKey}`} delay={0.05 * i}>
                <Link href={`/${project.projectType === 'coding' ? 'project' : 'design'}/${project.slug}`}>
                  <article className="group cursor-pointer h-full" role="article" aria-label={project.title}>
                    <div className="relative backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 hover:bg-white/[0.05] transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:border-white/20 h-full flex flex-col">
                      {/* Project Image */}
                      <div className="aspect-[4/3] mb-4 sm:mb-6 md:mb-8 rounded-xl sm:rounded-2xl overflow-hidden relative bg-neutral-900">
                        {project.cover ? (
                          <Image
                            src={project.cover}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          // Fallback glass box if no cover image
                          <>
                            <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-white/10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative">
                                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-white/[0.08] backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-xl shadow-lg border border-white/30" />
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/60 group-hover:text-white/80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 z-10">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <span className="text-[10px] sm:text-xs font-medium text-white/40 uppercase tracking-wider">{project.category}</span>
                          <span className="text-[10px] sm:text-xs text-white/30 font-light">{project.year}</span>
                        </div>

                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-white/90 transition-colors duration-300 line-clamp-2">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-white/50 leading-relaxed group-hover:text-white/60 transition-colors duration-300 line-clamp-3 mb-4 sm:mb-6">
                          {project.summary}
                        </p>

                        <div className="pt-3 sm:pt-4 border-t border-white/10 mt-auto">
                          <span className="text-xs sm:text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300 font-medium">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={sectionRef} className="relative py-8 sm:py-12 md:py-16 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-4 sm:mb-6 md:mb-4 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              How I Work
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl mx-auto px-4">
              My approach to tackling projects, from understanding the problem to delivering solutions.
            </p>
          </div>

          {/* Process Cards - Mobile/Tablet: Vertical Stack, Desktop: Stacked with Scroll */}
          {/* Mobile & Tablet Version - Vertical */}
          <div className="flex flex-col gap-6 max-w-md mx-auto lg:hidden">
            {[
              {
                phase: '01',
                title: 'Understand',
                description:
                  'Start by understanding the requirements, exploring available resources, and defining what success looks like. Learning to ask the right questions before diving into implementation.',
                keywords: [],
              },
              {
                phase: '02',
                title: 'Build',
                description:
                  'Develop and iterate on solutions while learning best practices in code organization and design. Focus on creating clean, maintainable, and well-documented work.',
                keywords: [],
              },
              {
                phase: '03',
                title: 'Deliver',
                description:
                  'Work towards creating polished solutions with proper documentation. Learning to present work effectively and gather feedback for continuous improvement.',
                keywords: [],
              },
            ].map((step, i) => (
              <FadeIn key={`process-mobile-${i}-${pageKey}`} delay={0.15 * i}>
                <div className="w-full">
                  <div className="backdrop-blur-sm bg-neutral-900/95 border border-white/10 rounded-2xl p-5 shadow-2xl">
                    {/* Phase Number */}
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-framer-blue/20 to-framer-blue/5 rounded-xl flex items-center justify-center mr-3">
                        <span className="text-lg font-bold text-framer-blue">{step.phase}</span>
                      </div>
                      <span className="text-[10px] font-bold text-white/40 tracking-widest">STEP {step.phase}</span>
                    </div>

                    {/* Content */}
                    <h3 className="text-base font-bold text-white mb-3">
                      {step.title}
                    </h3>

                    <p className="text-[11px] text-white/50 leading-relaxed text-justify">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Desktop Version - Stacked with Scroll Animation */}
          <div className="hidden lg:block relative max-w-2xl mx-auto h-[500px] lg:h-[540px]">
            {[
              {
                phase: '01',
                title: 'Understand',
                description:
                  'Start by understanding the requirements, exploring available resources, and defining what success looks like. Learning to ask the right questions before diving into implementation.',
                keywords: [],
              },
              {
                phase: '02',
                title: 'Build',
                description:
                  'Develop and iterate on solutions while learning best practices in code organization and design. Focus on creating clean, maintainable, and well-documented work.',
                keywords: [],
              },
              {
                phase: '03',
                title: 'Deliver',
                description:
                  'Work towards creating polished solutions with proper documentation. Learning to present work effectively and gather feedback for continuous improvement.',
                keywords: [],
              },
            ].map((step, i) => {
              // Interpolate values based on scroll progress
              const startRotation = i === 0 ? -6 : i === 2 ? 6 : 0
              const endRotation = i === 0 ? -8 : i === 2 ? 8 : 0
              const startX = i === 0 ? -40 : i === 2 ? 40 : 0
              const endX = i === 0 ? -420 : i === 2 ? 420 : 0
              const startScale = 1
              const endScale = 0.95

              const rotation = startRotation + (endRotation - startRotation) * scrollProgress
              const translateX = startX + (endX - startX) * scrollProgress
              const scale = startScale + (endScale - startScale) * scrollProgress

              return (
                <div
                  key={`process-desktop-${i}-${pageKey}`}
                  className={`process-card-${i} absolute top-1/2 left-1/2 w-full max-w-md transition-all duration-300 ease-out`}
                  style={{
                    transform: `translate(-50%, -50%) rotate(${rotation}deg) translateX(${translateX}px) scale(${scale})`,
                    zIndex: i === 1 ? 30 : i === 0 ? 10 : 20,
                  }}
                >
                  <div className="transition-transform duration-500">
                    <div className="backdrop-blur-sm bg-neutral-900/95 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                      {/* Phase Number */}
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-framer-blue/20 to-framer-blue/5 rounded-xl md:rounded-2xl flex items-center justify-center mr-4 md:mr-5 transition-all duration-500">
                          <span className="text-xl md:text-2xl font-bold text-framer-blue">{step.phase}</span>
                        </div>
                        <span className="text-xs font-bold text-white/40 tracking-widest">STEP {step.phase}</span>
                      </div>

                      {/* Content */}
                      <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-5 transition-colors duration-300">
                        {step.title}
                      </h3>

                      <p className="text-xs md:text-sm text-white/50 leading-relaxed transition-colors duration-300 text-justify">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-16 sm:py-20 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Let's Work Together
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl mx-auto px-4">
            Open to data science roles, ML engineering positions, and research collaborations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4 px-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-framer-blue text-white text-sm sm:text-base font-medium rounded-full transition-all duration-200 hover:bg-framer-blue-hover"
            >
              Get in Touch
            </Link>
            <Link
              href="/project"
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border border-border text-text-primary text-sm sm:text-base font-medium rounded-full hover:border-border-hover hover:bg-bg-secondary transition-all duration-200"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
