import { useEffect, useRef } from 'react'

import { overlapController } from '_SRV/controller'

import { useFetcherPages } from '_STR/useFetcherPages'

export function Movie() {
  const CLOverlap = overlapController()

  const videoRef = useRef<HTMLDivElement>(null)
  const about = useFetcherPages((st) => st.data.about)

  useEffect(() => {
    if (videoRef.current) CLOverlap.addElement(videoRef.current, '--color-black')
  }, [videoRef.current])

  return (
    <div className="h-[clamp(38rem,63vw,90rem)] w-full">
      <div className="relative h-full w-full">
        <div className="absolute top-0 left-0 z-1 h-full w-full bg-zinc-800/70" />
        <div ref={videoRef} className="h-full w-full object-cover object-center">
          {about.movie && (
            <video
              loop
              muted
              autoPlay
              playsInline
              data-src={about.movie}
              preload="metadata"
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>
      </div>
    </div>
  )
}
