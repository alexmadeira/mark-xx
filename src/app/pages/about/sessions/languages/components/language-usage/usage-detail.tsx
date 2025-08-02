import type { TLanguagesUsageDetailProps } from '@/props/pages/about/languages'

export function UsageDetail(_props: TLanguagesUsageDetailProps) {
  return (
    <li className="group flex flex-1 cursor-default flex-col items-center overflow-hidden pt-4">
      <span className="text-black-900 flex w-full items-center justify-center gap-2 text-lg font-medium">
        <u style={{ background: '#CCCCCC' }} className="border-black-900 h-3 w-3 rounded-full border" />
        techology.name
      </span>
      <span className="flex w-full items-center justify-center text-2xl font-medium">techology.usage%</span>
    </li>
  )
}
