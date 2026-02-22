import type { IEmitter, TEmitterCallback, TEmitterEvents } from '@/services/lib/event/emitter'

import mitt from 'mitt'

export class Mitt<Events extends TEmitterEvents> implements IEmitter<Events> {
  private readonly emitter = mitt<Events>()

  constructor() {}

  public on<E extends keyof Events>(key: E, callback: TEmitterCallback<Events[E]>) {
    this.emitter.on(key, callback)
  }

  public off<E extends keyof Events>(key: E, callback: TEmitterCallback<Events[E]>) {
    this.emitter.off(key, callback)
  }

  public emit<E extends keyof Events>(key: E, event: Events[E]) {
    this.emitter.emit(key, event)
  }
}
