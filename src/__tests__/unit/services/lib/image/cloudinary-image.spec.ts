import { CloudinaryImage } from '_SRV/lib/image/cloudinary-image'

const imageSizes = {
  blur: { width: 10 },
  card: { width: 320, height: 180 },
  original: { width: 'iw', height: 'ih' },
}

let sut: CloudinaryImage<typeof imageSizes>

describe('Services', () => {
  beforeEach(() => {
    sut = new CloudinaryImage(imageSizes)
  })
  describe('Lib', () => {
    describe('Image', () => {
      describe('CloudinaryImage', () => {
        it('should build resized urls for every configured size', () => {
          const result = sut.resize('https://res.cloudinary.com/demo/image/upload/v123/folder/banner.png')

          expect(result).toEqual({
            blur: 'https://res.cloudinary.com/demo/image/upload/v123/c_scale,w_10/folder/banner.png',
            card: 'https://res.cloudinary.com/demo/image/upload/v123/c_scale,w_320,h_180/folder/banner.png',
            original: 'https://res.cloudinary.com/demo/image/upload/v123/c_scale,w_iw,h_ih/folder/banner.png',
          })
        })

        it('should return nullish entries when image url is not provided', () => {
          const result = sut.resize()

          expect(result.blur).toBeUndefined()
          expect(result.card).toBeUndefined()
          expect(result.original).toBeUndefined()
        })
      })
    })
  })
})
