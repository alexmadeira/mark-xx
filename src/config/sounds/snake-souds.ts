import type { TSoundSystemSoundMap } from '@/services/builder/sound'

export const gameSoundMap = {
  eat: {
    src: 'https://res.cloudinary.com/dgoi1pk8i/video/upload/v1773317838/eat_allljx.mp3',
    volume: 0.8,
  },

  music: {
    src: 'https://res.cloudinary.com/dgoi1pk8i/video/upload/v1773317856/bg-music_dfmbah.mp3',
    loop: true,
    volume: 0.4,
  },
} satisfies TSoundSystemSoundMap
