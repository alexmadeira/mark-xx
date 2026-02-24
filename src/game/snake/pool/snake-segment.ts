import type { IPoolItem } from '@GAMETypes/interfaces/value-object/pool/pool-item'
import type { TSnakePlayerSegment } from '@GAMETypes/snake/entity/snake-player'
import type { TSnakeGameScene } from '@GAMETypes/snake/game'
import type { TSnakeSegmentOnAcquireProps, TSnakeSegmentOnReleaseProps } from '@GAMETypes/snake/pool/snake-segment'

export class SnakeSegment implements IPoolItem<TSnakePlayerSegment> {
  constructor(
    private scene: TSnakeGameScene,
    private tileSize: number,
  ) {}

  create() {
    return this.scene.add.rectangle(0, 0, this.tileSize, this.tileSize, 0x00ff00).setOrigin(0)
  }

  onAcquire(...[segment]: TSnakeSegmentOnAcquireProps) {
    segment.setVisible(true)
  }

  onRelease(...[segment]: TSnakeSegmentOnReleaseProps) {
    segment.setVisible(false)
  }
}
