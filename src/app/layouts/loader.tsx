import { useEffect } from 'react'

import { useAnimate } from 'motion/react'

import { scrollingController } from '_SRV/controller'

import { useLoader } from '_STR/useLoader'

export function Loader() {
  const CLScrolling = scrollingController()
  const [scope, animate] = useAnimate<HTMLDivElement>()

  const status = useLoader((st) => st.data.status)
  const loaded = useLoader((st) => st.data.loaded)

  async function isLoaded() {
    await animate('.divider', { width: '100%' }, { ease: 'easeOut', duration: 0.5 })
    await animate('.dor', { height: '0%' }, { ease: 'easeIn', duration: 0.8, delay: 0.2 })
    await animate(scope.current, { display: 'none' }, { duration: 0 })
  }

  async function isLoaing() {
    await animate(scope.current, { display: 'flex' }, { duration: 0 })
    await animate('.dor', { height: '100%' }, { ease: 'easeIn', duration: 0.5, delay: 0.5 })
  }
  async function isIdle() {
    await animate(scope.current, { display: 'flex' }, { duration: 0 })
    await animate('.dor', { height: '100%' }, { duration: 0 })
    await animate('.divider', { width: '0%' }, { duration: 0 })
  }

  useEffect(() => {
    if (status === 'idle') isIdle()
    if (status === 'loading') isLoaing()
    if (status === 'loading') CLScrolling.none()

    // console.log('Loader status', status)
    if (status === 'loaded' || status === 'finished') isLoaded()
    if (status === 'loaded' || status === 'finished') CLScrolling.restart()
  }, [status])

  return (
    <div data-status={status} ref={scope} className="fixed z-100 flex h-screen w-screen flex-col justify-between">
      <span className="absolute z-10 flex w-full items-center justify-center">{loaded}</span>
      <div className="dor dor-left bg-mark-100 flex h-1/2 w-full origin-top flex-col items-start justify-end">
        <span className="divider flex h-0.5 w-0 bg-black" />
      </div>
      <div className="dor dor-left bg-mark-100 flex h-1/2 w-full origin-bottom flex-col items-end justify-start">
        <span className="divider flex h-0.5 w-0 bg-black" />
      </div>
    </div>
  )
}
