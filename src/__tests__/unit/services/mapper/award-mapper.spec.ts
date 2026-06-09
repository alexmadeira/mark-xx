import _ from 'lodash'

import { AwardMapper } from '_SRV/mapper/award-mapper'
import { makeAwardRaw } from '_TEST/utils/factories/fetcher/make-award-raw'

_.mixin({ presentsContent: (template: string | null | undefined) => template ?? '' }, { chain: false })

let sut: AwardMapper

describe('Services', () => {
  beforeEach(() => {
    sut = new AwardMapper()
  })
  describe('Mapper', () => {
    describe('Award', () => {
      it('should map award data and parse date/type', () => {
        const result = sut.toStore(
          makeAwardRaw({
            id: 'award-id',
            uid: 'best-project',
            data: {
              by: 'Acme Awards',
              name: 'Best Project',
              date: '2026-02-10T00:00:00',
              type: 'Prêmio',
              description: 'Great project',
            },
          }),
        )

        expect(result.id).toBe('award-id')
        expect(result.slug).toBe('best-project')
        expect(result.by).toBe('Acme Awards')
        expect(result.name).toBe('Best Project')
        expect(result.date).toEqual(new Date('2026-02-10T00:00:00'))
        expect(result.type.code).toBe('Prêmio')
        expect(result.type.value).toBe('award')
        expect(result.description).toBe('Great project')
      })
    })
  })
})
