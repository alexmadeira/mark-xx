import type { IPoolItem } from '@/interfaces/game/infra/pool'
import type { TSnakeGamePlayerSegment, TSnakeGameScene } from '@GAMETypes/snake/game'
import type {
  TSnakeSegmentOnAcquireProps,
  TSnakeSegmentOnReleaseProps,
} from '@GAMETypes/snake/infra/pool/snake-segment'

export class SnakeSegment implements IPoolItem<TSnakeGamePlayerSegment> {
  constructor(private scene: TSnakeGameScene) {}

  create(frame = 4) {
    return this.scene.add.sprite(0, 0, 'snake-body', frame).setOrigin(0).setVisible(false)
  }

  onAcquire(...[segment]: TSnakeSegmentOnAcquireProps) {
    segment.setVisible(true)
  }

  onRelease(...[segment]: TSnakeSegmentOnReleaseProps) {
    segment.setVisible(false)
  }
}
