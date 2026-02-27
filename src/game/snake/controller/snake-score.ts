import type { TSnakeScoreInitProps, TSnakeScoreProps } from '@GAMETypes/snake/controller/snake-score'

import { Score } from '_GAME/core/score'

import { snakeEvent } from '_SRV/builder/event'

export class SnakeScore extends Score {
  private scoreText!: Phaser.GameObjects.Text

  constructor(props: TSnakeScoreProps) {
    super(props)
  }

  public update() {
    snakeEvent.emit('SNAKE:ScoreUpdated', this.score)
    this.scoreText.setText(`Score: ${this.score}`)
  }

  public render() {}
  public destroy() {}

  public init(...[scene]: TSnakeScoreInitProps) {
    snakeEvent.emit('SNAKE:ScoreUpdated', 0)
    this.scoreText = scene.add.text(10, 10, 'Score: 0', {
      fontSize: '14px',
      color: '#ffffff',
    })
  }
}
