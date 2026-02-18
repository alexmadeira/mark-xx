import type { LottieRefCurrentProps } from 'lottie-react'

import { useRef } from 'react'

// import { useInterval } from 'react-use'
import Lottie from 'lottie-react'
import { twMerge } from 'tailwind-merge'

import { loadingMotion } from '_CFG/motion/loading'

// import { scrollingController } from '_SRV/controller'
import { useLoader } from '_STR/useLoader'

export function BackgroundLoader() {
  // const CLScrolling = scrollingController()
  const logoRef = useRef<LottieRefCurrentProps>(null)

  const status = useLoader((st) => st.data.status)
  const once = useLoader((st) => st.data.once)

  // useInterval(CLScrolling.resize, 500)

  if (!once) return null

  return (
    <div
      data-status={status}
      className={twMerge(
        'pointer-events-none fixed right-6 bottom-6 z-17 flex scale-40 rounded-lg border border-zinc-200/40 bg-white opacity-0 shadow transition duration-300 data-[status=loading]:scale-100 data-[status=loading]:opacity-100',
        'h-[clamp(4.5rem,7vw,10rem)] w-[clamp(4.5rem,7vw,10rem)] p-[clamp(0.5rem,0.5vw,1.25rem)]',
      )}
    >
      <Lottie className="w-full" lottieRef={logoRef} animationData={loadingMotion} loop={true} autoPlay={true} />
    </div>
  )
}
