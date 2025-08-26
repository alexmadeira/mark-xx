import type { TRoutePages } from '@/config/route/page'

import { About } from '_APP/pages/about'
import { Home } from '_APP/pages/home'
import { Project } from '_APP/pages/project'
import { Projects } from '_APP/pages/projects'

export const routePages = {
  home: Home,
  about: About,
  project: Project,
  projects: Projects,
} satisfies TRoutePages
