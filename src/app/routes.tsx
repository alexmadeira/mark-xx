import { createBrowserRouter } from 'react-router-dom'

import { BaseLayout } from '_LAY/base'

import { routeController } from '_SRV/controller'

import { Empty } from './pages/empty'

const RouteController = routeController()

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: RouteController.routesObject.map((Route) => ({
      ...Route,
      element: <Route.component />,
    })),
  },
  {
    path: '/empty',
    element: <Empty />,
  },
])
