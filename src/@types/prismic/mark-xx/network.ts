import type { SocialNetworkDocument, SocialNetworkDocumentData } from './types'

import { z } from 'zod/v4'

export const ZPrismicDocumentNetwork = z.custom<SocialNetworkDocument>()
export const ZPrismicDocumentNetworkData = z.custom<SocialNetworkDocumentData>()
export const ZPrismicDocumentNetworkType = z.custom<SocialNetworkDocumentData['network_type']>()

//
//
//
//

export type TPrismicDocumentNetwork = z.infer<typeof ZPrismicDocumentNetwork>
export type TPrismicDocumentNetworkType = z.infer<typeof ZPrismicDocumentNetworkType>
export type TPrismicDocumentNetworkData = z.infer<typeof ZPrismicDocumentNetworkData>
