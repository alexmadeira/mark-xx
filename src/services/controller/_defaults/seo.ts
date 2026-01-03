import type { TSEOProps } from '@/services/controller/seo'

export const defaultSEOProps = {
  locale: 'pt_BR',
  siteName: 'Alex Madeira | Desenvolvedor Web',
  titleTemplate: 'Alex Madeira | {{title}}',
  defaultTitle: 'Alex Madeira | Desenvolvedor Web',
} satisfies TSEOProps
