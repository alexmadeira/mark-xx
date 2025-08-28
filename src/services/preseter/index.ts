import type { TERouteType } from '@/enums/route'

import _ from 'lodash'

import { ContentPreseter } from './content-preseter'
import { templates } from './templates'

const preseterContent: Record<string, ContentPreseter> = {}

export function contentPreseter(name: TERouteType) {
  if (!preseterContent[name]) {
    preseterContent[name] = ContentPreseter.create({
      templates: _.get(templates, name),
    })
  }

  return preseterContent[name]
}
