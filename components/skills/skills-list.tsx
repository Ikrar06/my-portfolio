// components/skills/skills-list.tsx
import React from 'react'

export type Skill = {
  name: string
  label: 'Novice' | 'Intermediate' | 'Advanced' | 'Expert' | string
  years: number
}

type SkillsListProps = {
  skills: Skill[]
}

export default function SkillsList({ skills }: SkillsListProps) {
  const getLevelColor = (label: string) => {
    switch (label.toLowerCase()) {
      case 'expert': return 'from-blue-400 to-blue-600'
      case 'advanced': return 'from-emerald-400 to-emerald-600'
      case 'intermediate': return 'from-amber-400 to-amber-600'
      default: return 'from-red-400 to-red-600'
    }
  }

  const getLevelBgColor = (label: string) => {
    switch (label.toLowerCase()) {
      case 'expert': return 'bg-blue-500/10 border-blue-500/20'
      case 'advanced': return 'bg-emerald-500/10 border-emerald-500/20'
      case 'intermediate': return 'bg-amber-500/10 border-amber-500/20'
      default: return 'bg-red-500/10 border-red-500/20'
    }
  }

  // Function to group skills into rows of 2, centering last item if odd
  const groupSkillsInRows = (skills: Skill[]) => {
    const rows = []
    for (let i = 0; i < skills.length; i += 2) {
      const row = skills.slice(i, i + 2)
      rows.push(row)
    }
    return rows
  }

  const skillRows = groupSkillsInRows(skills)

  return (
    <div className="space-y-6">
      {skillRows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className={`grid gap-6 ${row.length === 1 ? 'grid-cols-1 justify-items-center' : 'grid-cols-1 sm:grid-cols-2'}`}
        >
          {row.map((s, index) => {
            const levelColor = getLevelColor(s.label)
            const levelBg = getLevelBgColor(s.label)
            const globalIndex = rowIndex * 2 + index
            
            return (
              <div
                key={s.name}
                className={`group backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 ${row.length === 1 ? 'max-w-md w-full' : ''}`}
                style={{ animationDelay: `${globalIndex * 0.1}s` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="text-lg font-bold text-white leading-tight group-hover:text-white/90 transition-colors">
                    {s.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-sm text-white/60 group-hover:text-white/70 transition-colors">
                      {s.years} {s.years === 1 ? 'year' : 'years'}
                    </div>
                  </div>
                </div>

                {/* Step-based progress bar */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 4 }).map((_, i) => {
                      const stepsFilled = s.label === 'Expert' ? 4 : s.label === 'Advanced' ? 3 : s.label === 'Intermediate' ? 2 : 1
                      const isActive = i < stepsFilled
                      
                      return (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                            isActive 
                              ? `bg-gradient-to-r ${levelColor}` 
                              : 'bg-white/10 group-hover:bg-white/15'
                          }`}
                          style={{ animationDelay: `${globalIndex * 0.2 + i * 0.1}s` }}
                        />
                      )
                    })}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium ${levelBg} text-white/90 border`}>
                      {s.label}
                    </span>
                    <span className="text-xs text-white/50">
                      {s.label === 'Expert' ? '4/4' : s.label === 'Advanced' ? '3/4' : s.label === 'Intermediate' ? '2/4' : '1/4'}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}