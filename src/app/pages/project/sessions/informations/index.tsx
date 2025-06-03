import { Description } from './description'
import { Details } from './details'

export function Informations() {
  return (
    <div className="mt-[clamp(2.5rem,6vw,12rem)] flex flex-col gap-30 pb-28 md:flex-row md:gap-[clamp(1.5rem,3vw,8rem)]">
      <Description />
      <Details />
    </div>
  )
}
