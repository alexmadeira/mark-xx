import { PageHeader } from '_APP/components/ui-element/page/header'

import { useHero } from '_STR/useHero'

export function TitleCaption() {
  const typing = useHero((st) => st.data.typing)

  return (
    <PageHeader.Caption>
      Desenvolvedor {typing}
      <span className="animate-blink ml-1 inline-block h-[1em] w-[0.05em] bg-current align-text-bottom" />
    </PageHeader.Caption>
  )
}
