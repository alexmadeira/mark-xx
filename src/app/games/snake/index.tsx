import { useEffect, useRef } from 'react'

import { GameScene } from '_GAME/snake/scene/game-scene'
import { StartScene } from '_GAME/snake/scene/start-scene'
import Phaser from 'phaser'

export function SnakeGame() {
  const gameRef = useRef<HTMLDivElement>(null)
  const phaserGame = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!gameRef.current) return

    const { clientWidth, clientHeight } = gameRef.current
    const tileCount = 30
    const tileSize = Math.floor(Math.min(clientWidth, clientHeight) / tileCount)

    phaserGame.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: tileSize * tileCount,
      height: tileSize * tileCount,
      parent: gameRef.current,
      scene: [StartScene, new GameScene(tileSize, tileCount)],
    })

    return () => {
      phaserGame.current?.destroy(true)
      phaserGame.current = null
    }
  }, [])

  return <div ref={gameRef} className="h-300 w-300" />
}
