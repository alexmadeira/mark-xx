import type { TProjectBlockImageGridProps } from '@/props/pages/about/project'

import _ from 'lodash'
import { twMerge } from 'tailwind-merge'

import { BlockImageGridImage } from './block-image-grid-image'

export function BlockImageGrid(props: TProjectBlockImageGridProps) {
  return (
    <div
      style={{
        '--sm-cols': 2,
        '--md-cols': props.columns,
        '--xl-cols': props.columns * 2,
        '--3xl-cols': props.columns * 3,
        '--sm-grid-cols': 'repeat(var(--sm-cols), minmax(0, 1fr))',
        '--md-grid-cols': 'repeat(var(--md-cols), minmax(0, 1fr))',
        '--xl-grid-cols': 'repeat(var(--xl-cols), minmax(0, 1fr))',
        '--3xl-grid-cols': 'repeat(var(--3xl-cols), minmax(0, 1fr))',
      }}
      data-gap={props.gap}
      data-hover={props.hoverStyle}
      className={twMerge(
        'md:px-x-container group pointer-events-none grid h-full w-full flex-1 grid-flow-row-dense grid-cols-1 p-4 px-8 py-[clamp(2rem,3vw,5rem)]',
        '3xl:grid-cols-(--3xl-grid-cols) sm:grid-cols-(--sm-grid-cols) md:grid-cols-(--md-grid-cols) xl:grid-cols-(--xl-grid-cols)',
        'data-[gap=true]:gap-4',
      )}
    >
      {props?.images.map((image) => <BlockImageGridImage key={image.id} {...image} />)}
    </div>
  )
}
