export interface IGameLogic {
  update(...args: unknown[]): void
}

export abstract class GameLogic implements IGameLogic {
  constructor() {
    this.init()
  }

  protected init() {}
  public abstract update(...args: unknown[]): void
}
