import { SnakeGame } from '_APP/games/snake'
import { Portal } from '@radix-ui/react-portal'

import { useEasterEgg } from '_STR/useEasterEgg'

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
        <SnakeGame />
      </div>
    </Portal>
  )
}
