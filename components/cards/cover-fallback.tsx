// components/cards/cover-fallback.tsx
// Shown when a project has no cover yet. Mirrors the layout of the real
// covers (white card, title top-left, stack bottom-left) so it reads as intentional.

type CoverFallbackProps = {
  title: string
  tools?: string[]
}

export default function CoverFallback({ title, tools = [] }: CoverFallbackProps) {
  const shortTitle = title.split(' - ')[0]
  return (
    <div className="relative w-full h-full bg-neutral-50 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />
      <div
        className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-gradient-to-br from-sky-400/40 to-blue-600/40 blur-2xl"
        aria-hidden
      />
      <div className="relative h-full flex flex-col justify-between p-5 pt-14">
        <p className="text-neutral-900 font-bold text-lg sm:text-xl leading-tight line-clamp-3 max-w-[85%]">
          {shortTitle}
        </p>
        {tools.length > 0 && (
          <p className="text-[11px] text-neutral-500 font-medium">{tools.slice(0, 3).join(' · ')}</p>
        )}
      </div>
    </div>
  )
}
