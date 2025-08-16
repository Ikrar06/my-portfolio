// components/galleries/project-gallery.tsx
import Image from 'next/image'

type ProjectGalleryProps = {
  projectTitle: string
  final: string[]
  applications: string[]
  explorations: string[]
}

function Section({
  id,
  title,
  images,
  projectTitle,
}: {
  id: string
  title: string
  images: string[]
  projectTitle: string
}) {
  if (!images || images.length === 0) return null

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mt-10">
      <h2
        id={`${id}-heading`}
        className="text-xl md:text-2xl font-semibold tracking-tight"
      >
        {title}
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <figure
            key={`${id}-${i}`}
            className="group overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
          >
            {/* Anti-CLS: aspect ratio + fill + sizes */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={src}
                alt={`${projectTitle} — ${title} #${i + 1}`}
                fill
                sizes="(min-width:1280px) 33vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default function ProjectGallery({
  projectTitle,
  final,
  applications,
  explorations,
}: ProjectGalleryProps) {
  return (
    <div>
      <Section
        id="final"
        title="Final"
        images={final}
        projectTitle={projectTitle}
      />
      <Section
        id="applications"
        title="Applications"
        images={applications}
        projectTitle={projectTitle}
      />
      <Section
        id="explorations"
        title="Explorations"
        images={explorations}
        projectTitle={projectTitle}
      />
    </div>
  )
}
