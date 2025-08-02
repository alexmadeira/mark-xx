import type { TLanguagesBarProps } from '@/props/pages/about/languages'

export function Bar(_props: TLanguagesBarProps) {
  return (
    <div
      // style={{ background: techology.color, minWidth: `${(techology.usage / 100) * 100}%` }}
      className="relative z-0 h-full cursor-default first:origin-left first:rounded-l-full last:origin-right last:rounded-r-full"
    />
  )
}
