import type { TColorProps } from '@/services/controller/color'

const defaultLogoColorProps = {
  dark: '--color-black',
  light: '--color-white',
  default: '--color-white',
  variations: ['#5097e4', '#7b7b7b', '#00ca38', '#fc5c2f', '#4099e6', '#f7de1e', '#264ce4', '#00c7f8', '#5dad4c'],
  transition: { duration: 0.5 },
} satisfies TColorProps

const defaultNavigationColorProps = {
  dark: '--color-black',
  light: '--color-white',
  default: '--color-white',
  transition: { duration: 0.5 },
} satisfies TColorProps

const defaultHeroColorProps = {
  dark: '--color-zinc-900',
  light: '--color-zinc-200',
  default: '--color-zinc-900',
  transition: { duration: 0.5 },
} satisfies TColorProps

const defaultTextColorProps = {
  dark: '--color-zinc-900',
  light: '--color-zinc-200',
  default: '--color-white',
  transition: { duration: 0.5 },
} satisfies TColorProps

const defaultPageColorProps = {
  dark: '--color-zinc-900',
  light: '--color-zinc-200',
  default: '--color-white',
  transition: { duration: 0.5 },
} satisfies TColorProps

export const defaultColorProps = {
  logo: defaultLogoColorProps,
  hero: defaultHeroColorProps,
  text: defaultTextColorProps,
  page: defaultPageColorProps,
  navigation: defaultNavigationColorProps,
}
