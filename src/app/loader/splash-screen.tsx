// import { useEffect } from 'react'

import type { LottieRefCurrentProps } from 'lottie-react'

import { useEffect, useRef } from 'react'

import { logoMotion } from '_CFG/motion/logo'
import Lottie from 'lottie-react'
import { useAnimate } from 'motion/react'
import { twMerge } from 'tailwind-merge'

import { scrollingController } from '_SRV/controller'

import { useLoader } from '_STR/useLoader'

export function SplashScreen() {
  const CLScrolling = scrollingController()
  CLScrolling.stop()

  const logoRef = useRef<LottieRefCurrentProps>(null)
  const countUpRef = useRef<HTMLSpanElement>(null)

  // const { update } = useCountUp({
  //   // ref: countUpRef,
  //   start: 0,
  //   end: 0,
  //   duration: 1,
  //   suffix: '%',
  //   onEnd: isLoaded,
  // })

  const [scope, animate] = useAnimate<HTMLDivElement>()

  const status = useLoader((st) => st.data.status)
  const loaded = useLoader((st) => st.data.loaded)

  // async function isLoaded() {
  //   animate('#countup', { opacity: 0 }, { ease: 'easeIn', duration: 0.5 })
  // }

  async function onComplete() {
    animate('#overlay', { opacity: 0 }, { ease: 'easeIn', duration: 0.5 })
    await animate('#loader', { scale: 55 }, { ease: 'circIn', duration: 1 })
    await animate(scope.current, { display: 'none' }, { duration: 0 })
    CLScrolling.restart()
  }

  useEffect(() => {
    switch (status) {
      case 'loading':
        // update(loaded * 100)
        break
      case 'finished':
        // update(100)
        logoRef.current?.playSegments([19, 120], true)
        logoRef.current?.play()
        break
    }
  }, [status, loaded, logoRef.current])

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
            onComplete={() => {
              if (status === 'finished') onComplete()
            }}
            loop={false}
            autoPlay={false}
          />
          <div
            id="countup"
            className={twMerge(
              'text-blackflex flex w-full items-center justify-end text-3xl leading-[120%] font-medium tracking-widest',
              'text-[clamp(0.3rem,6vw,5.5rem)]',
            )}
          >
            <span ref={countUpRef} className="flex w-fit leading-0" />
          </div>
        </div>
      </div>
    </div>
  )
}
