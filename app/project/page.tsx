// app/projects/page.tsx
import { getCodingProjects } from '@/lib/projects'
import ProjectCardEnhanced from '@/components/cards/project-card-enhanced'
import FadeIn from '@/components/motion/fade-in'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Data Science, ML Engineering, and Full-Stack development projects by Ikrar Gempur Tirani. From statistical analysis with 7,500-agent simulations to fine-tuning transformers with 90%+ accuracy. Real-world ML systems and production applications.',
  keywords: ['Data Science projects', 'Machine Learning portfolio', 'NLP projects', 'Deep Learning', 'Statistical Analysis', 'Production ML systems', 'PyTorch', 'Full-Stack development', 'AI products', 'Web Development', 'Mobile Apps', 'Ikrar Gempur Tirani'],
  openGraph: {
    title: 'Projects — Ikrar Gempur Tirani',
    description: 'Data Science, ML Engineering, and Full-Stack development projects. From agent-based simulations to production NLP systems and web applications.',
    url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000') + '/project',
    images: [{
      url: '/images/foto-ikrar.jpg',
      width: 1200,
      height: 630,
      alt: 'Data Science & Development Projects by Ikrar Gempur Tirani'
    }],
  },
  twitter: {
    title: 'Projects — Ikrar Gempur Tirani',
    description: 'Data Science, ML Engineering, and Full-Stack development projects. Real-world ML systems and applications in production.',
  },
}

export default async function ProjectsPage() {
  // Get all coding projects (sorted by newest first)
  const projects = await getCodingProjects()

  return (
    <section className="space-y-6 sm:space-y-8 px-4 sm:px-6">
      {/* Header */}
      <header className="space-y-3 sm:space-y-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Technical Projects
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Data Science, Machine Learning, and Full-Stack development projects. From statistical analysis
            and deep learning models to production web and mobile applications.
          </p>
        </div>
      </header>

      {/* Projects Grid */}
      <div className="space-y-5 sm:space-y-6">
        {/* Project count */}
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Showing <span className="font-semibold text-neutral-900 dark:text-neutral-100">{projects.length}</span> project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project, index) => (
              <FadeIn
                key={project.slug}
                delay={0.04 + index * 0.03}
                once
                margin="-10% 0px -10% 0px"
              >
                <ProjectCardEnhanced project={project} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              No technical projects available yet
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-md mx-auto">
              Technical and coding projects will appear here soon.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
