import { Description } from './description'
import { Details } from './details'

export function Informations() {
  return (
    <div className="px-x-container flex flex-col gap-30 md:flex-row md:gap-[clamp(1.5rem,3vw,8rem)]">
      <Description />
      <Details />
    </div>
  )
}
