import { useEffect, useRef } from 'react'

import { overlapController } from '_SRV/controller'

import { useFetcherPages } from '_STR/useFetcherPages'

export function Movie() {
  const CLOverlap = overlapController()

  const videoRef = useRef<HTMLVideoElement>(null)
  const pageProperties = useFetcherPages((st) => st.data.about?.properties)

  useEffect(() => {
    if (videoRef.current) {
      CLOverlap.addElement(videoRef.current, '--color-black')
    }
  }, [videoRef.current])

  return (
    <div className="3xl:h-[50vh] relative mt-32 h-[40vh] min-h-[300px] w-full">
      <div className="absolute top-0 left-0 z-1 h-full w-full bg-zinc-800/70" />
      <div className="h-full w-full object-cover object-center">
        <video
          ref={videoRef}
          loop
          muted
          autoPlay
          playsInline
          src={pageProperties?.property1}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  )
}
