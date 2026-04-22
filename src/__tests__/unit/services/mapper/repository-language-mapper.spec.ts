import { makeRepositoryLanguageRaw } from '_TEST/utils/factories/fetcher/make-repository-language-raw'

import { RepositoryLanguageMapper } from '_SRV/mapper/repository-language-mapper'

let sut: RepositoryLanguageMapper

describe('Services', () => {
  beforeEach(() => {
    sut = new RepositoryLanguageMapper()
  })
  describe('Mapper', () => {
    describe('RepositoryLanguage', () => {
      it('should assign package groups correctly', () => {
        const repositoryPackagesRaw = { react: '^19.0.0', zod: '^4.0.0', tailwindcss: '^4.0.0' }
        const repositoryLanguageRaw = makeRepositoryLanguageRaw({
          CSS: 50,
          SCSS: 50,
          Rust: 70,
          HTML: 100,
          JavaScript: 500,
          TypeScript: 1000,
        })

        const result = sut.assignPackages(repositoryLanguageRaw, repositoryPackagesRaw)

        expect(result).toMatchObject({
          Outros: { Rust: 70 },
          'HTML/CSS': { Tailwind: 200, Sass: 200 },
          'JavaScript/TypeScript': { Zod: 1200, ReactJs: 1500 },
        })
      })

      it('should convert grouped packages into store language list', () => {
        const result = sut.toStore(
          makeRepositoryLanguageRaw({
            TypeScript: 800,
            JavaScript: 200,
            HTML: 50,
            CSS: 50,
            SCSS: 50,
          }),
          { vite: '^7.0.0' },
        )

        expect(result).toMatchObject([
          expect.objectContaining({
            id: 'html/css',
            name: 'HTML/CSS',
            usage: 150,
            libs: [{ id: 'sass', name: 'Sass', usage: 150 }],
          }),
          expect.objectContaining({
            id: 'javascript/typescript',
            name: 'JavaScript/TypeScript',
            usage: 1000,
            libs: [{ id: 'vitejs', name: 'ViteJs', usage: 1000 }],
          }),
        ])
      })
    })
  })
})
