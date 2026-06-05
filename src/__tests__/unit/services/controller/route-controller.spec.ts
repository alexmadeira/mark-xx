import type { TRouteProps } from '@/services/controller/route'

import { fakeRouteStore } from '_TEST/utils/stubs/stores/fake-route-store'
import { vi } from 'vitest'

import { RouteController } from '_SRV/controller/route-controller'

vi.mock('_STR/useRoute', async () => {
  const { fakeRouteStore } = await import('_TEST/utils/stubs/stores/fake-route-store')

  return {
    useRoute: {
      getState: vi.fn(() => fakeRouteStore),
    },
  }
})

const Page = () => null

const routes: TRouteProps = {
  paths: [
    { pathname: '/', element: Page },
    { pathname: '/projects/:slug', element: Page },
    { pathname: '/projects/:slug/:section', element: Page },
  ],
}

describe('Services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    fakeRouteStore.reset()
  })

  describe('Controller', () => {
    describe('Route', () => {
      it('should resolve static routes', () => {
        const sut = new RouteController(routes)

        expect(sut.getRoute('/')).toEqual({
          pathname: '/',
          element: Page,
          params: {},
        })
      })

      it('should resolve dynamic route params', () => {
        const sut = new RouteController(routes)

        expect(sut.getRoute('/projects/mark-xx/details')).toEqual({
          pathname: '/projects/:slug/:section',
          element: Page,
          params: {
            section: 'details',
            slug: 'mark-xx',
          },
        })
      })

      it('should update current route and params in store', () => {
        const sut = new RouteController(routes)

        sut.setRoute('/projects/mark-xx')

        expect(fakeRouteStore.actions.setCurrent).toHaveBeenCalledWith('/projects/mark-xx')
        expect(fakeRouteStore.actions.setParams).toHaveBeenCalledWith({ slug: 'mark-xx' })
      })

      it('should update page readiness in store', () => {
        const sut = new RouteController(routes)

        sut.isReady(true)

        expect(fakeRouteStore.actions.setPageReady).toHaveBeenCalledWith(true)
      })

      it('should expose route objects for router consumption', () => {
        const sut = new RouteController(routes)

        expect(sut.routesObject).toEqual([
          { path: '/', component: Page },
          { path: '/projects/:slug', component: Page },
          { path: '/projects/:slug/:section', component: Page },
        ])
      })

      it('should throw when route cannot be resolved', () => {
        const sut = new RouteController(routes)

        expect(() => sut.getRoute('/missing')).toThrow('Route not found: /missing')
      })
    })
  })
})
