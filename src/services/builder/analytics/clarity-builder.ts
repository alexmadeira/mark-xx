import type {
  TClarityPageViewProps,
  TClarityProps,
  TClaritySetUserPropertiesProps,
  TClarityTrackEventProps,
} from '@/services/builder/analytics/clarity'

import { clarity } from 'react-microsoft-clarity'

import { env } from '~/env'

import { Analytics } from './analytics'

export class ClarityBuilder extends Analytics<TClarityProps> {
  private clarity!: typeof clarity

  public init() {
    if (!env.PROD) return

    this.clarity = clarity
    this.clarity.init(this.props.projectId)
  }

  public pageView(...[path]: TClarityPageViewProps) {
    if (!this.clarity) return

    this.clarity.setTag('page', path)
  }

  public trackEvent(...[name]: TClarityTrackEventProps) {
    if (!this.clarity) return

    this.clarity.setEvent(name)
  }

  public setUserProperties(...[properties]: TClaritySetUserPropertiesProps) {
    if (!this.clarity) return

    Object.entries(properties).forEach(([key, value]) => {
      this.clarity.setTag(key, value)
    })
  }
}
