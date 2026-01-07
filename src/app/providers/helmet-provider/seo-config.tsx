import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-use'

import _ from 'lodash'

import { seoController } from '_SRV/controller'

import { usePageConfigs } from '_STR/usePageConfigs'

export function SEOConfig() {
  const CLSeo = seoController()
  const location = useLocation()

  const configs = usePageConfigs((st) => st.data.list)
  const config = location.pathname && _.get(configs, location.pathname)

  if (!config) return null

  return (
    <Helmet prioritizeSeoTags>
      <title>{config.meta.seo.title}</title>

      <link rel="canonical" href={config.canonical} />
      {config.meta.seo.description && <meta name="description" content={config.meta.seo.description} />}

      <meta property="og:url" content={config.canonical} />
      <meta property="og:locale" content={CLSeo.locale} />
      <meta property="og:site_name" content={CLSeo.siteName} />
      <meta property="og:type" content={config.meta.openGraph.type} />
      <meta property="og:title" content={config.meta.openGraph.title} />
      {config.meta.openGraph.description && (
        <meta property="og:description" content={config.meta.openGraph.description} />
      )}
      {config.meta.openGraph.image && <meta property="og:image" content={config.meta.openGraph.image} />}
      {config.meta.openGraph.image && <meta property="og:image:width" content="1200" />}
      {config.meta.openGraph.image && <meta property="og:image:height" content="630" />}

      <meta name="twitter:url" content={config.canonical} />
      <meta name="twitter:card" content={config.meta.twitter.card} />
      <meta name="twitter:title" content={config.meta.twitter.title} />
      {config.meta.twitter.description && <meta name="twitter:description" content={config.meta.twitter.description} />}
      {config.meta.twitter.image && <meta name="twitter:image" content={config.meta.twitter.image} />}
    </Helmet>
  )
}
