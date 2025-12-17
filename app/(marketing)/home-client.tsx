// app/(marketing)/home-client.tsx
'use client'

import { useMemo } from 'react'
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
            Informatics student at Hasanuddin University focusing on artificial intelligence with growing experience in machine learning and NLP.
            Learning to build end-to-end ML systems with Python, TensorFlow, and PyTorch.
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
                                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg border border-white/30" />
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

                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-white/90 transition-colors duration-300">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-white/50 leading-relaxed flex-1 group-hover:text-white/60 transition-colors duration-300 line-clamp-3">
                          {project.summary}
                        </p>

                        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10">
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
      <section className="relative py-16 sm:py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              How I Work
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl mx-auto px-4">
              A systematic approach to building data-driven solutions that deliver real value.
            </p>
          </div>

          {/* Process Cards */}
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                phase: '01',
                title: 'Understand',
                description:
                  'Define the problem, explore data sources, and establish success metrics. Understanding the business context is critical before diving into analysis.',
                keywords: ['Problem Framing', 'Data Exploration', 'KPI Definition'],
              },
              {
                phase: '02',
                title: 'Build',
                description:
                  'Develop models, engineer features, and iterate on solutions. Focus on reproducibility and code quality throughout the development process.',
                keywords: ['Feature Engineering', 'Model Development', 'Validation'],
              },
              {
                phase: '03',
                title: 'Deploy',
                description:
                  'Ship production-ready solutions with monitoring and documentation. Ensure models perform reliably and stakeholders can act on insights.',
                keywords: ['Production Deployment', 'Monitoring', 'Documentation'],
              },
            ].map((step, i) => (
              <FadeIn key={`process-${i}-${pageKey}`} delay={0.15 * i}>
                <div className="relative group">
                  <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-white/[0.04] transition-all duration-700 hover:border-white/20 h-full">
                    {/* Phase Number */}
                    <div className="flex items-center mb-6 sm:mb-8">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-framer-blue/20 to-framer-blue/5 rounded-xl sm:rounded-2xl flex items-center justify-center mr-4 sm:mr-5 md:mr-6 group-hover:from-framer-blue/30 group-hover:to-framer-blue/10 transition-all duration-500">
                        <span className="text-xl sm:text-2xl font-bold text-framer-blue">{step.phase}</span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-white/40 tracking-widest">STEP {step.phase}</span>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-5 md:mb-6 group-hover:text-white/90 transition-colors duration-300">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-base text-white/50 leading-relaxed mb-6 sm:mb-7 md:mb-8 group-hover:text-white/60 transition-colors duration-300 text-justify">
                      {step.description}
                    </p>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2">
                      {step.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/40 group-hover:text-white/50 group-hover:bg-white/10 transition-all duration-300"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
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
