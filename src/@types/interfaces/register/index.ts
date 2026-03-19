export interface IRegister {
  register(...args: unknown[]): void
  unregister(): void
}
