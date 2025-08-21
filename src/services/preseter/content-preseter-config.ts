import { dayJS } from '_SRV/lib'

export const contentPreseterConfig = {
  date: {
    day: dayJS().format('DD'),
    year: dayJS().format('YYYY'),
    month: dayJS().format('MMMM'),
  },
}
