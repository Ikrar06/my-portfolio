// app/design/design-client.tsx
'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
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
  const searchParams = useSearchParams()
  const initialTab = (searchParams?.get('tab') as TabType) || 'projects'
  const [activeTab, setActiveTab] = useState<TabType>(initialTab)

  const tabs = [
    { id: 'projects' as TabType, label: 'Projects', icon: '📁', description: 'Full design case studies' },
    { id: 'shots' as TabType, label: 'Shots', icon: '🎨', description: 'Visual experiments' }
  ]

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Design Work
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
            A collection of UI/UX design, graphic design, branding projects, and creative explorations.
            From comprehensive case studies to quick visual experiments.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-border">
          <nav className="flex gap-2" aria-label="Design work tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group relative px-6 py-3 text-sm font-medium transition-all duration-300
                  ${activeTab === tab.id
                    ? 'text-framer-blue'
                    : 'text-text-secondary hover:text-text-primary'
                  }
                `}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>

                {/* Active indicator */}
                <div
                  className={`
                    absolute bottom-0 left-0 right-0 h-0.5 bg-framer-blue transition-all duration-300
                    ${activeTab === tab.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
                  `}
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Description */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="w-2 h-2 bg-framer-blue rounded-full"></div>
          {tabs.find(t => t.id === activeTab)?.description}
        </div>
      </header>

      {/* Tab Content */}
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-framer-blue/20 border-t-framer-blue rounded-full animate-spin" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading {activeTab}...</p>
          </div>
        </div>
      }>
        {activeTab === 'projects' && <DesignProjects projects={projects} />}
        {activeTab === 'shots' && <DesignShots shots={shots} />}
      </Suspense>
    </section>
  )
}
