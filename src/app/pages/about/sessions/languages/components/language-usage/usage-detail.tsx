import type { TLanguagesUsageDetailProps } from '@/props/pages/about/languages'

import _ from 'lodash'

import { useFetcherUsageLanguages } from '_STR/useFetcherUsageLanguages'

export function UsageDetail(props: TLanguagesUsageDetailProps) {
  const total = useFetcherUsageLanguages((st) => st.data.total)
  const persent = (props.size / total) * 100

  return (
    <li className="group flex flex-1 cursor-default flex-col items-center overflow-hidden pt-4">
      <span className="text-black-900 flex w-full items-center justify-center gap-2 text-lg font-medium">
        <u style={{ background: props.color }} className="border-black-900 h-3 w-3 rounded-full border" />
        {props.name}
      </span>
      <span className="flex w-full items-center justify-center text-2xl font-medium">{_.ceil(persent)}%</span>
    </li>
  )
}
