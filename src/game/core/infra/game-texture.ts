export interface IGameTexture {
  readonly name: string
}

export abstract class GameTexture<TProps> implements IGameTexture {
  constructor(
    private readonly textureName: string,
    protected readonly props: TProps,
  ) {
    this.create()
  }

  protected abstract create(...args: unknown[]): void

  public get name() {
    return this.textureName
  }
}
