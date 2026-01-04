import type { TRouteProps } from '@/services/controller/route'

import { About } from '_APP/pages/about'
import { Home } from '_APP/pages/home'
import { Project } from '_APP/pages/project'
import { Projects } from '_APP/pages/projects'

export const defaultRouteProps = {
  paths: [
    { pathname: '/', element: Home },
    { pathname: '/journey', element: About },
    { pathname: '/projects', element: Projects },
    { pathname: '/project/:slug', element: Project },
  ],
} satisfies TRouteProps
