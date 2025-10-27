import type { LottieRefCurrentProps } from 'lottie-react'

import { useEffect, useRef } from 'react'

import Lottie from 'lottie-react'
import { AnimatePresence, useAnimate } from 'motion/react'
import { twMerge } from 'tailwind-merge'

import { logoMotion } from '_CFG/motion/logo'

import { scrollingController } from '_SRV/controller'

import { useLoader } from '_STR/useLoader'

import { SplashScreenLoadingCountUp } from './splash-screen-loading-countup'

export function SplashScreen() {
  const CLScrolling = scrollingController()
  // CLScrolling.stop()

  const logoRef = useRef<LottieRefCurrentProps>(null)

  const [scope, animate] = useAnimate<HTMLDivElement>()

  const status = useLoader((st) => st.data.status)
  const loaded = useLoader((st) => st.data.loaded)
  const hasLoaded = status === 'finished' && loaded === 0

  // async function onComplete() {
  //   animate('#overlay', { opacity: 0 }, { ease: 'easeIn', duration: 0.5 })
  //   await animate('#loader', { scale: 55 }, { ease: 'circIn', duration: 1 })
  //   await animate(scope.current, { display: 'none' }, { duration: 0 })

  //   CLScrolling.start()
  // }

  // useEffect(() => {
  //   CLScrolling.none()

  //   if (finishd && logoRef.current) {
  //     logoRef.current.playSegments([hasLoaded ? 70 : 30, 120])
  //     logoRef.current.play()
  //   }
  // }, [finishd, hasLoaded])

  async function isLoaded() {
    animate('loading-countup', { opacity: 0 }, { delay: 1.5, ease: 'easeIn', duration: 0.5 })
  }

  async function onComplete() {
    animate('#overlay', { opacity: 0 }, { ease: 'easeIn', duration: 0.5 })
    await animate('#loader', { scale: 55 }, { ease: 'circIn', duration: 1 })
    await animate(scope.current, { display: 'none' }, { duration: 0 })

    CLScrolling.start()
  }

  useEffect(() => {
    CLScrolling.none()

    if (status === 'finished') isLoaded()
    if (status === 'finished' && logoRef.current) {
      logoRef.current.playSegments([hasLoaded ? 68 : 30, 120])
      logoRef.current.play()
    }
  }, [status, hasLoaded])

  return (
    <div ref={scope}>
      <div id="overlay" className="fixed z-10 flex h-screen w-screen bg-black" />
      <div className="fixed z-11 flex h-screen w-screen justify-between bg-white mix-blend-screen">
        <div
          id="loader"
          className={twMerge(
            'flex w-full flex-col items-center justify-center',
            'mx-auto flex w-full max-w-[94rem] flex-col gap-0 px-8',
            'md:px-[max(calc(var(--spacing-safe-area-x)+var(--spacing)*4),var(--spacing)*8))]',
            'lg:px-x-container',
          )}
        >
          <Lottie
            className="w-full"
            lottieRef={logoRef}
            animationData={logoMotion}
            initialSegment={[0, 19]}
            onComplete={() => status === 'finished' && onComplete()}
            loop={false}
            autoPlay={false}
          />
          <AnimatePresence>{status === 'loading' && <SplashScreenLoadingCountUp />}</AnimatePresence>
        </div>
      </div>
    </div>
  )
}
