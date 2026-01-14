import type { TEAwardType } from '@/enums/award'
import type { TEPrismicAwardType } from '@/enums/prismic'
import type { Nullish } from '@/utils/nullish'

import { EnumValue } from './enum-value'

export class AwardType extends EnumValue<TEPrismicAwardType, TEAwardType> {
  constructor(code: Nullish<TEPrismicAwardType>) {
    super(code, {
      'Menção honrosa': 'honorable-mention',
      Prêmio: 'award',
      Matéria: 'article',
      Destaque: 'highlight',
    })
  }
}
