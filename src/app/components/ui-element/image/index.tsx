import type { TPageImageProps } from '@/props/components/ui-element/page/image'

import { useLayoutEffect, useRef, useState } from 'react'

import _ from 'lodash'
import { twMerge } from 'tailwind-merge'

import { mediaEvent } from '_SRV/builder/event'

export function Image({ className, ...props }: TPageImageProps) {
  const EVMedia = mediaEvent()

  const imgRef = useRef<HTMLImageElement>(null)
  const [isLoaded, setIsLoaded] = useState<boolean | null>(null)

  useLayoutEffect(() => {
    setIsLoaded(false)

    const handler = (src: string) => {
      if (src === props.src.original) setIsLoaded(true)
    }

    EVMedia.on('MEDIA:IMAGE:Finished', handler)
    return () => EVMedia.off('MEDIA:IMAGE:Finished', handler)
  }, [props.src])

  return (
    <div data-loaded={isLoaded} className="group relative h-full w-full">
      <img
        data-src={props.src.blur}
        className={twMerge(
          'relative h-full w-full scale-120 blur-lg transition-opacity duration-500',
          'group-data-[loaded=true]:opacity-0',
          'group-data-[loaded=false]:scale-100 group-data-[loaded=false]:opacity-100',
          className,
        )}
      />
      <img
        ref={imgRef}
        alt={props.alt}
        loading="lazy"
        data-src={props.src.original}
        className={twMerge(
          'absolute top-0 left-0 h-full w-full object-contain opacity-100 transition-opacity duration-500',
          'group-data-[loaded=true]:opacity-100',
          'group-data-[loaded=false]:opacity-0',
          className,
        )}
      />
    </div>
  )
}
