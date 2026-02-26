import type { IAnalytics, TAnalyticsEventPayload } from '@/interfaces/analytics'

import _ from 'lodash'

export abstract class Analytics<TProps = unknown> implements IAnalytics {
  constructor(protected readonly props: TProps) {
    _.bindAll(this, ['init', 'pageView', 'trackEvent', 'setUserProperties'])
  }

  abstract init(): void
  abstract pageView(path: string): void
  abstract trackEvent(name: string, payload?: TAnalyticsEventPayload): void
  abstract setUserProperties(properties: TAnalyticsEventPayload): void
}
