import type { Scene } from 'phaser'

import { GameTexture } from '_GAME/core/infra/game-texture'

type TGridTextureProps = {
  scene: Scene
  tileSize: number
}

export class GridTexture extends GameTexture<TGridTextureProps> {
  private get scene() {
    return this.props.scene
  }

  private get tileSize() {
    return this.props.tileSize
  }

  private get sceneSize() {
    return {
      width: this.props.scene.scale.width,
      height: this.props.scene.scale.height,
    }
  }

  protected create() {
    const graphics = this.scene.make.graphics({ x: 0, y: 0 }, false)

    graphics.lineStyle(1, 0x00ff00, 0.2)

    for (let x = 0; x <= this.sceneSize.width; x += this.tileSize) graphics.lineBetween(x, 0, x, this.sceneSize.height)
    for (let y = 0; y <= this.sceneSize.height; y += this.tileSize) graphics.lineBetween(0, y, this.sceneSize.width, y)

    graphics.generateTexture(this.name, this.sceneSize.width, this.sceneSize.height)
    graphics.destroy()
  }
}
