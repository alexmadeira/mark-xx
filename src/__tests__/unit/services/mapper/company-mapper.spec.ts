import { makeCompanyRaw } from '_TEST/utils/factories/fetcher/make-company-raw'
import _ from 'lodash'

import { CompanyMapper } from '_SRV/mapper/company-mapper'

_.mixin({ presentsContent: (template: string | null | undefined) => template ?? '' }, { chain: false })

let sut: CompanyMapper

describe('Services', () => {
  beforeEach(() => {
    sut = new CompanyMapper()
    vi.useRealTimers()
  })
  describe('Mapper', () => {
    describe('Company', () => {
      it('should map company fields with start and end dates', () => {
        const result = sut.toStore(
          makeCompanyRaw({
            id: 'company-id',
            uid: 'wooden',
            data: {
              name: 'Wooden',
              role: 'Developer',
              start_date: '2024-01-01T00:00:00',
              end_date: '2025-01-01T00:00:00',
              description: [{ type: 'paragraph', text: 'Worked on products', spans: [] }],
            },
          }),
        )

        expect(result.id).toBe('company-id')
        expect(result.slug).toBe('wooden')
        expect(result.name).toBe('Wooden')
        expect(result.role).toBe('Developer')
        expect(result.start).toEqual(new Date('2024-01-01T00:00:00'))
        expect(result.end).toEqual(new Date('2025-01-01T00:00:00'))
        expect(result.description).toContain('Worked on products')
      })

      it('should fallback to current date when start_date is missing', () => {
        const now = new Date('2020-04-08T00:00:00.000Z')

        vi.useFakeTimers()
        vi.setSystemTime(now)

        const brandRaw = makeCompanyRaw()
        const result = sut.toStore(brandRaw)

        expect(result.start).toEqual(now)
        expect(result.end).toBeUndefined()
      })
    })
  })
})
