import { lazy, Suspense } from 'react'

import { Portal } from '@radix-ui/react-portal'

import { useEasterEgg } from '_STR/useEasterEgg'

const SnakeGame = lazy(() => import('_APP/games/snake').then((m) => ({ default: m.SnakeGame })))

export function SnakeEgg() {
  const snakeEgg = useEasterEgg((state) => state.data.eggs.snake)
  const showSnakeEgg = snakeEgg?.status === 'called'

  if (!showSnakeEgg) return null

  return (
    <Portal className="pointer-events-none select-none">
      <div
        key="snake-egg"
        className="fixed top-1/2 left-1/2 z-20 flex aspect-square min-h-[70vmin] min-w-[70vmin] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-clip"
      >
        <Suspense fallback={null}>
          <SnakeGame />
        </Suspense>
      </div>
    </Portal>
  )
}
