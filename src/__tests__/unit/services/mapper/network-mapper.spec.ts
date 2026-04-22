import { makeNetworkRaw } from '_TEST/utils/factories/fetcher/make-network-raw'

import { NetworkMapper } from '_SRV/mapper/network-mapper'

let sut: NetworkMapper

describe('Services', () => {
  beforeEach(() => {
    sut = new NetworkMapper()
  })
  describe('Mapper', () => {
    describe('Network', () => {
      it('should map raw data to store format', () => {
        const result = sut.toStore(
          makeNetworkRaw({
            id: 'network-id',
            tags: ['social'],
            data: {
              network_name: 'LinkedIn',
              network_path: 'https://linkedin.com/in/user',
              network_type: 'link',
              network_icon: 'linkedin',
            },
          }),
        )

        expect(result).toEqual({
          id: 'network-id',
          tags: ['social'],
          name: 'LinkedIn',
          path: 'https://linkedin.com/in/user',
          type: 'link',
          icon: 'linkedin',
        })
      })
    })
  })
})
