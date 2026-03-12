export class BootScene extends Phaser.Scene {
  constructor() {
    super('BOOT')
  }

  public create() {
    this.scene.start('MAIN')
  }
}
