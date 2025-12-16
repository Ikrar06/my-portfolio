// app/design/design-client.tsx
'use client'

import { useState } from 'react'
import DesignProjects from '@/components/design/design-projects'
import DesignShots from '@/components/design/design-shots'
import type { ProjectMeta } from '@/lib/projects'

type TabType = 'projects' | 'shots'

interface Shot {
  title: string
  caption?: string
  images: string[]
  tags?: string[]
  year: number
}

interface DesignClientProps {
  projects: ProjectMeta[]
  shots: Shot[]
}

export default function DesignClient({ projects, shots }: DesignClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('projects')

  const tabs = [
    { id: 'projects' as TabType, label: 'Projects', description: 'Full design case studies' },
    { id: 'shots' as TabType, label: 'Shots', description: 'Visual experiments' }
  ]

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Design Work
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
            A collection of UI/UX design, graphic design, branding projects, and creative explorations.
            From comprehensive case studies to quick visual experiments.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="inline-flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-1 border border-neutral-200 dark:border-neutral-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-6 py-2.5 text-sm font-medium rounded-xl transition-all duration-300
                  ${activeTab === tab.id
                    ? 'bg-white dark:bg-neutral-900 text-framer-blue shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }
                `}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Description */}
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="w-2 h-2 bg-framer-blue rounded-full"></div>
            {tabs.find(t => t.id === activeTab)?.description}
          </div>
        </div>
      </header>

      {/* Tab Content */}
      <div>
        {activeTab === 'projects' && <DesignProjects projects={projects} />}
        {activeTab === 'shots' && <DesignShots shots={shots} />}
      </div>
    </section>
  )
}
