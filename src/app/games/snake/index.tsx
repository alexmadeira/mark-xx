import { useEffect, useRef } from 'react'

import { GameScene } from '_GAME/snake/scene/game-scene'
import { StartScene } from '_GAME/snake/scene/start-scene'
import Phaser from 'phaser'

export function SnakeGame() {
  const gameRef = useRef<HTMLDivElement>(null)
  const phaserGame = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!gameRef.current) return

    phaserGame.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: 400,
      height: 400,
      parent: gameRef.current,
      scene: [StartScene, GameScene],
    })

    return () => {
      phaserGame.current?.destroy(true)
      phaserGame.current = null
    }
  }, [])

  return <div ref={gameRef} />
}
