import type { LottieRefCurrentProps } from 'lottie-react'

import { useEffect, useRef } from 'react'

import Lottie from 'lottie-react'
import { useAnimate } from 'motion/react'
import { twMerge } from 'tailwind-merge'

import { logoMotion } from '_CFG/motion/logo'

import { scrollingController } from '_SRV/controller'

import { useLoader } from '_STR/useLoader'

import { SplashScreenLoadingCountUp } from './splash-screen-loading-countup'

export function SplashScreen() {
  const CLScrolling = scrollingController()

  const logoRef = useRef<LottieRefCurrentProps>(null)

  const [scope, animate] = useAnimate<HTMLDivElement>()

  const onceFinished = useLoader((st) => st.data.once)

  async function onComplete() {
    await animate('#loading-countup', { opacity: 0 }, { ease: 'easeIn', duration: 0.5 })

    if (logoRef.current) {
      logoRef.current.playSegments([onceFinished ? 68 : 30, 120])
      logoRef.current.play()
    }

    await animate('#overlay', { opacity: 0 }, { delay: 1, ease: 'easeIn', duration: 0.5 })
    await animate('#loader', { scale: 55 }, { ease: 'circIn', duration: 1 })
    await animate(scope.current, { display: 'none' }, { duration: 0 })

    CLScrolling.start()
  }

  useEffect(() => {
    CLScrolling.none()
    if (onceFinished) onComplete().then()
  }, [onceFinished])

  return (
    <div ref={scope}>
      <div id="overlay" className="fixed z-10 flex h-screen w-screen bg-black" />
      <div className="fixed z-11 flex h-screen w-screen justify-between bg-white mix-blend-screen">
        <div
          id="loader"
          className={twMerge(
            'flex w-full flex-col items-center justify-center',
            'mx-auto flex w-full max-w-376 flex-col gap-0 px-8',
            'md:px-[max(calc(var(--spacing-safe-area-x)+var(--spacing)*4),var(--spacing)*8)]',
            'lg:px-x-container',
          )}
        >
          <Lottie
            className="w-full"
            lottieRef={logoRef}
            animationData={logoMotion}
            initialSegment={[0, 19]}
            loop={false}
            autoPlay={false}
          />
          <SplashScreenLoadingCountUp />
        </div>
      </div>
    </div>
  )
}
