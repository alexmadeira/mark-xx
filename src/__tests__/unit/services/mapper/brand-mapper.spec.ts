import { makeBrandRaw } from '_TEST/utils/factories/fetcher/make-brand-raw'

import { BrandMapper } from '_SRV/mapper/brand-mapper'

let sut: BrandMapper

describe('Services', () => {
  beforeEach(() => {
    sut = new BrandMapper()
  })
  describe('Mapper', () => {
    describe('Brand', () => {
      it('should map Brand data and parse date/type', () => {
        const result = sut.toStore(
          makeBrandRaw({
            id: 'brand-id',
            uid: 'brand-slug',
            data: { name: 'Brand Name', logo: { url: 'https://cdn/logo.svg' } },
          }),
        )

        expect(result).toEqual({
          id: 'brand-id',
          slug: 'brand-slug',
          name: 'Brand Name',
          logo: 'https://cdn/logo.svg',
        })
      })
    })
  })
})
