import type { TDataTechnologies } from '@/services/content-data/technologies'

import { UsageDetail } from './usage-detail'

export function LanguageUsage() {
  const languages = {
    'react-js': { id: 'react-js', name: 'ReactJs', banner: '/img/children/03.jpg', usage: 25, color: '#00c7f8' },
    typescript: { id: 'typescript', name: 'TypeScript', banner: '/img/children/05.jpg', usage: 22, color: '#264ce4' },
    'next-js': { id: 'next-js', name: 'Next.js', banner: '/img/children/05.jpg', usage: 18, color: '#7b7b7b' },
    css: { id: 'css', name: 'CSS3', banner: '/img/children/05.jpg', usage: 16, color: '#4099e6' },
    javascript: { id: 'javascript', name: 'Javascript', banner: '/img/children/04.jpg', usage: 13, color: '#f7de1e' },
    html: { id: 'html', name: 'HTML5', banner: '/img/children/05.jpg', usage: 8, color: '#fc5c2f' },
    'node-js': { id: 'node-js', name: 'NodeJs', banner: '/img/children/05.jpg', usage: 3, color: '#5dad4c' },
  } as TDataTechnologies

  return (
    <ul className="flex w-full flex-wrap">
      {Object.entries(languages).map(([key, techology]) => (
        <UsageDetail key={key} techology={techology} />
      ))}
    </ul>
  )
}
