import { useEffect, useRef } from 'react'

import { snakeGame } from '_GAME/games'
import Phaser from 'phaser'

import { snakeEvent } from '_SRV/builder/event'
import { scrollingController } from '_SRV/controller'

export function SnakeGame() {
  const CLScrolling = scrollingController()

  const gameRef = useRef<HTMLDivElement>(null)
  const phaserGame = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!gameRef.current) return

    CLScrolling.stop()
    const tileCount = 30
    const tileSize = Math.min(gameRef.current.clientWidth, gameRef.current.clientHeight) / tileCount

    snakeEvent.emit('SNAKE:GAME:start')
    phaserGame.current = snakeGame(gameRef.current, tileSize, tileCount)

    return () => {
      CLScrolling.start()

      phaserGame.current?.destroy(true)
      phaserGame.current = null

      snakeEvent.emit('SNAKE:GAME:end')
    }
  }, [])

  return <div ref={gameRef} data-snake-container className="aspect-square h-full w-full" />
}
