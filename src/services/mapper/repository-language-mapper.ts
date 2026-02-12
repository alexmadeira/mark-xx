import type { TRawSchemaGithubRepositoryLanguages } from '@/services/schema/github-repository-language'
import type { TStoreFetcherRepositoryLanguage } from '@/services/store/fetcher-repository-languages'

import _ from 'lodash'

export class RepositoryLanguageMapper {
  public static toStore(
    raw: TRawSchemaGithubRepositoryLanguages,
    libraries: Record<string, string>,
  ): TStoreFetcherRepositoryLanguage[] {
    const withLibraries = RepositoryLanguageMapper.assignPackages(raw, libraries)
    return _.chain(withLibraries)
      .map((libs, language) => {
        const libList = _.map(libs, (usage, libName) => ({ id: _.toLower(libName), name: libName, usage }))
        return {
          id: _.toLower(language),
          name: language,
          usage: _.sumBy(libList, 'usage'),
          libs: libList,
        }
      })
      .value()
  }

  public static assignPackages(
    raw: TRawSchemaGithubRepositoryLanguages,
    packages: Record<string, string>,
  ): Record<string, Record<string, number>> {
    const result = {}

    const others = _.omit(raw, ['HTML', 'CSS', 'TypeScript', 'JavaScript', 'SCSS'])
    const htmlCss = _.sum([raw.HTML, raw.CSS, raw.SCSS])
    const javascriptTypescript = _.add(raw.TypeScript, raw.JavaScript)

    if (_.has(packages, 'tailwindcss')) _.set(result, ['HTML/CSS', 'Tailwind'], htmlCss)
    if (_.has(raw, 'SCSS')) _.set(result, ['HTML/CSS', 'Sass'], htmlCss)

    if (_.has(packages, 'zod')) _.set(result, ['JavaScript/TypeScript', 'Zod'], javascriptTypescript * 0.8)
    if (_.has(packages, 'vite')) _.set(result, ['JavaScript/TypeScript', 'ViteJs'], javascriptTypescript)
    if (_.has(packages, 'next')) _.set(result, ['JavaScript/TypeScript', 'NextJs'], javascriptTypescript)
    if (_.has(packages, 'react')) _.set(result, ['JavaScript/TypeScript', 'ReactJs'], javascriptTypescript)
    if (_.has(packages, 'zustand')) _.set(result, ['JavaScript/TypeScript', 'Zustand'], javascriptTypescript * 0.4)

    if (!_.isEmpty(others)) _.set(result, ['Outros'], others)

    return result
  }
}
