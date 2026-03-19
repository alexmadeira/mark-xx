import type { TCopyButtonProps } from '@/props/components/ui-element/page/action/button'

import { useEffect } from 'react'
import { useToggle } from 'react-use'

import copy from 'copy-to-clipboard'

import { timer } from '_SRV/utils'

export function CopyButton({ onClickContent, value, onClick, children, backDelay, ...rest }: TCopyButtonProps) {
  const UTimer = timer()

  const [copying, setCopying] = useToggle(false)

  const showClickContent = copying && onClickContent

  useEffect(() => {
    if (!copying) return
    const backTime = UTimer.delay(setCopying, backDelay || 1000)

    return () => backTime()
  }, [copying])

  return (
    <button
      {...rest}
      type="button"
      onClick={(e) => {
        if (copying) return
        copy(value.toString())
        setCopying(true)
        onClick?.(e)
      }}
    >
      {showClickContent ? onClickContent : children}
    </button>
  )
}
