import type { IPoolItem } from '@GAMETypes/interfaces/value-object/pool/pool-item'
import type { TSnakePlayerSegment } from '@GAMETypes/snake/entity/snake-player'
import type { TSnakeGameScene } from '@GAMETypes/snake/game'
import type { TFoodOnAcquireProps, TFoodOnReleaseProps } from '@GAMETypes/snake/pool/food'

export class Food implements IPoolItem<TSnakePlayerSegment> {
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
