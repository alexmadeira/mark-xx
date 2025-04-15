import { memo } from 'react'
import { useVideo } from 'react-use'

import { useInView } from 'motion/react'

export const Movie = memo(() => {
  const [video, _, controls, videoRef] = useVideo(
    <video
      autoPlay
      loop
      muted
      playsInline
      src="https://media.istockphoto.com/id/529204564/pt/v%C3%ADdeo/malamute-tem-a-sua-cabe%C3%A7a-para-fora-de-uma-janela-de-carro.mp4?s=mp4-640x640-is&k=20&c=W40Yub0x79uzSsmXkCS8HW7NMoLgrngEVITIRLGc8OA="
      className="h-full w-full object-cover object-center"
    />,
  )
  const inViewVideo = useInView(videoRef, { margin: '50px 0px' })
  if (videoRef.current) {
    if (inViewVideo) controls.play()
    if (!inViewVideo) controls.pause()
  }
  return (
    <div className="3xl:h-[50vh] relative mt-32 h-[40vh] min-h-[300px] w-full">
      <div className="absolute top-0 left-0 z-1 h-full w-full bg-zinc-800/70" />
      {video}
    </div>
  )
})

Movie.displayName = 'Movie'
