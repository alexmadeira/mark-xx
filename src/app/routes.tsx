import { createBrowserRouter } from 'react-router-dom'

import { About } from '_APP/pages/about'
import { Home } from '_APP/pages/home'
import { Project } from '_APP/pages/project'
import { BaseLayout } from '_LAY/base'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/project/:slug', element: <Project /> },
    ],
  },
])
