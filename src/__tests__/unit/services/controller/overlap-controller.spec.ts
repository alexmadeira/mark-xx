import { vi } from 'vitest'

import { OverlapController } from '_SRV/controller/overlap-controller'
import { makeFakeElement } from '_TEST/utils/stubs/lib/fake-dom'
import { fakeOverlapStore } from '_TEST/utils/stubs/stores/fake-overlap-store'

vi.mock('_STR/useOverlap', async () => {
  const { fakeOverlapStore } = await import('_TEST/utils/stubs/stores/fake-overlap-store')

  return {
    useOverlap: {
      getState: vi.fn(() => fakeOverlapStore),
    },
  }
})

describe('Services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('requestAnimationFrame', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('Controller', () => {
    describe('Overlap', () => {
      it('should set collision options when element overlaps target', () => {
        const target = makeFakeElement({ bottom: 100, left: 0, right: 100, top: 0 })
        const element = makeFakeElement({ bottom: 80, left: 20, right: 80, top: 20 })
        const collisionOptions = 'light'
        const sut = new OverlapController()

        sut.setTarget('hero', target)
        sut.addElement(element, collisionOptions)
        sut.checkCollision()

        expect(fakeOverlapStore.actions.setCollision).toHaveBeenCalledWith('hero', collisionOptions)
      })

      it('should set null collision when elements do not overlap', () => {
        const target = makeFakeElement({ bottom: 100, left: 0, right: 100, top: 0 })
        const element = makeFakeElement({ bottom: 220, left: 120, right: 220, top: 120 })
        const sut = new OverlapController()

        sut.setTarget('hero', target)
        sut.addElement(element, 'dark')
        sut.checkCollision()

        expect(fakeOverlapStore.actions.setCollision).toHaveBeenCalledWith('hero', null)
      })

      it('should reset collisions for registered targets', () => {
        const sut = new OverlapController()

        sut.setTarget('hero', makeFakeElement({ bottom: 100, left: 0, right: 100, top: 0 }))
        sut.reset()

        expect(fakeOverlapStore.actions.setCollision).toHaveBeenCalledWith('hero', null)
      })

      it('should monitor collisions through requestAnimationFrame', () => {
        const target = makeFakeElement({ bottom: 100, left: 0, right: 100, top: 0 })
        const element = makeFakeElement({ bottom: 80, left: 20, right: 80, top: 20 })
        const sut = new OverlapController()
        const rafSpy = vi.mocked(requestAnimationFrame)
        const monitorCallback = rafSpy.mock.calls[0][0]

        sut.setTarget('hero', target)
        sut.addElement(element, 'light')
        monitorCallback(0)

        expect(fakeOverlapStore.actions.setCollision).toHaveBeenCalledWith('hero', 'light')
        expect(rafSpy).toHaveBeenCalledTimes(2)
      })

      it('should expose registered targets and elements', () => {
        const target = makeFakeElement({ bottom: 100, left: 0, right: 100, top: 0 })
        const element = makeFakeElement({ bottom: 80, left: 20, right: 80, top: 20 })
        const sut = new OverlapController()

        sut.setTarget('hero', target)
        sut.addElement(element, 'dark')

        expect(sut.targets.get('hero')).toBe(target)
        expect(sut.elements.get(element)).toBe('dark')
      })

      it('should remove targets from collision checks', () => {
        const target = makeFakeElement({ bottom: 100, left: 0, right: 100, top: 0 })
        const element = makeFakeElement({ bottom: 80, left: 20, right: 80, top: 20 })
        const sut = new OverlapController()

        sut.setTarget('hero', target)
        sut.addElement(element, 'light')
        sut.removeTarget('hero')
        sut.checkCollision()

        expect(sut.targets.has('hero')).toBe(false)
        expect(fakeOverlapStore.actions.setCollision).not.toHaveBeenCalled()
      })

      it('should remove elements from collision checks', () => {
        const target = makeFakeElement({ bottom: 100, left: 0, right: 100, top: 0 })
        const element = makeFakeElement({ bottom: 80, left: 20, right: 80, top: 20 })
        const sut = new OverlapController()

        sut.setTarget('hero', target)
        sut.addElement(element, 'light')
        sut.removeElement(element)
        sut.removeElement(null)
        sut.checkCollision()

        expect(sut.elements.has(element)).toBe(false)
        expect(fakeOverlapStore.actions.setCollision).toHaveBeenCalledWith('hero', null)
      })
    })
  })
})
