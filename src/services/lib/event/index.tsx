import type { TLoaderMediaEvents } from '@/services/builder/loader/medias'
import type { IEmitter } from '@/services/lib/event/emitter'

import { Mitt } from './mitt'

let mediaEmitter: IEmitter<TLoaderMediaEvents>

export function mediaEvent() {
  if (!mediaEmitter) mediaEmitter = new Mitt<TLoaderMediaEvents>()
  return mediaEmitter
}
