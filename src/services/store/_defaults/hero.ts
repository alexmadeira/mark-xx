import type { TStoreHeroData } from '@/services/store/hero'

export const heroDefaultData = {
  status: {
    current: 'idle',
    loaded: false,
    loading: false,
    error: false,
  },
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
