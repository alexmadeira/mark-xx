import type { IEvent, IEventEmitter, TEventCallback, TEventList } from '@/interfaces/event'

import mitt from 'mitt'

export class Mitt<Events extends TEventList> implements IEvent<Events> {
  private readonly emitter: IEventEmitter<Events>

  constructor() {
    this.emitter = mitt()
  }

  public on<E extends keyof Events>(key: E, callback: TEventCallback<Events[E]>) {
    this.emitter.on(key, callback)
  }

  public off<E extends keyof Events>(key: E, callback: TEventCallback<Events[E]>) {
    this.emitter.off(key, callback)
  }

  public emit<E extends keyof Events>(key: E, ...[payload]: Events[E] extends void ? [] : [Events[E]]) {
    this.emitter.emit(key, payload as Events[E])
  }
}
