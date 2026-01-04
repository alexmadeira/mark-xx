import type { TSEOProps } from '@/services/controller/seo'

export const defaultSEOProps = {
  locale: 'pt_BR',
  siteName: '{{my.name}} | {{my.epithet.full}}',
  defaultTitle: '{{my.name}} | {{my.epithet.full}}',
} satisfies TSEOProps
