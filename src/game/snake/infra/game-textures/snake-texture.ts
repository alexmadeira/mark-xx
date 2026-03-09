import type { Scene } from 'phaser'

import { GameTexture } from '_GAME/core/infra/game-texture'

type TSnakeTextureProps = {
  scene: Scene
  tileSize: number
}

export class SnakeTexture extends GameTexture<TSnakeTextureProps> {
  private get scene() {
    return this.props.scene
  }

  private get tileSize() {
    return this.props.tileSize
  }

  protected create() {
    const graphics = this.scene.make.graphics({ x: 0, y: 0 }, false)

    graphics.fillStyle(0x00ff00)
    graphics.fillRect(0, 0, this.tileSize, this.tileSize)
    graphics.lineStyle(2, 0x003300)
    graphics.strokeRect(0, 0, this.tileSize, this.tileSize)
    graphics.generateTexture(this.name, this.tileSize, this.tileSize)
    graphics.destroy()
  }
}
