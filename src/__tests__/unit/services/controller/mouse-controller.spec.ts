import { makeFakeElement } from '_TEST/utils/stubs/lib/fake-dom'
import { fakeMouseStore } from '_TEST/utils/stubs/stores/fake-mouse-store'
import { vi } from 'vitest'

import { MouseController } from '_SRV/controller/mouse-controller'

vi.mock('_STR/useMouse', async () => {
  const { fakeMouseStore } = await import('_TEST/utils/stubs/stores/fake-mouse-store')

  return {
    useMouse: {
      getState: vi.fn(() => fakeMouseStore),
    },
  }
})

type MouseMoveListener = (event: MouseEvent) => void

describe('Services', () => {
  const originalWindow = globalThis.window

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    globalThis.window = originalWindow
  })

  describe('Controller', () => {
    describe('Mouse', () => {
      it('should track document and registered element mouse position', () => {
        let listener: MouseMoveListener | undefined
        const documentMock = {
          addEventListener: vi.fn((_event: string, callback: MouseMoveListener) => {
            listener = callback
          }),
        }
        const element = makeFakeElement({
          bottom: 140,
          height: 100,
          left: 40,
          right: 240,
          top: 40,
          width: 200,
          x: 40,
          y: 40,
        })

        vi.stubGlobal('window', {
          document: documentMock,
          pageXOffset: 10,
          pageYOffset: 20,
        })

        const sut = new MouseController()
        sut.setElement('hero', element)
        sut.init()

        listener?.({
          clientX: 100,
          clientY: 120,
          pageX: 180,
          pageY: 220,
        } as MouseEvent)

        expect(documentMock.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function))
        expect(fakeMouseStore.actions.setDocumentPosition).toHaveBeenCalledWith({ x: 100, y: 120 })
        expect(fakeMouseStore.actions.setElementPosition).toHaveBeenCalledWith('hero', { x: 130, y: 160 })
      })

      it('should ignore null elements', () => {
        const sut = new MouseController()

        sut.setElement('hero', null)

        expect(fakeMouseStore.actions.setElementPosition).not.toHaveBeenCalled()
      })
    })
  })
})
