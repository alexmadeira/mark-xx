export type TAnalyticsEventPayload = Record<string, string | string[]>

export interface IAnalytics {
  init: () => void
  pageView: (path: string) => void
  trackEvent: (name: string, payload?: TAnalyticsEventPayload) => void
  setUserProperties: (properties: TAnalyticsEventPayload) => void
}
