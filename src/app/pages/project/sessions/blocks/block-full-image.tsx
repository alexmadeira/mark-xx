import type { TProjectBlockFullImageProps } from '@/props/pages/about/project'

import { Image } from '_APP/components/ui-element/image'
import { twMerge } from 'tailwind-merge'

export function BlockFullImage(props: TProjectBlockFullImageProps) {
  return (
    <div
      data-size={props.size}
      className={twMerge(
        'group flex w-full items-start justify-start py-[clamp(2rem,3vw,5rem)]',
        'data-[size=center]:md:px-x-container data-[size=center]:px-8',
        'data-[size=full]:px-0 data-[size=full]:md:px-0',
      )}
    >
      <div className="h-full w-full overflow-clip rounded-lg shadow-lg group-data-[size=full]:rounded-none group-data-[size=full]:border-x-0">
        {props.url && <Image alt="" className="w-full" src={props.url} />}
      </div>
    </div>
  )
}
