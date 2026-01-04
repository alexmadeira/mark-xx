import type { TSEOProps, TSEOResolveTitleProps } from '@/services/controller/seo'

import _ from 'lodash'

export class SEOController {
  constructor(private readonly props: TSEOProps) {}

  public resolveTitle(...[title]: TSEOResolveTitleProps) {
    if (!title) return this.props.defaultTitle
    return _.presentsContent(title)
  }

  public get locale() {
    return this.props.locale
  }

  public get siteName() {
    return this.props.siteName
  }
}
