import type {
  TClarityPageViewProps,
  TClarityProps,
  TClaritySetUserPropertiesProps,
  TClarityTrackEventProps,
} from '@/services/builder/analytics/clarity'

import { clarity } from 'react-microsoft-clarity'

import { Analytics } from './analytics'

export class ClarityBuilder extends Analytics<TClarityProps> {
  public init() {
    clarity.init(this.props.projectId)
  }

  public pageView(...[path]: TClarityPageViewProps) {
    clarity.setTag('page', path)
  }

  public trackEvent(...[name]: TClarityTrackEventProps) {
    clarity.setEvent(name)
  }

  public setUserProperties(...[properties]: TClaritySetUserPropertiesProps) {
    Object.entries(properties).forEach(([key, value]) => {
      clarity.setTag(key, value)
    })
  }
}
