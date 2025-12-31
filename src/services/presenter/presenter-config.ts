import { dayJS } from '_SRV/lib'

export const defaultContentView = {
  date: {
    day: dayJS().format('DD'),
    year: dayJS().format('YYYY'),
    month: dayJS().format('MMMM'),
  },
  yearsOfWork: dayJS('2009-01-01').toNow(true),
}
