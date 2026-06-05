import type { ITimer } from '@/services/utils/timer'

import { makeFakeTimer } from '_TEST/utils/stubs/lib/fake-timer'
import { fakeActivityStore } from '_TEST/utils/stubs/stores/fake-activity-store'
import { vi } from 'vitest'

import { ActivityController } from '_SRV/controller/activity-controller'

type EventListener = (event: Event) => void

const { interfaceEmit } = vi.hoisted(() => ({
  interfaceEmit: vi.fn(),
}))

vi.mock('_SRV/builder/event', () => ({
  interfaceEvent: {
    emit: interfaceEmit,
  },
}))

vi.mock('_STR/useActivity', async () => {
  const { fakeActivityStore } = await import('_TEST/utils/stubs/stores/fake-activity-store')

  return {
    useActivity: {
      getState: vi.fn(() => fakeActivityStore),
    },
  }
})

describe('Services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    fakeActivityStore.reset()
    vi.stubGlobal('window', {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    vi.stubGlobal('document', {
      addEventListener: vi.fn(),
      hidden: false,
      removeEventListener: vi.fn(),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('Controller', () => {
    describe('Activity', () => {
      it('should create monitor with default status and attach activity listeners once', () => {
        const { timer, timerSpy } = makeFakeTimer()
        const sut = new ActivityController(timer)

        sut.createMonitor('screen', {
          events: ['mousemove', 'scroll'],
          timeout: 1000,
        })

        expect(fakeActivityStore.actions.setMonitor).toHaveBeenCalledWith('screen', {
          events: ['mousemove', 'scroll'],
          status: 'active',
          timeout: 1000,
        })
        expect(window.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function), { passive: true })
        expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
        expect(timerSpy.delay).toHaveBeenCalledWith(expect.any(Function), 1000)
      })

      it('should route activity through throttle and reactivate idle monitors', () => {
        const { timer, timerSpy } = makeFakeTimer()
        const sut = new ActivityController(timer)

        sut.createMonitor('screen', {
          events: ['mousemove'],
          status: 'idle',
          timeout: 1000,
        })
        const activityListener = (window.addEventListener as ReturnType<typeof vi.fn>).mock.calls[0][1] as EventListener
        activityListener({ type: 'mousemove' } as Event)

        expect(timerSpy.throttle).toHaveBeenCalledWith(
          'ACTIVITY_CONTROLLER:routeActivity',
          expect.any(Function),
          200,
          expect.objectContaining({ type: 'mousemove' }),
        )
        expect(fakeActivityStore.actions.setStatus).toHaveBeenCalledWith('screen', 'active')
        expect(interfaceEmit).toHaveBeenCalledWith('INTERFACE:Activity:active')
        expect(interfaceEmit).toHaveBeenCalledWith('INTERFACE:Activity:update', 'active')
      })

      it('should emit idle state when monitor timeout runs', () => {
        let idleCallback: (() => void) | undefined
        const timer = {
          ...makeFakeTimer().timerSpy,
          delay: vi.fn((callback: () => void) => {
            idleCallback = callback
            return vi.fn()
          }),
        }
        const sut = new ActivityController(timer as unknown as ITimer)

        sut.createMonitor('screen', {
          events: ['mousemove'],
          timeout: 1000,
        })
        idleCallback?.()

        expect(fakeActivityStore.actions.setStatus).toHaveBeenCalledWith('screen', 'idle')
        expect(interfaceEmit).toHaveBeenCalledWith('INTERFACE:Activity:idle')
        expect(interfaceEmit).toHaveBeenCalledWith('INTERFACE:Activity:update', 'idle')
      })

      it('should clear listeners and monitor cancels on stop', () => {
        const cancel = vi.fn()
        const timer = {
          ...makeFakeTimer().timerSpy,
          delay: vi.fn(() => cancel),
        }
        const sut = new ActivityController(timer as unknown as ITimer)

        sut.createMonitor('screen', {
          events: ['mousemove'],
          timeout: 1000,
        })
        sut.start()
        sut.stop()

        expect(document.removeEventListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function))
        expect(window.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function))
        expect(cancel).toHaveBeenCalled()
      })
    })
  })
})
