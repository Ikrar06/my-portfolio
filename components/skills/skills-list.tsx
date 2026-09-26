// components/skills/skills-list.tsx

export type Skill = {
  category: string
  skills: string[]
  highlight?: boolean
}

type SkillsListProps = {
  skills: Skill[]
}

export default function SkillsList({ skills }: SkillsListProps) {
  return (
    <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] divide-y divide-white/[0.07] overflow-hidden">
      {skills.map((category) => (
        <div
          key={category.category}
          className={`grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 md:gap-8 px-5 sm:px-8 py-5 sm:py-6 ${
            category.highlight ? 'bg-framer-blue/[0.04]' : ''
          }`}
        >
          <div className="flex items-center gap-2 self-start md:pt-1.5">
            {category.highlight && <span className="w-1.5 h-1.5 rounded-full bg-framer-blue" aria-hidden />}
            <h3 className="text-sm sm:text-[15px] font-semibold text-white">{category.category}</h3>
          </div>

          <ul className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <li
                key={skill}
                className={`px-3 py-1.5 rounded-full border text-xs sm:text-sm transition-colors duration-200 ${
                  category.highlight
                    ? 'border-framer-blue/30 bg-framer-blue/10 text-blue-100 hover:border-framer-blue/50'
                    : 'border-white/10 bg-white/[0.03] text-white/75 hover:border-white/20 hover:text-white'
                }`}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
