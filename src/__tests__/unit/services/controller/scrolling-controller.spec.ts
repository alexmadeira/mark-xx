import { stubWindowListeners } from '_TEST/utils/stubs/lib/fake-dom'
import { makeFakeLenis, TestScrollingController } from '_TEST/utils/stubs/lib/fake-lenis'
import { fakeScrollingStore } from '_TEST/utils/stubs/stores/fake-scrolling-store'
import { vi } from 'vitest'

import { ScrollingController } from '_SRV/controller/scrolling-controller'

const lenisMock = vi.hoisted(() => {
  const instance = {
    actualScroll: 12,
    isHorizontal: false,
    isLocked: false,
    isScrolling: false,
    isSmooth: true,
    isStopped: false,
    limit: 1000,
    progress: 0.2,
    scroll: 200,
    on: vi.fn(),
    resize: vi.fn(),
    scrollTo: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  }

  return {
    instance,
    constructor: vi.fn(function FakeLenis() {
      return instance
    }),
  }
})

vi.mock('lenis', () => ({
  default: lenisMock.constructor,
}))

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
      it('should create a controller with a Lenis instance', () => {
        const props = { autoRaf: false }

        const sut = ScrollingController.create(props)

        expect(lenisMock.constructor).toHaveBeenCalledWith(props)
        expect(fakeScrollingStore.actions.setDetails).toHaveBeenCalledWith(lenisMock.instance)
        expect(lenisMock.instance.on).toHaveBeenCalledWith('scroll', expect.any(Function))
        expect(sut.ev).toBe(lenisMock.instance)
      })

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

      it('should disable smooth scrolling styles and stop lenis', () => {
        const documentElementStyle = {
          setProperty: vi.fn(),
        }
        const bodyStyle = {
          setProperty: vi.fn(),
        }
        const lenis = makeFakeLenis()
        const sut = new TestScrollingController(lenis)

        vi.stubGlobal('document', {
          documentElement: {
            style: documentElementStyle,
          },
          getElementsByTagName: vi.fn(() => [{ style: bodyStyle }]),
        })

        sut.none()

        expect(documentElementStyle.setProperty).toHaveBeenCalledWith('overflow-y', 'scroll')
        expect(bodyStyle.setProperty).toHaveBeenCalledWith('overflow', 'hidden')
        expect(lenis.stop).toHaveBeenCalledOnce()
      })

      it('should restore scrolling styles and start lenis', () => {
        const documentElementStyle = {
          removeProperty: vi.fn(),
        }
        const bodyStyle = {
          removeProperty: vi.fn(),
        }
        const lenis = makeFakeLenis()
        const sut = new TestScrollingController(lenis)

        vi.stubGlobal('document', {
          documentElement: {
            style: documentElementStyle,
          },
          getElementsByTagName: vi.fn(() => [{ style: bodyStyle }]),
        })

        sut.start()

        expect(documentElementStyle.removeProperty).toHaveBeenCalledWith('overflow')
        expect(bodyStyle.removeProperty).toHaveBeenCalledWith('overflow')
        expect(lenis.start).toHaveBeenCalledOnce()
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

      it('should cancel scroll when the user wheels or touches the page', () => {
        const lenis = makeFakeLenis()
        const sut = new TestScrollingController(lenis)

        sut.scrollTo('#work')
        const wheelListener = vi.mocked(window.addEventListener).mock.calls.find(([event]) => event === 'wheel')?.[1]
        const scrollOptions = lenis.scrollTo.mock.calls[0][1]

        if (typeof wheelListener === 'function') wheelListener(new Event('wheel'))
        scrollOptions?.onComplete?.()

        expect(lenis.stop).toHaveBeenCalledOnce()
        expect(lenis.start).toHaveBeenCalledOnce()
        expect(window.removeEventListener).toHaveBeenCalledWith('wheel', expect.any(Function))
        expect(window.removeEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function))
        expect(window.removeEventListener).toHaveBeenCalledTimes(2)
      })

      it('should use cubic ease out when scrolling to a target', () => {
        const lenis = makeFakeLenis()
        const sut = new TestScrollingController(lenis)

        sut.scrollTo('#work')
        const scrollOptions = lenis.scrollTo.mock.calls[0][1]

        expect(scrollOptions?.easing?.(0)).toBe(0)
        expect(scrollOptions?.easing?.(0.5)).toBe(0.875)
        expect(scrollOptions?.easing?.(1)).toBe(1)
      })
    })
  })
})
