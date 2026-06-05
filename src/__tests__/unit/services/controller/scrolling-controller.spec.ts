import { stubWindowListeners } from '_TEST/utils/stubs/lib/fake-dom'
import { makeFakeLenis, TestScrollingController } from '_TEST/utils/stubs/lib/fake-lenis'
import { fakeScrollingStore } from '_TEST/utils/stubs/stores/fake-scrolling-store'
import { vi } from 'vitest'

vi.mock('_STR/useScrolling', async () => {
  const { fakeScrollingStore } = await import('_TEST/utils/stubs/stores/fake-scrolling-store')

  return {
    useScrolling: {
      getState: vi.fn(() => fakeScrollingStore),
    },
  }
})

describe('Services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    stubWindowListeners()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('Controller', () => {
    describe('Scrolling', () => {
      it('should initialize store details and bind scroll updates', () => {
        const lenis = makeFakeLenis()

        new TestScrollingController(lenis)
        const scrollCallback = lenis.on.mock.calls[0][1]
        scrollCallback({ ...lenis, actualScroll: 24, progress: 0.4, scroll: 400 })

        expect(fakeScrollingStore.actions.setDetails).toHaveBeenNthCalledWith(1, lenis)
        expect(fakeScrollingStore.actions.setDetails).toHaveBeenNthCalledWith(2, {
          actualScroll: 24,
          isHorizontal: false,
          isLocked: false,
          isScrolling: false,
          isSmooth: true,
          isStopped: false,
          limit: 1000,
          progress: 0.4,
          scroll: 400,
        })
      })

      it('should delegate lifecycle actions to lenis', () => {
        const lenis = makeFakeLenis()
        const sut = new TestScrollingController(lenis)

        sut.stop()
        sut.restart()
        sut.resize()
        sut.fromStart()

        expect(lenis.stop).toHaveBeenCalledTimes(2)
        expect(lenis.start).toHaveBeenCalledOnce()
        expect(lenis.resize).toHaveBeenCalledTimes(2)
        expect(lenis.scrollTo).toHaveBeenCalledWith(0, { immediate: true })
      })

      it('should remove scroll cancellation listeners when scroll completes', () => {
        const lenis = makeFakeLenis()
        const sut = new TestScrollingController(lenis)

        sut.scrollTo('#work', 0.6)
        const scrollOptions = lenis.scrollTo.mock.calls[0][1]
        scrollOptions?.onComplete?.()

        expect(window.addEventListener).toHaveBeenCalledWith('wheel', expect.any(Function), { passive: true })
        expect(window.addEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function), { passive: true })
        expect(lenis.scrollTo).toHaveBeenCalledWith(
          '#work',
          expect.objectContaining({
            duration: 0.6,
            easing: expect.any(Function),
          }),
        )
        expect(window.removeEventListener).toHaveBeenCalledWith('wheel', expect.any(Function))
        expect(window.removeEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function))
      })
    })
  })
})
