import { Position } from '_GAME/core/value-object/position'
import _ from 'lodash'

export abstract class CollisionService<TProps = unknown> {
  protected constructor(protected readonly props: TProps) {}

  protected samePosition(a: Position, b: Position) {
    return a.equals(b)
  }

  protected isOutOfBounds(position: Position, maxWidth: number, maxHeight: number) {
    return !_.inRange(position.x, 0, maxWidth) || !_.inRange(position.y, 0, maxHeight)
  }

  protected collidesWithSelf(head: Position, body: Position[]) {
    return body.some((segment) => segment.equals(head))
  }
}
