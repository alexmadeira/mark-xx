export class GameUI {
  private scoreText!: Phaser.GameObjects.Text

  constructor(private scene: Phaser.Scene) {}

  create(initialScore = 0) {
    this.scoreText = this.scene.add.text(10, 10, `Score: ${initialScore}`, {
      fontSize: '18px',
      color: '#ffffff',
    })
  }

  update(score: number) {
    if (this.scoreText) this.scoreText.setText(`Score: ${score}`)
  }

  setVisible(visible: boolean) {
    this.scoreText?.setVisible(visible)
  }
}
