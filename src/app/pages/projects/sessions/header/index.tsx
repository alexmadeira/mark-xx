import { HeaderContent } from './header-content'
import { HeaderTitle } from './header-title'

export function Header() {
  return (
    <div className="w-full pt-[var(--header-measure-height)]">
      <HeaderTitle />
      <HeaderContent />
    </div>
  )
}
