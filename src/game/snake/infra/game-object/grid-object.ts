import type { GameObjects, Scene } from 'phaser'

import { GameObject } from '_GAME/core/infra/game-object'

type TGridObjectProps = {
  scene: Scene
  texture: string
}

export class GridObject extends GameObject<GameObjects.Image, TGridObjectProps> {
  constructor(props: TGridObjectProps) {
    super(props)
  }

  public create() {
    const gridObject = new GridObject(this.props)
    gridObject.object = gridObject.props.scene.add.image(0, 0, gridObject.props.texture).setOrigin(0).setDepth(0)

    return gridObject
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
