import type { TRawSchemaCompany } from '@/services/schema/company'
import type { TStoreFetcherCompany } from '@/services/store/fetcher-companies'

import { asHTML, isFilled } from '@prismicio/client'
import _ from 'lodash'

export class CompanyMapper {
  public static toStore(raw: TRawSchemaCompany): TStoreFetcherCompany {
    return {
      id: raw.id,
      slug: raw.uid,
      end: isFilled.date(raw.data.end_date) ? new Date(raw.data.end_date) : undefined,
      name: _.get(raw, 'data.name', ''),
      role: _.get(raw, 'data.role', ''),
      start: isFilled.date(raw.data.start_date) ? new Date(raw.data.start_date) : new Date(),
      description: _.presentsContent(asHTML(_.get(raw, 'data.description'))),
    }
  }
}
