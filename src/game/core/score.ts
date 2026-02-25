import type { TScoreProps, TScoreSetPointValueProps } from '@GAMETypes/core/score'
import type { IScore } from '@GAMETypes/interfaces/score'

export abstract class Score implements IScore {
  private pointValue: number
  protected score: number

  constructor(private readonly props: TScoreProps) {
    this.score = 0
    this.pointValue = props.defaultPointValue
  }

  abstract init(...args: unknown[]): void
  abstract update(...args: unknown[]): void
  abstract render(...args: unknown[]): void
  abstract destroy(...args: unknown[]): void

  public addPoint() {
    this.score += this.pointValue
  }

  public setPointValue(...[value]: TScoreSetPointValueProps) {
    this.pointValue = value
  }

  public reset() {
    this.score = 0
    this.pointValue = this.props.defaultPointValue
  }

  public get total() {
    return this.score
  }
}
