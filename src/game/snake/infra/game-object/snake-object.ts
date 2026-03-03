import type { TSnakeGamePlayer } from '@GAMETypes/snake/game'
import type { Scene } from 'phaser'

import { GameObject } from '_GAME/core/infra/game-object'

type TSnakeObjectProps = {
  scene: Scene
  texture: string
}
type TSnakeObjectOnAcquireProps = [TSnakeGamePlayer]
type TSnakeObjectOnReleaseProps = [TSnakeGamePlayer]

export class SnakeObject extends GameObject<TSnakeGamePlayer, TSnakeObjectProps> {
  constructor(props: TSnakeObjectProps) {
    super(props)
  }

  public create() {
    const snakeObject = new SnakeObject(this.props)
    snakeObject.object = snakeObject.props.scene.add
      .image(0, 0, snakeObject.props.texture)
      .setOrigin(0)
      .setVisible(false)

    return snakeObject
  }

  public destroy() {
    this.object.destroy()
  }

  public onAcquire(...[object]: TSnakeObjectOnAcquireProps) {
    object.setVisible(true)
  }

  public onRelease(...[object]: TSnakeObjectOnReleaseProps) {
    object.setVisible(false)
  }
}
