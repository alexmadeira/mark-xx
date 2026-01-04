import { dayJS } from '_SRV/lib'

export const defaultContentView = {
  my: {
    name: 'Alex Madeira',
    epithet: {
      full: 'Frontend Developer & Tech Lead',
      short: 'Frontend & Tech Lead',
    },
    start: {
      date: dayJS('2009-06-01').format('DD/MM/YYYY'),
      month: dayJS('2009-06-01').format('MM'),
      year: dayJS('2009-06-01').format('YYYY'),
    },
  },
  date: {
    day: dayJS().format('DD'),
    year: dayJS().format('YYYY'),
    month: dayJS().format('MMMM'),
  },
  yearsOfWork: dayJS('2009-01-01').toNow(true),
}
