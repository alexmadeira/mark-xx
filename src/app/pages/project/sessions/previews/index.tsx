import { Browser } from './browser'
import { Full } from './full'
import { Grid } from './grid'
import { Masonry } from './masonry'

export function Previews() {
  return (
    <div className="mt-[clamp(2.5rem,3vw,8rem)] flex flex-col gap-[clamp(1.5rem,3vw,8rem)]">
      <Browser />
      <Grid />
      <Full />
      <Masonry />
    </div>
  )
}
