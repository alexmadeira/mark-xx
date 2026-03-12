import { lazy, Suspense, useEffect } from 'react'

import { Portal } from '@radix-ui/react-portal'

import { analytics } from '_SRV/builder/analytics'

import { useEasterEgg } from '_STR/useEasterEgg'

const SnakeGame = lazy(() => import('_APP/games/snake').then((m) => ({ default: m.SnakeGame })))

export function SnakeEgg() {
  const snakeEgg = useEasterEgg((state) => state.data.eggs.snake)
  const showSnakeEgg = snakeEgg?.status === 'called'

  const BAnalytics = analytics()

  useEffect(() => {
    if (snakeEgg?.status === 'called') {
      BAnalytics.trackEvent('EASTER_EGG_FOUND')
      BAnalytics.setUserProperties({ egg: 'snake' })
    }
  }, [snakeEgg?.status])

  if (!showSnakeEgg) return null

  return (
    <Portal className="pointer-events-none select-none">
      <div
        key="snake-egg"
        className="_overflow-clip fixed top-1/2 left-1/2 z-20 flex aspect-square min-h-[70vmin] min-w-[70vmin] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      >
        <Suspense fallback={null}>
          <SnakeGame />
        </Suspense>
      </div>
    </Portal>
  )
}
