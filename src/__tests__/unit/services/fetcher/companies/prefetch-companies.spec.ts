import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { CompaniesFetcher } from '_SRV/fetcher/companies-fetcher'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { CompanyMapperMock } from '_TEST/utils/stubs/mapper/fake-company-mapper'
import { FakeFetcherCompaniesStore } from '_TEST/utils/stubs/stores/fake-fetcher-companies-store'

vi.stubGlobal('window', { addEventListener: vi.fn() })

let companyMapper: CompanyMapperMock
let companiesStore: FakeFetcherCompaniesStore
let requesterApi: TFakeRequesterApi
let sut: CompaniesFetcher

describe('Services', () => {
  beforeEach(() => {
    companiesStore = new FakeFetcherCompaniesStore()
    companyMapper = new CompanyMapperMock()
    requesterApi = fakeRequesterApi()

    requesterApi.query.mockResolvedValue([])
    sut = new CompaniesFetcher(requesterApi, companyMapper, companiesStore)
  })
  describe('Fetcher', () => {
    describe('Companies', () => {
      describe('Fetch', () => {
        it('should be able', async () => {
          const result = sut.prefetch('company:prefetch')

          expect(result.tags).toEqual(['companies'])
          expect(result.name).toBe('company:prefetch')
          expect(result.fetch).toBeTypeOf('function')
        })
        it('should return a fetch delegates to this.fetch', async () => {
          const result = sut.prefetch('company:delegate-fetch')

          await result.fetch()
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
