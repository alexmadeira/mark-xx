import type { TStoreEasterEggData, TStoreEasterEggEgg } from '@/services/store/easter-egg'

export const easterEggDefaultProps = {
  called: 0,
  status: 'idle',
} satisfies TStoreEasterEggEgg

export const easterEggDefaultData = {
  eggs: {},
} satisfies TStoreEasterEggData
