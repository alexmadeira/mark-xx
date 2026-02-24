import type { TSnakeCollisionProps } from '@GAMETypes/snake/controller/snake-collision'

import { Collision } from '_GAME/core/collision'

export class SnakeCollisionController extends Collision<TSnakeCollisionProps> {
  constructor(props: TSnakeCollisionProps) {
    super(props)
  }
}
