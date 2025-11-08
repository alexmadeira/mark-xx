import { createBrowserRouter } from 'react-router-dom'

import { BaseLayout } from '_LAY/base'
import { PageWrapper } from '_LAY/page-wrapper.tsx'

import { routeController } from '_SRV/controller'

const RouteController = routeController()

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: RouteController.routesObject.map((Route) => ({
      ...Route,
      element: (
        <PageWrapper>
          <Route.component />
        </PageWrapper>
      ),
    })),
  },
])
