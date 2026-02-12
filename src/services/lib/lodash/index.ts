import _ from 'lodash'

import { contentPresenter } from '_SRV/presenter'

_.mixin(
  {
    presentsContent: contentPresenter().render,
    roundMin: (value: number, min: number) => _.max([_.round(value), min]),
  },
  { chain: false },
)
