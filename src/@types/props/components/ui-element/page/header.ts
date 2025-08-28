import type { HTMLAttributes, ReactNode } from 'react'

import { ZERouteType } from '@/enums/route'

import { z } from 'zod/v4'

export const ZPageHeaderProps = z.object({
  page: ZERouteType.optional(),
})

export const ZPageHeaderProvider = z.object({
  children: z.custom<ReactNode>(),
  ...ZPageHeaderProps.shape,
})

export const ZPageHeaderContextProps = z.object({
  ...ZPageHeaderProps.shape,
})

export const ZPageHeaderTitleProps = z.intersection(
  z.custom<HTMLAttributes<HTMLDivElement>>(),
  ZPageHeaderProps.partial(),
)
export const ZPageHeaderCaptionProps = z.custom<HTMLAttributes<HTMLHeadingElement>>()

export const ZPageHeaderContentProps = z.intersection(
  z.custom<HTMLAttributes<HTMLDivElement>>(),
  ZPageHeaderProps.partial(),
)

export const ZPageHeaderRootProps = z.intersection(z.custom<HTMLAttributes<HTMLDivElement>>(), ZPageHeaderProps)

//
//
//
//

export type TPageHeaderProps = z.infer<typeof ZPageHeaderProps>

export type TPageHeaderProvider = z.infer<typeof ZPageHeaderProvider>
export type TPageHeaderContextProps = z.infer<typeof ZPageHeaderContextProps>

export type TPageHeaderTitleProps = z.infer<typeof ZPageHeaderTitleProps>
export type TPageHeaderCaptionProps = z.infer<typeof ZPageHeaderCaptionProps>
export type TPageHeaderContentProps = z.infer<typeof ZPageHeaderContentProps>

export type TPageHeaderRootProps = z.infer<typeof ZPageHeaderRootProps>
