import type { IPoolItem } from '@GAMETypes/interfaces/infra/pool'
import type { TSnakeGamePlayerSegment, TSnakeGameScene } from '@GAMETypes/snake/game'
import type {
  TSnakeSegmentOnAcquireProps,
  TSnakeSegmentOnReleaseProps,
} from '@GAMETypes/snake/infra/pool/snake-segment'

export class SnakeSegment implements IPoolItem<TSnakeGamePlayerSegment> {
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
