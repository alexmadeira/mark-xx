import _ from 'lodash'

import { ContentPreseter } from './content-preseter'
import { templates } from './templates'

const preseterContent: Record<string, ContentPreseter> = {}

export function contentPreseter(name: keyof typeof templates) {
  if (!preseterContent[name]) {
    preseterContent[name] = ContentPreseter.create({
      templates: templates[name],
    })
  }

  return preseterContent[name]
}
