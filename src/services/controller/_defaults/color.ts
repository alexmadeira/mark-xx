import type { TColorProps } from '@/services/controller/color'

export const defaultLogoColorProps = {
  dark: '--color-black',
  light: '--color-white',
  default: 'dark',
  variations: ['#5097e4', '#7b7b7b', '#00ca38', '#fc5c2f', '#4099e6', '#f7de1e', '#264ce4', '#00c7f8', '#5dad4c'],
} satisfies TColorProps

export const defaultNavigationColorProps = {
  dark: '--color-black',
  light: '--color-white',
  default: 'dark',
} satisfies TColorProps

export const defaultHeroColorProps = {
  dark: '--color-zinc-900',
  light: '--color-zinc-200',
  default: 'light',
} satisfies TColorProps

export const defaultTextColorProps = {
  dark: '--color-zinc-700',
  light: '--color-zinc-200',
  default: 'dark',
} satisfies TColorProps
