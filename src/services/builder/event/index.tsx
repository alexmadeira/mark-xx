import type { IEvent } from '@/interfaces/event'
import type { TLoaderMediaEvents } from '@/services/builder/loader/medias'

import { Mitt } from './mitt'

let eventMedia: IEvent<TLoaderMediaEvents>

export function mediaEvent() {
  if (!eventMedia) eventMedia = new Mitt<TLoaderMediaEvents>()
  return eventMedia
}
