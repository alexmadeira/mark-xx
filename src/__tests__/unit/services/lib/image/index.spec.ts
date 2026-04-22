import { imageCloudinary } from '_SRV/lib/image'

describe('Services', () => {
  describe('Lib', () => {
    describe('Image', () => {
      describe('Index', () => {
        it('should return a singleton cloudinary image instance', () => {
          const output = imageCloudinary()
          const secondOutput = imageCloudinary()

          expect(output).toBe(secondOutput)
        })

        it('should resize using the cloudinary configured sizes', () => {
          const result = imageCloudinary().resize('https://res.cloudinary.com/demo/image/upload/v123/folder/banner.png')

          expect(result).toEqual({
            blur: 'https://res.cloudinary.com/demo/image/upload/v123/c_scale,w_10/folder/banner.png',
            original: 'https://res.cloudinary.com/demo/image/upload/v123/c_scale,w_iw,h_ih/folder/banner.png',
          })
        })
      })
    })
  })
})
