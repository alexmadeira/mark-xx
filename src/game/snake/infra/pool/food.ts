import type { IPoolItem } from '@GAMETypes/interfaces/infra/pool'
import type { TSnakeGameFood, TSnakeGameScene } from '@GAMETypes/snake/game'
import type { TFoodOnAcquireProps, TFoodOnReleaseProps } from '@GAMETypes/snake/infra/pool/food'

export class Food implements IPoolItem<TSnakeGameFood> {
  constructor(
    private scene: TSnakeGameScene,
    private tileSize: number,
  ) {}

  create() {
    return this.scene.add.rectangle(0, 0, this.tileSize, this.tileSize, 0xff0000).setOrigin(0)
  }

  onAcquire(...[segment]: TFoodOnAcquireProps) {
    segment.setVisible(true)
  }

  onRelease(...[segment]: TFoodOnReleaseProps) {
    segment.setVisible(false)
  }
}
