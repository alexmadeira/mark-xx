import { Game } from '_GAME/snake/game'
import { GameRender } from '_GAME/snake/game-render'
import { Scene } from 'phaser'

export class GameScene extends Scene {
  private speed = 100
  private lastUpdate = 0

  constructor(
    private readonly gameLogic: Game,
    private readonly gameRender: GameRender,
  ) {
    super('GAME')
  }

  public init() {
    this.lastUpdate = 0
    this.gameLogic.restart()
    this.gameRender.init(this)
  }

  public create() {
    this.cameras.main.setBackgroundColor('#000022')
    this.gameRender.create()
  }

  update(time: number) {
    if (time < this.lastUpdate) return

    this.lastUpdate = time + this.speed

    this.gameLogic.update()
    this.gameRender.update()
  }
}
