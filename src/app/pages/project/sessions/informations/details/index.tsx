import { ProjectDetails } from './project-details'
import { Technologies } from './technologies'

export function Details() {
  return (
    <div className="flex w-full flex-col gap-[clamp(1.5rem,3vw,8rem)] md:w-[clamp(30rem,40vw,50rem)]">
      <ProjectDetails />
      <Technologies />
    </div>
  )
}
