export type TEventList = Record<string, unknown>
export type TEventCallback<T = unknown> = (event: T) => void

export interface IEvent<Events extends TEventList> {
  on<E extends keyof Events>(key: E, callback: TEventCallback<Events[E]>): void
  off<E extends keyof Events>(key: E, callback: TEventCallback<Events[E]>): void
  emit<E extends keyof Events>(key: E, event: Events[E]): void
}
