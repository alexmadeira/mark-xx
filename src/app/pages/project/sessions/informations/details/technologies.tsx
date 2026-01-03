import { useFetcherProjects } from '_STR/useFetcherProjects'
import { useRoute } from '_STR/useRoute'

export function Technologies() {
  const projectSlug = useRoute((st) => st.data.params.slug)
  const project = useFetcherProjects((st) => st.data.pages[projectSlug])

  if (!project?.technologies) return null
  return (
    <div className="w-full rounded-lg border-[clamp(1px,0.2vw,3px)] border-current p-[clamp(1rem,2vw,2.5rem)]">
      <h2 className="text-[clamp(1.25rem,1.85vw,3.25rem)] leading-none font-medium">Tecnologias</h2>
      <div className="mt-[clamp(1rem,1.5vw,2.25rem)] flex w-full flex-col">
        <p className="flex flex-wrap gap-[clamp(0.75rem,1vw,1.25rem)] pl-[clamp(0.25rem,0.75vw,0.5rem)] text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
          {project.technologies.map((tech) => (
            <span key={tech.name} className="rounded-full bg-current/15 px-6 py-0 backdrop-blur-sm">
              {tech.name}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
