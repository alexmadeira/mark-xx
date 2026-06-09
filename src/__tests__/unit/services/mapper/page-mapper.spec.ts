import _ from 'lodash'

import { PageMapper } from '_SRV/mapper/page-mapper'
import { makePageRaw } from '_TEST/utils/factories/fetcher/make-page-raw'

_.mixin({ presentsContent: (template: string | null | undefined) => template ?? '' }, { chain: false })

let sut: PageMapper

describe('Services', () => {
  beforeEach(() => {
    sut = new PageMapper()
  })
  describe('Mapper', () => {
    describe('Page', () => {
      it('should be able map page data ', () => {
        const result = sut.toStore(
          makePageRaw({
            id: 'page-id',
            uid: 'about',
            data: {
              title: 'About Me',
              quote: 'Keep building',
              sub_title: 'Developer',
              description: [{ type: 'paragraph', text: 'Description text', spans: [] }],
              movie: { url: 'https://cdn/movie.mp4' },
            },
          }),
        )

        if (result.type !== 'about') throw new Error('Expected page type to be about')

        expect(result.id).toBe('page-id')
        expect(result.slug).toBe('about')
        expect(result.title).toBe('About\u00A0Me')
        expect(result.description).toBe('<p>Description text</p>')
        expect(result.movie).toBe('https://cdn/movie.mp4')
      })
      it('should be able map page config', () => {
        const pageRaw = makePageRaw({
          data: {
            body: [
              {
                primary: {
                  seo_url: '/about',
                  seo_title: 'About',
                  seo_description: 'About page description',
                  background_color: '#00FFAC',
                  og_type: 'website',
                  og_title: 'About OG Title',
                  og_description: 'About OG Description',
                  og_image: { url: 'https://cdn/og.jpg' },
                  twitter_card: 'summary_large_image',
                  twitter_title: 'About Twitter Title',
                  twitter_description: 'About Twitter Description',
                  twitter_image: { url: 'https://cdn/twitter.jpg' },
                },
              },
            ],
          },
        })
        const result = sut.config(pageRaw.data.body)

        expect(result.key).toBe('/about')
        expect(result.canonical).toBe('https://www.alexmadeira.com.br/about')
        expect(result.meta.seo.title).toBe('About')
        expect(result.meta.seo.description).toBe('About page description')
        expect(result.background).toBe('#00FFAC')

        expect(result.meta.openGraph.type).toBe('website')
        expect(result.meta.openGraph.title).toBe('About OG Title')
        expect(result.meta.openGraph.description).toBe('About OG Description')
        expect(result.meta.openGraph.image).toBe('https://cdn/og.jpg')

        expect(result.meta.twitter.card).toBe('summary_large_image')
        expect(result.meta.twitter.title).toBe('About Twitter Title')
        expect(result.meta.twitter.description).toBe('About Twitter Description')
        expect(result.meta.twitter.image).toBe('https://cdn/twitter.jpg')
      })
      it('should throw when page_config slice is missing', () => {
        expect(() => sut.config([])).toThrowError('Page config slice not found')
      })
    })
  })
})
