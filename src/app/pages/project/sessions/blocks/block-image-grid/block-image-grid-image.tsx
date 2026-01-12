import type { TProjectBlockImageGridImageProps } from '@/props/pages/about/project'

import { useEffect, useRef } from 'react'

import { twMerge } from 'tailwind-merge'

import { overlapController } from '_SRV/controller'

export function BlockImageGridImage(props: TProjectBlockImageGridImageProps) {
  const gridImageRef = useRef<HTMLDivElement>(null)
  const CLOverlap = overlapController()

  useEffect(() => {
    CLOverlap.addElement(gridImageRef.current, props.color)
  }, [gridImageRef.current, props])

  return (
    <div
      ref={gridImageRef}
      style={{
        '--rows': props.rows,
        '--cols': props.cols,
        '--ratio': `${props.cols}/${props.rows}`,
      }}
      className={twMerge(
        'pointer-events-auto col-span-1 row-span-(--rows) aspect-(--ratio) h-full w-full overflow-clip rounded-lg border border-zinc-400/20 shadow-lg transition-all duration-300',
        'sm:col-span-[min(var(--cols),var(--sm-cols))]',
        'md:col-span-[min(var(--cols),var(--md-cols))]',
        'xl:col-span-[min(var(--cols),var(--xl-cols))]',
        '3xl:col-span-[min(var(--cols),var(--3xl-cols))]',
        'group-data-[hover=scale]:hover:scale-106',
        'group-data-[hover=sepia]:group-hover:saturate-50 group-data-[hover=sepia]:group-hover:sepia-50 group-data-[hover=sepia]:hover:saturate-100 group-data-[hover=sepia]:hover:sepia-0',
        'group-data-[hover=grayscale]:group-hover:grayscale-95 group-data-[hover=grayscale]:hover:grayscale-0',
        'group-data-[hover=scale-sepia]:group-hover:saturate-50 group-data-[hover=scale-sepia]:group-hover:sepia-50 group-data-[hover=scale-sepia]:hover:scale-106 group-data-[hover=scale-sepia]:hover:saturate-100 group-data-[hover=scale-sepia]:hover:sepia-0',
        'group-data-[hover=scale-grayscale]:group-hover:grayscale-95 group-data-[hover=scale-grayscale]:hover:scale-106 group-data-[hover=scale-grayscale]:hover:grayscale-0',
      )}
    >
      <img className="h-full w-full object-cover" alt={props.name} data-src={props?.url} />
    </div>
  )
}
