import { dayJS } from '_SRV/lib'

import { useFetcherProjects } from '_STR/useFetcherProjects'
import { useRoute } from '_STR/useRoute'

export function ProjectDetails() {
  const projectSlug = useRoute((st) => st.data.params.slug)
  const project = useFetcherProjects((st) => st.data.pages[projectSlug])

  return (
    <div className="w-full rounded-lg border-[clamp(1px,0.2vw,3px)] border-current p-[clamp(1rem,2vw,2.5rem)]">
      <h2 className="text-[clamp(1.25rem,1.85vw,3.25rem)] leading-none font-medium">Detalhes do Projeto</h2>
      <div className="mt-[clamp(1rem,1.5vw,2.25rem)] flex w-full flex-col gap-[clamp(0.5rem,1vw,1.5rem)]">
        {project?.role && (
          <div>
            <h3 className="text-[clamp(1.125rem,1.5vw,1.875rem)] leading-none font-normal">Meu Papel</h3>
            <p className="pl-[clamp(0.25rem,0.75vw,0.5rem)] text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
              {project.role}
            </p>
          </div>
        )}
        {project?.timeline && (
          <div>
            <h3 className="text-[clamp(1.125rem,1.5vw,1.875rem)] leading-none font-normal">Cronograma</h3>
            <p className="pl-[clamp(0.25rem,0.75vw,0.5rem)] text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
              {dayJS(project.timeline.start).format('YYYY')} - {dayJS(project.timeline.end).format('YYYY')}
            </p>
          </div>
        )}
        {project?.teamSize && (
          <div>
            <h3 className="text-[clamp(1.125rem,1.5vw,1.875rem)] leading-none font-normal">Tamanho da Equipe</h3>
            <p className="pl-[clamp(0.25rem,0.75vw,0.5rem)] text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
              {project.teamSize}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
