import type { TSnakeGamePlayer } from '@GAMETypes/snake/game'
import type { Scene } from 'phaser'

import { GameObject } from '_GAME/core/infra/game-object'

type TSnakeObjectProps = {
  scene: Scene
}
type TSnakeObjectOnAcquireProps = [TSnakeGamePlayer]
type TSnakeObjectOnReleaseProps = [TSnakeGamePlayer]

export class SnakeObject extends GameObject<TSnakeGamePlayer, TSnakeObjectProps> {
  public create() {
    const snake = new SnakeObject(this.texture, this.props)
    snake.object = snake.props.scene.add.image(0, 0, snake.textureName).setOrigin(0).setVisible(false)

    return snake
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
