import _ from 'lodash'

import { SEOController } from '_SRV/controller/seo-controller'

_.mixin({ presentsContent: (template: string | null | undefined) => template ?? '' }, { chain: false })

describe('Services', () => {
  describe('Controller', () => {
    describe('SEO', () => {
      it('should resolve default title when title is empty', () => {
        const sut = new SEOController({
          defaultTitle: 'MARK-XX',
          locale: 'en',
          siteName: 'MARK',
        })

        expect(sut.resolveTitle('')).toBe('MARK-XX')
      })

      it('should resolve provided title through content presenter mixin', () => {
        const sut = new SEOController({
          defaultTitle: 'MARK-XX',
          locale: 'en',
          siteName: 'MARK',
        })

        expect(sut.resolveTitle('Project title')).toBe('Project title')
      })

      it('should expose locale and site name from props', () => {
        const sut = new SEOController({
          defaultTitle: 'MARK-XX',
          locale: 'pt-BR',
          siteName: 'MARK',
        })

        expect(sut.locale).toBe('pt-BR')
        expect(sut.siteName).toBe('MARK')
      })
    })
  })
})
