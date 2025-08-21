import type { TLanguagesBarProps } from '@/props/pages/about/languages'

import { useFetcherUsageLanguages } from '_STR/useFetcherUsageLanguages'

export function Bar(props: TLanguagesBarProps) {
  const total = useFetcherUsageLanguages((st) => st.data.total)
  return (
    <div
      style={{ background: props.color, width: `${(props.size / total) * 100}%` }}
      className="relative z-0 h-full min-w-4 cursor-default first:origin-left first:rounded-l-full last:origin-right last:rounded-r-full"
    />
  )
}
