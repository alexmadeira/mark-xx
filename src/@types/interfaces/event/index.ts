export type TEventList = Record<string, unknown>
export type TEventCallback<T = unknown> = (event: T) => void

export interface IEvent<Events extends TEventList = TEventList> {
  on<E extends keyof Events>(key: E, callback: TEventCallback<Events[E]>): void
  off<E extends keyof Events>(key: E, callback: TEventCallback<Events[E]>): void
  emit<E extends keyof Events>(key: E, ...[payload]: Events[E] extends void ? [] : [Events[E]]): void
}

export interface IEventEmitter<Events> {
  on<E extends keyof Events>(key: E, handler: (event: Events[E]) => void): void
  off<E extends keyof Events>(key: E, handler: (event: Events[E]) => void): void
  emit<E extends keyof Events>(key: E, payload: Events[E]): void
}
