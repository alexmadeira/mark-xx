import type { GameObjects, Scene } from 'phaser'

import { GameObject } from '_GAME/core/infra/game-object'

type TGridObjectProps = {
  scene: Scene
}

export class GridObject extends GameObject<GameObjects.Image, TGridObjectProps> {
  public create() {
    const grid = new GridObject(this.texture, this.props)
    grid.object = grid.props.scene.add.image(0, 0, grid.textureName).setOrigin(0).setDepth(0)

    return grid
  }

  public destroy() {
    this.object.destroy()
  }

  public onAcquire() {
    throw new Error('GridObject does not support onAcquire')
  }

  public onRelease() {
    throw new Error('GridObject does not support onRelease')
  }
}
