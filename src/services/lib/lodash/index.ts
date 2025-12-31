import _ from 'lodash'

import { contentPresenter } from '_SRV/presenter'

_.mixin(
  {
    presentsContent: contentPresenter().render,
  },
  { chain: false },
)
