import type { soundMap } from '_CFG/sounds'
import type { SoundManager } from '_SRV/builder/sound/sound-manager'
import type { TSnakeGameEvents } from '@/events/game-events'
import type { TInterfaceEvents } from '@/events/interface-events'
import type { IEvent } from '@/interfaces/event'

export class AudioController {
  constructor(
    private readonly soundManager: SoundManager<typeof soundMap>,
    private readonly snakeEvent: IEvent<TSnakeGameEvents>,
    private readonly interfaceEvent: IEvent<TInterfaceEvents>,
  ) {
    this.setup()
  }

  private setup() {
    this.buildListeners()
    this.buildInterfaceListeners()
  }

  private buildInterfaceListeners() {
    this.interfaceEvent.on('INTERFACE:Sound:coin', () => {
      this.soundManager.play('coin')
    })
    this.interfaceEvent.on('INTERFACE:Sound:lifeUp', () => {
      this.soundManager.play('lifeUp')
    })

    this.interfaceEvent.on('INTERFACE:Action:toasty', () => {
      this.soundManager.play('toasty')
    })
  }

  private buildSnakeListeners() {
    this.snakeEvent.on('SNAKE:FOOD:consume', () => {
      this.soundManager.play('eat')
    })

    this.snakeEvent.on('SNAKE:GAME:end', () => {
      this.soundManager.stop('eat')
      this.soundManager.stop('music')
    })

    this.snakeEvent.on('SNAKE:GAME_STATE:transition', (state) => {
      switch (state) {
        case 'MENU':
          this.soundManager.stop('music')
          break
        case 'RUNNING':
          this.soundManager.play('music')
          break
        case 'GAME_OVER':
          this.soundManager.stop('music')
          break
        default:
          this.soundManager.stop('music')
      }
    })
  }

  private buildListeners() {
    this.buildSnakeListeners()
  }
}
