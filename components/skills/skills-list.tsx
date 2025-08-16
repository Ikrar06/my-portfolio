// components/skills/skills-list.tsx
import React from 'react'

export type Skill = {
  name: string
  level: number // 0-100
  label: 'Novice' | 'Intermediate' | 'Advanced' | 'Expert' | string
  years: number
  usage: 'daily' | 'weekly' | string
}

type SkillsListProps = {
  skills: Skill[]
}

/**
 * Progress bar read-only & aksesibel:
 * - role="progressbar"
 * - aria-valuenow / aria-valuemin / aria-valuemax
 * - aria-label = nama software
 * - Teks terlihat: "90/100 – Advanced"
 */
export default function SkillsList({ skills }: SkillsListProps) {
  const getLevelColor = (level: number) => {
    if (level >= 90) return 'from-blue-400 to-blue-600'
    if (level >= 75) return 'from-emerald-400 to-emerald-600'
    if (level >= 60) return 'from-amber-400 to-amber-600'
    return 'from-red-400 to-red-600'
  }

  const getLevelBgColor = (level: number) => {
    if (level >= 90) return 'bg-blue-500/10'
    if (level >= 75) return 'bg-emerald-500/10'
    if (level >= 60) return 'bg-amber-500/10'
    return 'bg-red-500/10'
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
            const level = Math.min(100, Math.max(0, Number(s.level) || 0))
            const levelColor = getLevelColor(level)
            const levelBg = getLevelBgColor(level)
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
                      {s.years}yr
                    </div>
                    <div className="text-xs text-white/40 capitalize">
                      {s.usage}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3">
                  <div
                    role="progressbar"
                    aria-label={s.name}
                    aria-valuenow={level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="relative h-3 w-full overflow-hidden rounded-full bg-white/5 group-hover:bg-white/10 transition-colors"
                  >
                    <div
                      className={`h-full bg-gradient-to-r ${levelColor} transition-all duration-1000 ease-out relative overflow-hidden`}
                      style={{ 
                        width: `${level}%`,
                        animationDelay: `${globalIndex * 0.2}s`
                      }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></div>
                    </div>
                  </div>
                  
                  {/* Level Info */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${levelBg} text-white/80 border border-white/10`}>
                      {s.label}
                    </span>
                    <span className="text-sm font-mono text-white/60 group-hover:text-white/70 transition-colors">
                      {level}%
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