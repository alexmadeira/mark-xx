import type { TProjectBlockImageGridProps } from '@/props/pages/about/project'

import _ from 'lodash'
import { twMerge } from 'tailwind-merge'

export function BlockImageGrid(props: TProjectBlockImageGridProps) {
  return (
    <div
      style={{
        '--md-cols': `repeat(${props.columns}, minmax(0, 1fr))`,
        '--sm-cols': `repeat(${_.round(props.columns / 2)}, minmax(0, 1fr))`,
        '--3xl-cols': `repeat(${props.columns * 2}, minmax(0, 1fr))`,
      }}
      data-gap={props.gap}
      className={twMerge(
        'md:px-x-container grid h-full w-full flex-1 grid-flow-row-dense p-4 px-8 py-[clamp(2rem,3vw,5rem)]',
        '3xl:grid-cols-(--3xl-cols) sm:grid-cols-(--sm-cols) md:grid-cols-(--md-cols)',
        'data-[gap=true]:gap-4',
      )}
    >
      {props?.images.map((image, i) => (
        <div
          key={`${image?.url}:${i}`}
          className="aspect-square h-full w-full overflow-clip rounded-lg border border-zinc-400/20 shadow-lg"
        >
          <img className="h-full w-full object-cover" alt={image.name} data-src={image?.url} />
        </div>
      ))}
    </div>
  )
}
