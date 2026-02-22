export type TEmitterEvents = Record<string, unknown>
export type TEmitterCallback<T = unknown> = (event: T) => void

export interface IEmitter<Events extends TEmitterEvents = TEmitterEvents> {
  on<E extends keyof Events>(key: E, callback: TEmitterCallback<Events[E]>): void
  off<E extends keyof Events>(key: E, callback: TEmitterCallback<Events[E]>): void
  emit<E extends keyof Events>(key: E, event: Events[E]): void
}
