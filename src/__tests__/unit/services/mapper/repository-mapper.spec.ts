import { RepositoryMapper } from '_SRV/mapper/repository-mapper'
import { makeRepositoryRaw } from '_TEST/utils/factories/fetcher/make-repository-raw'

let sut: RepositoryMapper

describe('Services', () => {
  beforeEach(() => {
    sut = new RepositoryMapper()
  })

  describe('Mapper', () => {
    describe('Repository', () => {
      it('should map github repository fields to store format', () => {
        const result = sut.toStore(
          makeRepositoryRaw({
            id: 42,
            name: 'mark-xx',
            size: 1234,
            owner: { login: 'wooden' } as never,
            private: false,
            language: 'TypeScript',
            pushed_at: '2026-01-01T10:00:00.000Z',
            created_at: '2025-01-01T10:00:00.000Z',
            updated_at: '2026-01-02T10:00:00.000Z',
          }),
        )

        expect(result.id).toBe('42')
        expect(result.name).toBe('mark-xx')
        expect(result.size).toBe(1234)
        expect(result.owner).toBe('wooden')
        expect(result.private).toBe(false)
        expect(result.language).toBe('TypeScript')
        expect(result.pushedAt).toEqual(new Date('2026-01-01T10:00:00.000Z'))
        expect(result.createdAt).toEqual(new Date('2025-01-01T10:00:00.000Z'))
        expect(result.updatedAt).toEqual(new Date('2026-01-02T10:00:00.000Z'))
      })
    })
  })
})
