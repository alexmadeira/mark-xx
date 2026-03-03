import type { IPoolItem } from '@/interfaces/game/infra/pool'
import type { TSnakeGameFood, TSnakeGameScene } from '@GAMETypes/snake/game'
import type { TFoodOnAcquireProps, TFoodOnReleaseProps } from '@GAMETypes/snake/infra/pool/food'

export class Food implements IPoolItem<TSnakeGameFood> {
  constructor(private scene: TSnakeGameScene) {}

  create(textureKey = 'food') {
    return this.scene.add.sprite(0, 0, textureKey).setOrigin(0).setVisible(false)
  }

  onAcquire(...[segment]: TFoodOnAcquireProps) {
    segment.setVisible(true)
  }

  onRelease(...[segment]: TFoodOnReleaseProps) {
    segment.setVisible(false)
  }
}
