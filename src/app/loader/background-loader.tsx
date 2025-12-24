import type { LottieRefCurrentProps } from 'lottie-react'

import { useRef } from 'react'
import { useInterval } from 'react-use'

import Lottie from 'lottie-react'

import { loadingMotion } from '_CFG/motion/loading'

import { scrollingController } from '_SRV/controller'

import { useLoader } from '_STR/useLoader'

export function BackgroundLoader() {
  const CLScrolling = scrollingController()
  const logoRef = useRef<LottieRefCurrentProps>(null)

  const status = useLoader((st) => st.data.status)
  const once = useLoader((st) => st.data.once)

  useInterval(CLScrolling.resize, 500)

  if (!once) return null

  return (
    <div
      data-status={status}
      className="pointer-events-none fixed right-4 bottom-4 z-10 flex h-35 w-35 scale-40 rounded-lg border border-zinc-200/40 bg-white p-3 opacity-0 shadow transition duration-300 data-[status=loading]:scale-100 data-[status=loading]:opacity-100"
    >
      <Lottie className="w-full" lottieRef={logoRef} animationData={loadingMotion} loop={true} autoPlay={true} />
    </div>
  )
}
