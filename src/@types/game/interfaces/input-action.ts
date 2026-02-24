import type { Nullish } from '@/utils/nullish'

export interface IInputAction<TAction> {
  readonly action: Nullish<TAction>
  init(...args: unknown[]): void
  update(): void
  destroy(): void
}
