export interface IStateMachine<TState extends string> {
  canTransition(to: TState): boolean
  transition(to: TState): boolean
  state: TState
}

export abstract class StateMachine<TState extends string> implements IStateMachine<TState> {
  private current: TState

  constructor(
    initial: TState,
    private readonly transitions: Record<TState, TState[]>,
  ) {
    this.current = initial
  }

  public canTransition(to: TState) {
    return this.transitions[this.current]?.includes(to) ?? false
  }

  public transition(to: TState) {
    if (!this.canTransition(to)) return false

    this.current = to
    return true
  }

  public get state() {
    return this.current
  }
}
