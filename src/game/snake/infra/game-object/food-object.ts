import type { TSnakeGameFood } from '@GAMETypes/snake/game'
import type { Scene } from 'phaser'

import { GameObject } from '_GAME/core/infra/game-object'

type TFoodObjectProps = {
  scene: Scene
  texture: string
}

type TSnakeObjectOnAcquireProps = [TSnakeGameFood]
type TSnakeObjectOnReleaseProps = [TSnakeGameFood]

export class FoodObject extends GameObject<TSnakeGameFood, TFoodObjectProps> {
  constructor(props: TFoodObjectProps) {
    super(props)
  }

  public create() {
    const foodObject = new FoodObject(this.props)
    foodObject.object = foodObject.props.scene.add.image(0, 0, foodObject.props.texture).setOrigin(0).setVisible(false)

    return foodObject
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
