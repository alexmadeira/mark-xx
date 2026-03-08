export class GameOverUI {
  private container!: Phaser.GameObjects.Container
  private text!: Phaser.GameObjects.Text

  constructor(private scene: Phaser.Scene) {}

  create() {
    const { width, height } = this.scene.scale

    this.text = this.scene.add
      .text(width / 2, height / 2, `Game Over!\nScore: 0`, {
        fontSize: '32px',
        color: '#ff0000',
        fontFamily: 'monospace',
        align: 'center',
      })
      .setOrigin(0.5)

    this.container = this.scene.add.container(0, 0, [this.text])
    this.container.setVisible(false)
  }

  update(score: number) {
    this.text.setText(`Game Over!\nScore: ${score}`)
  }

  setVisible(visible: boolean) {
    this.container.setVisible(visible)
  }
}
