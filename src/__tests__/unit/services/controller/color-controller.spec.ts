import { stubDocumentElementStyle } from '_TEST/utils/stubs/lib/fake-dom'
import { vi } from 'vitest'

import { ColorController } from '_SRV/controller/color-controller'

vi.mock('motion', async () => (await import('_TEST/utils/stubs/lib/fake-motion')).fakeMotion)

vi.mock('_SRV/utils/css', () => ({
  Css: {
    findCorVar: vi.fn((color: string) => {
      if (color === 'token-color') return '#123456'
      return color
    }),
  },
}))

describe('Services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    stubDocumentElementStyle()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('Controller', () => {
    describe('Color', () => {
      it('should set tokenized contrast CSS vars for the selected color', () => {
        const sut = ColorController.create<'brand'>({
          dark: '#000000',
          default: 'token-color',
          light: '#ffffff',
          variations: ['#ff0000'],
        })

        sut.betterContrast('brand', null)

        expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--brand-color', 'rgb(18 52 86)')
        expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
          '--brand-foreground-color',
          expect.any(String),
        )
      })

      it('should throw when color cannot be parsed', () => {
        const sut = ColorController.create({
          dark: '#000000',
          default: '#ffffff',
          light: '#ffffff',
        })

        expect(() => sut.betterContrast('brand', 'invalid-color')).toThrow('Invalid color: invalid-color')
      })
    })
  })
})
