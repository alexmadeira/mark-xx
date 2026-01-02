import type { CompanyDocument, CompanyDocumentData } from './types'

import { z } from 'zod/v4'

export const ZPrismicDocumentCompany = z.custom<CompanyDocument>()
export const ZPrismicDocumentCompanyData = z.custom<CompanyDocumentData>()

//
//
//
//

export type TPrismicDocumentCompany = z.infer<typeof ZPrismicDocumentCompany>
export type TPrismicDocumentCompanyData = z.infer<typeof ZPrismicDocumentCompanyData>
