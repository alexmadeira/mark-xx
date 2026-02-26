import type { IAnalytics } from '@/interfaces/analytics'

import { env } from '~/env'

import { ClarityBuilder } from './clarity-builder'

let builderAnalytics: IAnalytics

export function analytics() {
  if (!builderAnalytics) builderAnalytics = new ClarityBuilder({ projectId: env.VITE_CLARIRY_PROJECT_ID })
  return builderAnalytics
}
