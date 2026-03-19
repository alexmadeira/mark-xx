import { z } from 'zod/v4'

import { ZSnakeGameEvents } from './game-events'
import { ZInterfaceEvents } from './interface-events'
import { ZLoaderMediaEvents } from './loader-events'

export const ZEvents = z.object({
  ...ZInterfaceEvents.shape,
  ...ZSnakeGameEvents.shape,
  ...ZLoaderMediaEvents.shape,
})

//
//
//

export type TEvents = z.infer<typeof ZEvents>
