import type { TSnakeGameFood } from '@GAMETypes/snake/game'
import type { Scene } from 'phaser'

import { GameObject } from '_GAME/core/infra/game-object'

type TFoodObjectProps = {
  scene: Scene
}

type TSnakeObjectOnAcquireProps = [TSnakeGameFood]
type TSnakeObjectOnReleaseProps = [TSnakeGameFood]

export class FoodObject extends GameObject<TSnakeGameFood, TFoodObjectProps> {
  public create() {
    const food = new FoodObject(this.texture, this.props)
    food.object = food.props.scene.add.image(0, 0, food.textureName).setOrigin(0).setVisible(false)

    return food
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
