import type { TStoreHeroData } from '@/services/store/hero'

export const heroDefaultData = {
  status: 'idle',
  current: {
    content: {
      id: 'not-set',
      name: '',
      color: '',
      banner: '',
      type: '',
    },
    typing: '',
  },
} satisfies TStoreHeroData
