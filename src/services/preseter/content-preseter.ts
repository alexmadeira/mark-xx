import type {
  TContentPreseterBuildBlockProps,
  TContentPreseterProps,
  TContentPreseterRenderProps,
} from '@/services/preseter/content'

import _ from 'lodash'
import mustache from 'mustache'

import { contentPreseterConfig } from './content-preseter-config'

export class ContentPreseter {
  protected constructor(private readonly _props: TContentPreseterProps) {
    _.bindAll(this, ['contentHtml', 'buildBlock'])
  }

  static create(props: TContentPreseterProps) {
    return new ContentPreseter(props)
  }

  private buildBlock(block: TContentPreseterBuildBlockProps) {
    const template = this.templates[block.type]
    if (!template) return block

    const preRender = mustache.render(template.trim(), block)
    return mustache.render(preRender, contentPreseterConfig)
  }

  private get templates() {
    return this._props.templates
  }

  public contentHtml(content: TContentPreseterRenderProps) {
    return _.chain(content).map(this.buildBlock).compact().value()
  }
}
