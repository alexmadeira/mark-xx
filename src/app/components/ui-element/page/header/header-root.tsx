import type { TPageHeaderRootProps } from '@/props/components/ui-element/page/header'

import { twMerge } from 'tailwind-merge'

import { HeaderProvider } from './header-context'

export function HeaderRoot({ className, ...props }: TPageHeaderRootProps) {
  return (
    <HeaderProvider {...props}>
      <div {...props} className={twMerge('w-full pt-[var(--header-measure-height)]', className)} />
    </HeaderProvider>
  )
}
