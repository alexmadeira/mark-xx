import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-use'

import { seoController } from '_SRV/controller'

import { usePageConfigs } from '_STR/usePageConfigs'

export function SEOConfig() {
  const CLSeo = seoController()
  const location = useLocation()
  const props = usePageConfigs((st) => st.data.list[location.pathname || '-'])

  const title = CLSeo.resolveTitle(props?.meta.seo.title)

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>

      <link rel="canonical" href={props?.path} />
      {props?.meta.seo.description && <meta name="description" content={props.meta.seo.description} />}

      <meta property="og:url" content={props?.path} />
      <meta property="og:type" content={props?.meta.og.type} />
      <meta property="og:locale" content={CLSeo.locale} />
      <meta property="og:site_name" content={CLSeo.siteName} />

      <meta property="og:title" content={props?.meta.og.title || title} />
      {props?.meta.og.image && <meta property="og:image" content={props?.meta.og.image} />}
      {props?.meta.og.image && <meta property="og:image:width" content="1200" />}
      {props?.meta.og.image && <meta property="og:image:height" content="630" />}
      {props?.meta.og.description && <meta property="og:description" content={props?.meta.og.description} />}

      <meta name="twitter:url" content={props?.path} />
      <meta name="twitter:card" content={props?.meta.twitter.card} />
      <meta name="twitter:title" content={props?.meta.twitter.title || title} />
      {props?.meta.twitter.image && <meta name="twitter:image" content={props?.meta.twitter.image} />}
      {props?.meta.twitter.description && <meta name="twitter:description" content={props?.meta.twitter.description} />}
    </Helmet>
  )
}
