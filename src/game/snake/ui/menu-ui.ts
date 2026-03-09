export class MenuUI {
  private container!: Phaser.GameObjects.Container

  constructor(private scene: Phaser.Scene) {}

  create() {
    const { width, height } = this.scene.scale

    const title = this.scene.add
      .text(width / 2, height / 2 - 50, 'SNAKE', {
        fontSize: '48px',
        color: '#00ff88',
        fontFamily: 'monospace',
      })
      .setOrigin(0.5)

    const subtitle = this.scene.add
      .text(width / 2, height / 2 + 20, 'Pressione Enter para iniciar', {
        fontSize: '18px',
        color: '#ffffff',
      })
      .setOrigin(0.5)

    this.container = this.scene.add.container(0, 0, [title, subtitle])
  }

  setVisible(visible: boolean) {
    this.container?.setVisible(visible)
  }
}
