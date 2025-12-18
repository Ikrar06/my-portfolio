// components/skills/skills-list.tsx

export type Skill = {
  category: string
  skills: string[]
}

type SkillsListProps = {
  skills: Skill[]
}

export default function SkillsList({ skills }: SkillsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
      {skills.map((category, categoryIndex) => (
        <div
          key={category.category}
          className="group backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500"
          style={{ animationDelay: `${categoryIndex * 0.1}s` }}
        >
          {/* Category Header */}
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-4 sm:mb-5 md:mb-6 group-hover:text-white/90 transition-colors">
            {category.category}
          </h3>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {category.skills.map((skill, skillIndex) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-xl bg-white/[0.04] border border-white/10 text-white/80 text-xs sm:text-sm font-medium hover:bg-white/[0.08] hover:border-white/20 hover:text-white transition-all duration-300"
                style={{ animationDelay: `${categoryIndex * 0.1 + skillIndex * 0.05}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
