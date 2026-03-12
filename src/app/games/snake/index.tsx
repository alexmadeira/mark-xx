import { useEffect, useRef } from 'react'

import { snakeGame } from '_GAME/games'
import Phaser from 'phaser'

import { snakeEvent } from '_SRV/builder/event'

export function SnakeGame() {
  const gameRef = useRef<HTMLDivElement>(null)
  const phaserGame = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!gameRef.current) return

    const tileCount = 30
    const tileSize = Math.min(gameRef.current.clientWidth, gameRef.current.clientHeight) / tileCount

    snakeEvent.emit('SNAKE:GAME:start')
    phaserGame.current = snakeGame(gameRef.current, tileSize, tileCount)

    return () => {
      phaserGame.current?.destroy(true)
      phaserGame.current = null

      snakeEvent.emit('SNAKE:GAME:end')
    }
  }, [])

  return <div ref={gameRef} className="aspect-square h-full w-full" />
}
