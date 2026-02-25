import type { TSnakeScoreInitProps, TSnakeScoreProps } from '@GAMETypes/snake/controller/snake-score'

import { Score } from '_GAME/core/score'

export class SnakeScore extends Score {
  private scoreText!: Phaser.GameObjects.Text

  constructor(props: TSnakeScoreProps) {
    super(props)
  }

  public update() {
    this.scoreText.setText(`Score: ${this.score}`)
  }

  public render() {}
  public destroy() {}

  public init(...[scene]: TSnakeScoreInitProps) {
    this.scoreText = scene.add.text(10, 10, 'Score: 0', {
      fontSize: '14px',
      color: '#ffffff',
    })
  }
}
