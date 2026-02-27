import type { IEvent } from '@/interfaces/event'
import type { TLoaderMediaEvents } from '@/services/builder/loader/medias'
import type { TSnakeGameEvents } from '@GAMETypes/snake/game'

import { Mitt } from './mitt'

export const mediaEvent: IEvent<TLoaderMediaEvents> = new Mitt<TLoaderMediaEvents>()
export const snakeEvent: IEvent<TSnakeGameEvents> = new Mitt<TSnakeGameEvents>()
