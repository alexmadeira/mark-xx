import type { GameState } from '_GAME/snake/game-state'

import Phaser from 'phaser'

export class EndScene extends Phaser.Scene {
  constructor(private readonly gameState: GameState) {
    super('GAME_OVER')
  }

  create() {
    const { width, height } = this.scale

    this.cameras.main.setBackgroundColor('#CCCCCC')

    this.add
      .text(width / 2, height / 2 - 50, 'GAMER OVER', {
        fontSize: '48px',
        color: '#00ff88',
        fontFamily: 'monospace',
      })
      .setOrigin(0.5)

    this.add
      .text(width / 2, height / 2 + 20, 'Pressione uma seta para iniciar', {
        fontSize: '18px',
        color: '#ffffff',
      })
      .setOrigin(0.5)

    this.input.keyboard?.once('keydown', (event: KeyboardEvent) => {
      const keyMap: Record<string, string> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      }

      const direction = keyMap[event.key]

      if (direction) {
        this.gameState.transition('RUNNING')
      }
    })
  }
}
