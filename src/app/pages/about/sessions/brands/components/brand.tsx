import type { TBrandsBrandProps } from '@/props/pages/about/brands'

export function Brand(_props: TBrandsBrandProps) {
  return (
    <div className="group relative z-0 flex aspect-square w-40 p-[clamp(0.5rem,_1vw,_1rem)]">
      <img src="img/temp/mizuno.png" alt="" className="h-full w-full rounded-md object-contain" />
    </div>
  )
}
