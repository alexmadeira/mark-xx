import Phaser from 'phaser'

export class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene')
  }

  create() {
    const { width, height } = this.scale

    this.cameras.main.setBackgroundColor('#CCCCCC')

    this.add
      .text(width / 2, height / 2 - 50, 'SNAKE', {
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
        this.scene.start('GameScene', { direction })
      }
    })
  }
}
