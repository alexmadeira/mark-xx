import type { IEvent, TEventCallback, TEventList } from '@/interfaces/event'

import mitt from 'mitt'

export class Mitt<Events extends TEventList> implements IEvent<Events> {
  private readonly Event = mitt<Events>()

  public on<E extends keyof Events>(key: E, callback: TEventCallback<Events[E]>) {
    this.Event.on(key, callback)
  }

  public off<E extends keyof Events>(key: E, callback: TEventCallback<Events[E]>) {
    this.Event.off(key, callback)
  }

  public emit<E extends keyof Events>(key: E, event: Events[E]) {
    this.Event.emit(key, event)
  }
}
