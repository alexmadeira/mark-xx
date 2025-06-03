import { Building2, CalendarDays } from 'lucide-react'

export function Header() {
  return (
    <div className="flex h-full w-full flex-col gap-[clamp(0.5rem,1vw,2rem)]">
      <h1 className="text-[clamp(2.25rem,7vw,12rem)] leading-[clamp(2.5rem,7vw,8rem)] tracking-normal">Chilli Beans</h1>
      <p className="flex flex-wrap gap-[clamp(1rem,1.25vw,1.85rem)] px-[clamp(0.375rem,1vw,1.5rem)] text-[clamp(0.8rem,1vw,1.5rem)] leading-[clamp(1.333rem,1vw,1.555rem)]">
        <span className="flex items-center justify-center gap-2">
          <CalendarDays className="w-[clamp(1rem,1.2vw,1.85rem)]" /> 2018
        </span>
        <span className="flex items-center justify-center gap-2">
          <Building2 className="w-[clamp(1rem,1.2vw,1.85rem)]" /> CoreBiz
        </span>
      </p>
    </div>
  )
}
