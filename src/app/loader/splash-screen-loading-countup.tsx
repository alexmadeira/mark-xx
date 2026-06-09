import { motion } from 'motion/react'
import { useEffect } from 'react'
import { useCountUp } from 'react-countup'

import { useLoader } from '_STR/useLoader'

export function SplashScreenLoadingCountUp() {
  const { update } = useCountUp({
    ref: 'loading-countup',
    start: 0,
    end: 0,
    duration: 1.5,
    suffix: '%',
  })

  const loaded = useLoader((st) => st.data.loaded)

  useEffect(() => {
    update(loaded * 100)
  }, [loaded])

  return (
    <motion.div
      exit="exit"
      id="loading-countup"
      key="loading-countup"
      animate={loaded > 0 ? 'loading' : 'loaded'}
      initial={loaded > 0 ? 'loading' : 'loaded'}
      className="flex w-full items-center justify-end text-3xl text-[clamp(0.3rem,6vw,5.5rem)] leading-0 font-medium tracking-widest text-black"
      variants={{
        loading: { opacity: 1, transition: { duration: 0 } },
        loaded: { opacity: 0, transition: { duration: 0.5, delay: 1 } },
        exit: { opacity: 0, transition: { duration: 0.5, delay: 1 } },
      }}
    >
      <span id="contUp" className="" />
    </motion.div>
  )
}
