// components/design/design-projects.tsx
'use client'

import ProjectCardEnhanced from '@/components/cards/project-card-enhanced'
import FadeIn from '@/components/motion/fade-in'
import type { ProjectMeta } from '@/lib/projects'

interface DesignProjectsProps {
  projects: ProjectMeta[]
}

export default function DesignProjects({ projects }: DesignProjectsProps) {

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
          <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          No design projects available yet
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-md mx-auto">
          Design projects and case studies will appear here soon.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Project count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Showing <span className="font-semibold text-neutral-900 dark:text-neutral-100">{projects.length}</span> design project{projects.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    </div>
  )
}
