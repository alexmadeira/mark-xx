import type { TPageImageProps } from '@/props/components/ui-element/page/image'

import { useLayoutEffect, useRef, useState } from 'react'

import _ from 'lodash'
import { twMerge } from 'tailwind-merge'

import { mediaEvent } from '_SRV/lib/event'

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
    <div data-loaded={isLoaded} className={twMerge('group relative', className)}>
      <img data-src={props.src.blur} className="relative h-full w-full scale-120 object-cover blur-lg" />
      <img
        ref={imgRef}
        alt={props.alt}
        loading="lazy"
        data-src={props.src.original}
        className={twMerge(
          'absolute top-0 left-0 z-1 h-full w-full object-cover opacity-100 transition-opacity duration-500',
          'group-data-[loaded=true]:opacity-100',
          'group-data-[loaded=false]:opacity-0',
        )}
      />
    </div>
  )
}
