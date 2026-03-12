import type { TSnakeGameEvents } from '@/events/game-events'
import type { TInterfaceEvents } from '@/events/interface-events'
import type { TLoaderMediaEvents } from '@/events/loader-events'
import type { IEvent } from '@/interfaces/event'

import { Mitt } from './mitt'

export const snakeEvent: IEvent<TSnakeGameEvents> = new Mitt<TSnakeGameEvents>()
export const interfaceEvent: IEvent<TInterfaceEvents> = new Mitt<TInterfaceEvents>()
export const loaderMediaEvent: IEvent<TLoaderMediaEvents> = new Mitt<TLoaderMediaEvents>()
