import type { Scene } from 'phaser'

import { GameTexture } from '_GAME/core/infra/game-texture'

type TFoodTextureProps = {
  scene: Scene
  tileSize: number
}

export class FoodTexture extends GameTexture<TFoodTextureProps> {
  private get scene() {
    return this.props.scene
  }

  private get tileSize() {
    return this.props.tileSize
  }

  protected create() {
    const graphics = this.scene.make.graphics({ x: 0, y: 0 }, false)

    graphics.fillStyle(0xff0000)
    graphics.fillRect(0, 0, this.tileSize, this.tileSize)
    graphics.lineStyle(2, 0xff0000, 0.5)
    graphics.strokeRect(0, 0, this.tileSize, this.tileSize)
    graphics.generateTexture(this.name, this.tileSize, this.tileSize)
    graphics.destroy()
  }
}
