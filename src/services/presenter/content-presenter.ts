import type { TContentPresenterRenderProps } from '@/services/presenter/content'

import _ from 'lodash'
import mustache from 'mustache'

import { defaultContentView } from './presenter-config'

export class ContentPresenter {
  constructor() {
    _.bindAll(this, ['render'])
  }

  public render(...[template, view = {}]: TContentPresenterRenderProps) {
    if (!template) return ''
    if (!template.includes('{{')) return template

    try {
      return mustache.render(template, _.merge({}, defaultContentView, view))
    } catch (error) {
      console.error('Erro ao renderizar Mustache:', error)
      return template // Fallback para a string original em caso de erro
    }
  }
}
