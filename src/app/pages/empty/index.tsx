import { useLayoutEffect } from 'react'

import { SnakeGame } from '_APP/games/snake'

import { snakeEvent } from '_SRV/builder/event'

export function Empty() {
  useLayoutEffect(() => {
    snakeEvent.on('SNAKE:ScoreUpdated', console.log)
    return () => snakeEvent.off('SNAKE:ScoreUpdated', console.log)
  }, [])

  return (
    <>
      <div className="absolute top-1/2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <SnakeGame />
      </div>
    </>
  )
}
