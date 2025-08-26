import { memo } from 'react'

import { PageHeader } from '_APP/components/ui-element/page/header'

import { useHero } from '_STR/useHero'

import { TitleCaption } from './title-caption'

export const Title = memo(() => {
  const typing = useHero((st) => st.data.typing)

  return (
    <PageHeader.Title
      style={{ opacity: typing !== null ? 1 : 0 }}
      className="relative z-1 w-full flex-1 transition-opacity duration-2000"
    >
      <TitleCaption />
    </PageHeader.Title>
  )
})
