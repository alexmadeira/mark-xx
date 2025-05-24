import { TProjectDetailsProps, ZProjectDetailsProps } from '@/props/pages/projects/project-details'

import { twMerge } from 'tailwind-merge'

export function ProjectDetails(data: Partial<TProjectDetailsProps>) {
  const { image, ...props } = ZProjectDetailsProps.parse(data)

  return (
    <div
      className={twMerge(
        'relative flex h-full w-full flex-1 items-center justify-center overflow-hidden p-3',
        props.className,
      )}
    >
      <img
        {...image}
        className={twMerge(
          'h-full w-full object-contain transition-all duration-[3s] group-hover/grid:blur-[0.1rem] group-hover/grid:grayscale group-hover/item:scale-110 group-hover/item:blur-none group-hover/item:grayscale-0',
          image.className,
        )}
      />
    </div>
  )
}
