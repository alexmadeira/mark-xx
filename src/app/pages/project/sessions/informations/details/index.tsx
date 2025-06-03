import { ProjectDetails } from './project-details'
import { Technologies } from './technologies'

export function Details() {
  return (
    <div className="flex w-full flex-col md:w-[clamp(30rem,40vw,50rem)]">
      <div className="flex w-full flex-col gap-[clamp(1rem,1.5vw,8rem)] lg:sticky lg:top-[35%] lg:bottom-auto lg:mt-0">
        <ProjectDetails />
        <Technologies />
      </div>
    </div>
  )
}
