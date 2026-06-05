import { createFakeEventBus } from '_TEST/utils/stubs/lib/fake-event-bus'
import { vi } from 'vitest'

import { AudioController } from '_SRV/controller/audio-controller'

type AudioControllerDeps = ConstructorParameters<typeof AudioController>

describe('Services', () => {
  describe('Controller', () => {
    describe('Audio', () => {
      it('should bind snake and interface events to sound manager actions', () => {
        const soundManager = {
          play: vi.fn(),
          stop: vi.fn(),
        }
        const snakeEvent = createFakeEventBus()
        const interfaceEvent = createFakeEventBus()

        new AudioController(
          soundManager as unknown as AudioControllerDeps[0],
          snakeEvent as unknown as AudioControllerDeps[1],
          interfaceEvent as unknown as AudioControllerDeps[2],
        )

        snakeEvent.listeners.get('SNAKE:FOOD:consume')?.()
        snakeEvent.listeners.get('SNAKE:GAME:end')?.()
        snakeEvent.listeners.get('SNAKE:GAME_STATE:transition')?.('RUNNING')
        snakeEvent.listeners.get('SNAKE:GAME_STATE:transition')?.('MENU')
        interfaceEvent.listeners.get('INTERFACE:Sound:coin')?.()
        interfaceEvent.listeners.get('INTERFACE:Sound:lifeUp')?.()
        interfaceEvent.listeners.get('INTERFACE:Action:toasty')?.()

        expect(soundManager.play).toHaveBeenCalledWith('eat')
        expect(soundManager.stop).toHaveBeenCalledWith('eat')
        expect(soundManager.stop).toHaveBeenCalledWith('music')
        expect(soundManager.play).toHaveBeenCalledWith('music')
        expect(soundManager.play).toHaveBeenCalledWith('coin')
        expect(soundManager.play).toHaveBeenCalledWith('lifeUp')
        expect(soundManager.play).toHaveBeenCalledWith('toasty')
      })
    })
  })
})
