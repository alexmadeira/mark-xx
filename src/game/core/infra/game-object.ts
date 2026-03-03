export interface IGameObject<T> {
  readonly object: T
  create(...args: unknown[]): IGameObject<T>
  destroy(...args: unknown[]): void
  onAcquire(...args: unknown[]): void
  onRelease(...args: unknown[]): void
}

export abstract class GameObject<T, TProps> implements IGameObject<T> {
  protected gameObject!: T

  protected constructor(protected readonly props: TProps) {
    this.init()
  }

  protected init() {}

  protected set object(object: T) {
    this.gameObject = object
  }

  public abstract create(...args: unknown[]): IGameObject<T>

  public destroy(..._args: unknown[]) {}
  public onAcquire(..._args: unknown[]) {}
  public onRelease(..._args: unknown[]) {}

  public get object() {
    return this.gameObject
  }
}
