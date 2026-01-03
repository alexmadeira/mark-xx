import type { TSEOProps, TSEOResolveTitleProps } from '@/services/controller/seo'

import _ from 'lodash'
import mustache from 'mustache'

export class SEOController {
  constructor(private readonly props: TSEOProps) {}

  public resolveTitle(...[title]: TSEOResolveTitleProps) {
    if (!title) return this.props.defaultTitle
    if (!this.props.titleTemplate) return title
    if (!this.props.titleTemplate.includes('{{')) return title

    return mustache.render(this.props.titleTemplate, { title })
  }

  public get locale() {
    return this.props.locale
  }

  public get siteName() {
    return this.props.siteName
  }
}
