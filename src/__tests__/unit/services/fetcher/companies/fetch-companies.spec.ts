import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { makeCompanyRaw } from '_TEST/utils/factories/fetcher/make-company-raw'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { CompanyMapperMock } from '_TEST/utils/stubs/mapper/fake-company-mapper'
import { FakeFetcherCompaniesStore } from '_TEST/utils/stubs/stores/fake-fetcher-companies-store'

import { CompaniesFetcher } from '_SRV/fetcher/companies-fetcher'

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
          await sut.fetch('companies')
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
        it('should sets status to `loading` before the api call', async () => {
          const brandFetche = sut.fetch('companies:loading')

          expect(companiesStore.actions.setStatus).toHaveBeenCalledWith('loading')
          expect(companiesStore.data.status).toBe('loading')

          await brandFetche
        })
        it('should sets status to `loaded` after success api call', async () => {
          const brandFetche = sut.fetch('companies:loaded')
          expect(companiesStore.data.status).toBe('loading')
          await brandFetche
          expect(companiesStore.actions.setStatus).toHaveBeenCalledWith('loaded')
          expect(companiesStore.data.status).toBe('loaded')
        })
        it('should queries the api with the correct key and type', async () => {
          await sut.fetch('companies:key-type')
          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:companies',
            ['mark-xx:companies', 'companies:key-type'],
            expect.objectContaining({ type: 'company', return: 'all' }),
          )
        })
        it('should passes filter tags through to the api query', async () => {
          await sut.fetch('companies:filter-tags', { filter: { tags: ['highlight'] } })
          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:companies',
            expect.any(Array),
            expect.objectContaining({ tags: ['highlight'] }),
          )
        })
        it('should be able maps results through CompanyMapper and commits to the store', async () => {
          requesterApi.query.mockResolvedValue([
            makeCompanyRaw({
              uid: 'company-01',
              data: {
                name: 'Company 01',
                description: 'Company 01 description',
                role: 'Role 01',
                date: {
                  end: new Date('2021-10-11 12:00:20'),
                  start: new Date('2020-01-01 12:00:20'),
                },
              },
            }),
            makeCompanyRaw({
              uid: 'company-02',
              data: {
                name: 'Company 02',
                description: 'Company 02 description',
                role: 'Role 02',
                date: {
                  start: new Date('2022-03-01 12:00:20'),
                },
              },
            }),
          ])
          await sut.fetch('companies:mapper')
          expect(companyMapper.toStoreSpy).toHaveBeenCalledTimes(2)
          expect(companiesStore.actions.setList).toHaveBeenCalledOnce()

          expect(companiesStore.data.list[0].slug).toEqual('company-01')
          expect(companiesStore.data.list[0].name).toEqual('Company 01')
          expect(companiesStore.data.list[0].role).toEqual('Role 01')
          expect(companiesStore.data.list[0].description).toEqual('Company 01 description')
          expect(companiesStore.data.list[0].start).toEqual(new Date('2020-01-01 12:00:20'))
          expect(companiesStore.data.list[0].end).toEqual(new Date('2021-10-11 12:00:20'))

          expect(companiesStore.data.list[1].slug).toEqual('company-02')
          expect(companiesStore.data.list[1].name).toEqual('Company 02')
          expect(companiesStore.data.list[1].role).toEqual('Role 02')
          expect(companiesStore.data.list[1].description).toEqual('Company 02 description')
          expect(companiesStore.data.list[1].start).toEqual(new Date('2022-03-01 12:00:20'))
          expect(companiesStore.data.list[1].end).toBeUndefined()
        })
        it('shouldn`t call setList or CompanyMapper when the api rejects', async () => {
          requesterApi.query.mockRejectedValue(new Error('fail'))
          const brandFetche = sut.fetch('companies:error')
          await expect(brandFetche).rejects.toThrowError()

          expect(companyMapper.toStoreSpy).not.toHaveBeenCalled()
          expect(companiesStore.actions.setList).not.toHaveBeenCalled()
        })
        it('should sets status to `error` and re-throws when the api rejects ', async () => {
          requesterApi.query.mockRejectedValue(new Error('network failure'))
          const brandFetche = sut.fetch('companies:error')
          await expect(brandFetche).rejects.toThrow('network failure')

          expect(companiesStore.actions.setStatus).toHaveBeenCalledWith('error')
          expect(companiesStore.data.status).toBe('error')
        })
        it('should be able invokes the callback option on success', async () => {
          const callback = vi.fn()
          await sut.fetch('companies:callback', { callback })

          expect(callback).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
