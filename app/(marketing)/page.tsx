// app/(marketing)/page.tsx
'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import SplitText from '@/components/animated/reactbits/SplitText'
import TextType from '@/components/animated/reactbits/TextType'
import LightRays from '@/components/animated/reactbits/LightRays'
import FadeIn from '@/components/motion/fade-in'
import Link from 'next/link'

export default function MarketingHomePage() {
  const pathname = usePathname()
  // pakai key stabil per rute untuk re-mount animasi yang butuh (tanpa timer)
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
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div className="relative text-center max-w-7xl mx-auto z-10">
          {/* Tagline — langsung tampil & jalan */}
          <div className="mb-8">
            <TextType
              key={`tagline-${pageKey}`}
              text="Graphic Designer • Informatics Engineering student"
              className="text-sm md:text-base text-white/60 font-medium tracking-wider uppercase"
              typingSpeed={80}
              showCursor={false}
              initialDelay={0}
              startOnVisible={false}
              as="p"
            />
          </div>

          {/* Main Hero Heading — langsung animasi saat mount */}
          <div className="mb-12 py-4">
            <SplitText
              key={`hero-title-${pageKey}`}
              text="Hi, I'm Ikrar! Welcome"
              className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.9] tracking-tight"
              splitType="words, chars"
              delay={30}
              duration={2}
              ease="power3.out"
              from={{ opacity: 0, y: 60, rotationX: -45 }}
              to={{ opacity: 1, y: 0, rotationX: 0 }}
              threshold={0.1}
              rootMargin="-50px"
              startOnVisible={false}
            />
          </div>

          {/* Dynamic Subtitle — langsung jalan, tanpa jeda ekstra */}
          <div className="mb-16">
            <TextType
              key={`subtitle-${pageKey}`}
              text={[
                'Nice to meet you! Let me show you around',
                'Creating designs that make people smile',
                'Turning coffee into creative solutions',
              ]}
              className="text-lg md:text-2xl text-white/70 font-light max-w-4xl mx-auto"
              typingSpeed={60}
              pauseDuration={2000}
              deletingSpeed={35}
              loop
              showCursor
              cursorCharacter="|"
              cursorClassName="text-white/40"
              cursorBlinkDuration={0.8}
              startOnVisible={false}
              initialDelay={0}
              as="h2"
            />
          </div>

          {/* Hero Description — tampil instan */}
          <div className="mb-16">
            <p className="text-base md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto font-light">
              I'm so glad you stopped by! I'm a passionate graphic designer and Informatics Engineering student who believes 
              great design should feel like a warm conversation. Whether it's crafting pixel-perfect visuals or 
              writing clean code, I love creating experiences that bring joy to people's digital lives.
            </p>
          </div>

          {/* Action Buttons — tampil instan */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/projects"
              className="group relative px-10 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
            >
              <span className="relative z-10">See My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
            <Link
              href="/about"
              className="group px-10 py-4 border border-white/20 text-white font-medium rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
            >
              <span>Get to Know Me</span>
              <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300 inline-block">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work Showcase — configurable links and titles */}
      <section className="relative py-32">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-24">
            <div className="py-4">
              <FadeIn key={`works-title-${pageKey}`}>
                <SplitText
                  key={`works-split-${pageKey}`}
                  text="Featured Projects"
                  className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-8"
                  splitType="words"
                  delay={40}
                  duration={0.6}
                  ease="power2.out"
                  from={{ opacity: 0, y: 50, scale: 0.95 }}
                  to={{ opacity: 1, y: 0, scale: 1 }}
                  threshold={0.2}
                  startOnVisible
                />
              </FadeIn>
            </div>
            <FadeIn key={`works-desc-${pageKey}`} delay={0.2}>
              <p className="text-lg md:text-xl text-white/50 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                From brand identities to digital interfaces, here's a collection of projects where creativity
                meets functionality. Each piece tells a unique story.
              </p>
            </FadeIn>
            <FadeIn key={`works-link-${pageKey}`} delay={0.35}>
              <Link
                href="/projects"
                className="inline-flex items-center text-white/70 hover:text-white transition-all duration-300 font-medium group border-b border-white/20 hover:border-white/40 pb-1"
              >
                <span>Explore All Projects</span>
                <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </FadeIn>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {[
              {
                title: 'GDG on Campus UNHAS',
                category: 'Tech Community',
                year: '2025',
                color: 'from-blue-400/80 to-purple-600/80',
                description: 'Complete visual identity for Google Developer Groups community at Hasanuddin University',
                link: '/projects/gdg-on-campus-unhas', // Bisa diubah ke link yang diinginkan
              },
              {
                title: 'Coder Institute',
                category: 'Tech Community',
                year: '2025',
                color: 'from-pink-400/80 to-rose-600/80',
                description: 'User-friendly mobile shopping experience with focus on conversion and usability',
                link: '/projects/coder-institute-coordinator', // Bisa diubah ke link yang diinginkan
              },
              {
                title: 'Portfolio Website',
                category: 'Web Development',
                year: '2024',
                color: 'from-emerald-400/80 to-teal-600/80',
                description: 'Responsive website combining modern design with clean, maintainable code',
                link: '/projects/portfolio-site', // Bisa diubah ke link yang diinginkan
              },
              {
                title: 'Social Media Campaign',
                category: 'Digital Marketing',
                year: '2024',
                color: 'from-orange-400/80 to-red-600/80',
                description: 'Cohesive visual campaign increasing engagement by 200% across all platforms',
                link: '/projects/social-campaign', // Bisa diubah ke link yang diinginkan
              },
              {
                title: 'Analytics Dashboard',
                category: 'UI/UX Design',
                year: '2023',
                color: 'from-indigo-400/80 to-blue-600/80',
                description: 'Data visualization dashboard focusing on user experience and information hierarchy',
                link: '/projects/dashboard', // Bisa diubah ke link yang diinginkan
              },
              {
                title: 'Event Branding',
                category: 'Print Design',
                year: '2023',
                color: 'from-green-400/80 to-emerald-600/80',
                description: 'Complete event branding from posters to merchandise with consistent visual language',
                link: '/projects/event-branding', // Bisa diubah ke link yang diinginkan
              },
            ].map((project, i) => (
              <FadeIn key={`project-${i}-${pageKey}`} delay={0.05 * i}>
                <Link href={project.link}>
                  <article className="group cursor-pointer h-full">
                    <div className="relative backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:border-white/20 h-full flex flex-col">
                      {/* Project Visual */}
                      <div className="aspect-[4/3] mb-8 rounded-2xl overflow-hidden relative">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-70 group-hover:opacity-90 transition-all duration-700`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                              <div className="w-10 h-10 bg-white/80 rounded-xl shadow-lg" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 text-white/60 group-hover:text-white/80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{project.category}</span>
                          <span className="text-xs text-white/30 font-light">{project.year}</span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors duration-300">
                          {project.title}
                        </h3>

                        <p className="text-sm text-white/50 leading-relaxed flex-1 group-hover:text-white/60 transition-colors duration-300">
                          {project.description}
                        </p>

                        <div className="mt-6 pt-4 border-t border-white/10">
                          <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300 font-medium">
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

      {/* Design Process Section */}
      <section className="relative py-32 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <div className="py-4">
              <FadeIn key={`philosophy-title-${pageKey}`}>
                <SplitText
                  key={`philosophy-split-${pageKey}`}
                  text="How I Work"
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
                  splitType="words"
                  delay={50}
                  duration={0.5}
                  ease="power2.out"
                  from={{ opacity: 0, rotationY: 25 }}
                  to={{ opacity: 1, rotationY: 0 }}
                  startOnVisible
                />
              </FadeIn>
            </div>
            <FadeIn key={`philosophy-desc-${pageKey}`} delay={0.2}>
              <p className="text-lg md:text-xl text-white/60 max-w-4xl mx-auto font-light leading-relaxed">
                My approach blends creative thinking with technical precision. Every project starts with understanding
                your goals and ends with solutions that actually work.
              </p>
            </FadeIn>
          </div>

          {/* Process Cards */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
            {[
              {
                phase: '01',
                title: 'Listen & Learn',
                description:
                  'First, I dive deep into understanding your brand, audience, and goals. Through conversations and research, I uncover what makes your project unique and what success looks like for you.',
                icon: '👂',
                keywords: ['Brand Research', 'User Analysis', 'Goal Setting'],
              },
              {
                phase: '02',
                title: 'Design & Iterate',
                description:
                  'Armed with insights, I start crafting solutions. Multiple concepts are explored, refined, and tested. Your feedback shapes each iteration until we land on something that feels just right.',
                icon: '✏️',
                keywords: ['Concept Development', 'Design Systems', 'User Testing'],
              },
              {
                phase: '03',
                title: 'Build & Perfect',
                description:
                  'The final step is bringing designs to life with pixel-perfect execution. Whether it\'s print-ready files or responsive web code, every detail is polished and optimized for real-world use.',
                icon: '🚀',
                keywords: ['Development', 'Quality Assurance', 'Launch Support'],
              },
            ].map((step, i) => (
              <FadeIn key={`process-${i}-${pageKey}`} delay={0.15 * i}>
                <div className="relative group">
                  <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-3xl p-10 hover:bg-white/[0.04] transition-all duration-700 hover:border-white/20 h-full">
                    {/* Phase Number */}
                    <div className="flex items-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mr-6 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500">
                        <span className="text-3xl">{step.icon}</span>
                      </div>
                      <span className="text-sm font-bold text-white/40 tracking-widest">STEP {step.phase}</span>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-white/90 transition-colors duration-300">
                      {step.title}
                    </h3>

                    <p className="text-white/50 leading-relaxed mb-8 group-hover:text-white/60 transition-colors duration-300">
                      {step.description}
                    </p>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2">
                      {step.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/40 group-hover:text-white/50 group-hover:bg-white/10 transition-all duration-300"
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
      <section className="relative py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="py-4">
            <FadeIn key={`cta-title-${pageKey}`}>
              <SplitText
                key={`cta-split-${pageKey}`}
                text="Got a Project in Mind?"
                className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
                splitType="words"
                delay={40}
                duration={0.5}
                ease="power2.out"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                startOnVisible
              />
            </FadeIn>
          </div>

          <FadeIn key={`cta-subtitle-${pageKey}`} delay={0.25}>
            <TextType
              key={`cta-text-${pageKey}`}
              text="Let's turn your ideas into something amazing together"
              className="text-lg md:text-xl text-white/60 mb-12 max-w-3xl mx-auto"
              typingSpeed={60}
              showCursor={false}
              startOnVisible
              as="p"
            />
          </FadeIn>

          <FadeIn key={`cta-buttons-${pageKey}`} delay={0.4} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/contact"
              className="group relative px-12 py-5 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
            >
              <span className="relative z-10">Let's Chat</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>

            <Link
              href="/projects"
              className="group px-12 py-5 text-white/70 hover:text-white font-medium transition-all duration-300 border-b border-white/20 hover:border-white/40"
            >
              <span>Check Out My Work</span>
              <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300 inline-block">→</span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}