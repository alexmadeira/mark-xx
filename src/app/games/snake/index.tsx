import { useEffect, useRef } from 'react'

import { snakeGame } from '_GAME/games'
import Phaser from 'phaser'

import { analytics } from '_SRV/builder/analytics'
import { snakeEvent } from '_SRV/builder/event'
import { scrollingController } from '_SRV/controller'

export function SnakeGame() {
  const BAnalytics = analytics()
  const CLScrolling = scrollingController()

  const gameRef = useRef<HTMLDivElement>(null)
  const phaserGame = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!gameRef.current) return
    BAnalytics.trackEvent('EASTER_EGG_FOUND:snake')

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
