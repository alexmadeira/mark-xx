import { createBrowserRouter } from 'react-router-dom'

import { BaseLayout } from '_LAY/base'
import { Home } from '_PAG/home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [{ path: '/', element: <Home /> }],
  },
])
