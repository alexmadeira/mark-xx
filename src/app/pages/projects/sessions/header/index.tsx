import { HeaderContent } from './header-content'
import { HeaderTitle } from './header-title'

export function Header() {
  return (
    <div className="w-full pt-[100px]">
      <HeaderTitle />
      <HeaderContent />
    </div>
  )
}
