import type { TSoundSystemSoundMap } from '@/services/builder/sound'

export const interfaceSoundMap = {
  coin: {
    src: 'https://res.cloudinary.com/dgoi1pk8i/video/upload/v1771593717/super-mario-coin-sound_otcalt.mp3',
    volume: 0.5,
  },
  lifeUp: {
    src: 'https://res.cloudinary.com/dgoi1pk8i/video/upload/v1773356199/up_xbddxh.mp3',
    volume: 1,
  },

  toasty: {
    src: 'https://res.cloudinary.com/dgoi1pk8i/video/upload/v1771352342/toasty_gkzhgl.mp3',
    volume: 0.8,
  },
} satisfies TSoundSystemSoundMap
