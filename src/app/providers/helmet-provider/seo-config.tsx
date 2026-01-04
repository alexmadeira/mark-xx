import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-use'

import { seoController } from '_SRV/controller'

import { usePageConfigs } from '_STR/usePageConfigs'

export function SEOConfig() {
  const CLSeo = seoController()
  const location = useLocation()
  const props = usePageConfigs((st) => st.data.list[location.pathname || ''])

  // const title = CLSeo.resolveTitle(props?.meta.seo.title)
  // const ogTitle = props?.meta.openGraph.title ? CLSeo.resolveTitle(props?.meta.openGraph.title) : title
  // const twitterTitle = props?.meta.twitter.title ? CLSeo.resolveTitle(props?.meta.twitter.title) : title

  return (
    <Helmet prioritizeSeoTags>
      <title>{props?.meta.seo.title}</title>

      <link rel="canonical" href={props?.canonical} />
      {props?.meta.seo.description && <meta name="description" content={props?.meta.seo.description} />}

      <meta property="og:url" content={props?.canonical} />
      <meta property="og:locale" content={CLSeo.locale} />
      <meta property="og:site_name" content={CLSeo.siteName} />
      <meta property="og:type" content={props?.meta.openGraph.type} />
      <meta property="og:title" content={props?.meta.openGraph.title} />
      <meta property="og:description" content={props?.meta.openGraph.description} />
      {props?.meta.openGraph.image && <meta property="og:image" content={props?.meta.openGraph.image} />}
      {props?.meta.openGraph.image && <meta property="og:image:width" content="1200" />}
      {props?.meta.openGraph.image && <meta property="og:image:height" content="630" />}

      <meta name="twitter:url" content={props?.canonical} />
      <meta name="twitter:card" content={props?.meta.twitter.card} />
      <meta name="twitter:title" content={props?.meta.twitter.title} />
      <meta name="twitter:description" content={props?.meta.twitter.description} />
      {props?.meta.twitter.image && <meta name="twitter:image" content={props?.meta.twitter.image} />}
    </Helmet>
  )
}
