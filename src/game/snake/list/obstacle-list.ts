import type { IPosition } from '@GAMETypes/interfaces/value-object/position'

import { WatchedList } from '_GAME/core/watched-list'

export class ObstacleList extends WatchedList<IPosition> {
  compareItems(a: IPosition, b: IPosition) {
    return a.equals(b)
  }
}
