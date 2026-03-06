export class GameOverUI {
  private container!: Phaser.GameObjects.Container
  constructor(private scene: Phaser.Scene) {}

  create(score: number) {
    const { width, height } = this.scene.scale

    const text = this.scene.add
      .text(width / 2, height / 2, `Game Over!\nScore: ${score}`, {
        fontSize: '32px',
        color: '#ff0000',
        fontFamily: 'monospace',
        align: 'center',
      })
      .setOrigin(0.5)

    this.container = this.scene.add.container(0, 0, [text])
    this.container?.setVisible(false)
  }

  setVisible(visible: boolean) {
    this.container?.setVisible(visible)
  }
}
