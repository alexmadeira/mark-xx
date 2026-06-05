import { makeFakeMetaElement } from '_TEST/utils/stubs/lib/fake-dom'
import { makeFakeTimer } from '_TEST/utils/stubs/lib/fake-timer'
import { fakeHeroStore } from '_TEST/utils/stubs/stores/fake-hero-store'
import { vi } from 'vitest'

import { HeroController } from '_SRV/controller/hero-controller'

const technologiesState = {
  data: {
    list: [
      {
        color: '#ff0000',
        id: 'react',
        name: 'React',
        type: 'React',
      },
      {
        color: '#00ff00',
        id: 'typescript',
        name: 'TypeScript',
        type: 'TypeScript',
      },
    ],
  },
}

vi.mock('motion', async () => (await import('_TEST/utils/stubs/lib/fake-motion')).fakeMotion)

vi.mock('~/env', () => ({
  env: {
    VITE_HERO_DELETION_SPEED: 20,
    VITE_HERO_TYPING_SPEED: 10,
    VITE_HERO_WAIT: 30,
  },
}))

vi.mock('_STR/useFetcherTechnologies', () => ({
  useFetcherTechnologies: {
    getState: vi.fn(() => technologiesState),
  },
}))

vi.mock('_STR/useHero', async () => {
  const { fakeHeroStore } = await import('_TEST/utils/stubs/stores/fake-hero-store')

  return {
    useHero: {
      getState: vi.fn(() => fakeHeroStore),
    },
  }
})

describe('Services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('document', {
      querySelector: vi.fn(() => makeFakeMetaElement()),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('Controller', () => {
    describe('Hero', () => {
      it('should set current hero, update color and start typing once', () => {
        const { timer, timerSpy } = makeFakeTimer()
        const sut = new HeroController(timer)

        sut.start()
        sut.start()
        const typingCallback = timerSpy.interval.mock.calls[0][0]
        typingCallback()

        expect(fakeHeroStore.actions.setCurrent).toHaveBeenCalledOnce()
        expect(fakeHeroStore.actions.setCurrent).toHaveBeenCalledWith(technologiesState.data.list[0])
        expect(fakeHeroStore.actions.setColor).toHaveBeenCalledWith('#ff0000')
        expect(timerSpy.interval).toHaveBeenCalledOnce()
        expect(timerSpy.interval).toHaveBeenCalledWith(expect.any(Function), 10)
        expect(fakeHeroStore.actions.setTyping).toHaveBeenCalledWith('R')
      })

      it('should clear active timers on stop', () => {
        const { intervalCancel, timer } = makeFakeTimer()
        const sut = new HeroController(timer)

        sut.start()
        sut.stop()

        expect(intervalCancel).toHaveBeenCalled()
      })
    })
  })
})
