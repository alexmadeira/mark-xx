import { stubDocumentElementStyle } from '_TEST/utils/stubs/lib/fake-dom'
import { fakeElementStore } from '_TEST/utils/stubs/stores/fake-element-store'
import { vi } from 'vitest'

import { ElementController } from '_SRV/controller/element-controller'

vi.mock('_STR/useElement', async () => {
  const { fakeElementStore } = await import('_TEST/utils/stubs/stores/fake-element-store')

  return {
    useElement: {
      getState: vi.fn(() => fakeElementStore),
    },
  }
})

describe('Services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    fakeElementStore.reset()
    stubDocumentElementStyle()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('Controller', () => {
    describe('Element', () => {
      it('should normalize creation options and register element in store', () => {
        const sut = ElementController.create({
          name: 'hero',
          options: {
            cssVars: {
              global: false,
              name: 'custom-hero',
            },
          },
        })

        expect(fakeElementStore.actions.addElement).toHaveBeenCalledWith('hero')
        expect(sut.name).toBe('hero')
        expect(sut.settings).toEqual({
          cssVars: {
            global: false,
            name: 'custom-hero',
          },
        })
      })

      it('should update measures and CSS vars', () => {
        const sut = ElementController.create({ name: 'hero' })

        sut.setMeasure({ height: 160 })

        expect(fakeElementStore.actions.setMeasure).toHaveBeenCalledWith('hero', { height: 160 })
        expect(sut.cssVars).toEqual({
          '--hero-measure-height': '160px',
          '--hero-measure-width': '200px',
        })
        expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--hero-measure-height', '160px')
      })

      it('should not update empty measures', () => {
        const sut = ElementController.create({ name: 'hero' })

        sut.setMeasure({ height: 0 })

        expect(fakeElementStore.actions.setMeasure).not.toHaveBeenCalled()
      })

      it('should update class name with empty fallback', () => {
        const sut = ElementController.create({ name: 'hero' })

        sut.setClassName(null)

        expect(fakeElementStore.actions.setClassName).toHaveBeenCalledWith('hero', '')
      })
    })
  })
})
