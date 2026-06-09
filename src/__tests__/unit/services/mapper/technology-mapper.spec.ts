import { TechnologyMapper } from '_SRV/mapper/technology-mapper'
import { makeTechnologyRaw } from '_TEST/utils/factories/fetcher/make-technology-raw'
import { ImageResizeMock } from '_TEST/utils/stubs/lib/image'

let imageResize: ImageResizeMock
let sut: TechnologyMapper

describe('Services', () => {
  beforeEach(() => {
    imageResize = new ImageResizeMock()
    sut = new TechnologyMapper(imageResize)
  })
  describe('Mapper', () => {
    describe('Technology', () => {
      it('should map technology and resize banner image', () => {
        const result = sut.toStore(
          makeTechnologyRaw({
            id: 'tech-id',
            data: {
              name: 'TypeScript',
              type: 'language',
              color: '#3178C6',
              banner: { url: 'https://cdn/banner.png' },
            },
          }),
        )

        expect(imageResize.resize).toHaveBeenCalledWith('https://cdn/banner.png')

        expect(result.id).toEqual('tech-id')
        expect(result.name).toEqual('TypeScript')
        expect(result.type).toEqual('language')
        expect(result.color).toEqual('#3178C6')
        expect(result.banner).toMatchObject({
          blur: 'blur:resized:https://cdn/banner.png',
          card: 'card:resized:https://cdn/banner.png',
          original: 'original:resized:https://cdn/banner.png',
        })
      })
    })
  })
})
