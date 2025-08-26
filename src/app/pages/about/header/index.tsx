import { PageHeader } from '_APP/components/ui-element/page/header'

export function Header() {
  return (
    <PageHeader.Root page="about">
      <PageHeader.Title />
      <PageHeader.Content />
    </PageHeader.Root>
  )
}
