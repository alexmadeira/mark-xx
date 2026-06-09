import { vi } from 'vitest'

import { EasterEggController } from '_SRV/controller/easter-egg-controller'
import { fakeMousetrap } from '_TEST/utils/stubs/lib/fake-mousetrap'
import { fakeEasterEggStore } from '_TEST/utils/stubs/stores/fake-easter-egg-store'

vi.mock('mousetrap', async () => ({
  default: {
    bind: (await import('_TEST/utils/stubs/lib/fake-mousetrap')).fakeMousetrap.bind,
  },
}))

vi.mock('_STR/useEasterEgg', async () => {
  const { fakeEasterEggStore } = await import('_TEST/utils/stubs/stores/fake-easter-egg-store')

  return {
    useEasterEgg: {
      getState: vi.fn(() => fakeEasterEggStore),
    },
  }
})

describe('Services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    fakeEasterEggStore.reset()
  })

  describe('Controller', () => {
    describe('Easter Egg', () => {
      it('should bind escape to mark registered eggs as read', () => {
        fakeEasterEggStore.data.eggs = {
          snake: { status: 'called' },
        }

        new EasterEggController()
        const escapeHandler = fakeMousetrap.bind.mock.calls[0][1]
        escapeHandler()

        expect(fakeMousetrap.bind).toHaveBeenCalledWith('escape', expect.any(Function))
        expect(fakeEasterEggStore.actions.read).toHaveBeenCalledWith('snake')
      })

      it('should add eggs and bind key combo to dispatch found egg', () => {
        const sut = new EasterEggController()

        sut.addEgg({ keyCombo: ['shift', 's'], name: 'snake' })
        const comboHandler = fakeMousetrap.bind.mock.calls[1][1]
        comboHandler()

        expect(fakeEasterEggStore.actions.setEgg).toHaveBeenCalledWith('snake')
        expect(fakeMousetrap.bind).toHaveBeenCalledWith('shift s', expect.any(Function))
        expect(fakeEasterEggStore.actions.call).toHaveBeenCalledWith('snake')
      })

      it('should ignore already registered eggs', () => {
        const sut = new EasterEggController()

        sut.addEgg({ name: 'snake' })
        sut.addEgg({ name: 'snake' })

        expect(fakeEasterEggStore.actions.setEgg).toHaveBeenCalledOnce()
      })
    })
  })
})
