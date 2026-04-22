import { makeCompanyRaw } from '_TEST/utils/factories/fetcher/make-company-raw'
import { makeProjectRaw } from '_TEST/utils/factories/fetcher/make-project-raw'
import { makeTechnologyRaw } from '_TEST/utils/factories/fetcher/make-technology-raw'
import { makeProjectStoreData } from '_TEST/utils/factories/store-data/make-project-store-data'
import { ImageResizeMock } from '_TEST/utils/stubs/lib/image'
import { CompanyMapperMock } from '_TEST/utils/stubs/mapper/fake-company-mapper'
import { TechnologyMapperMock } from '_TEST/utils/stubs/mapper/fake-technology-mapper'
import _ from 'lodash'

import { ProjectMapper } from '_SRV/mapper/project-mapper'

_.mixin({ presentsContent: (template: string | null | undefined) => template ?? '' }, { chain: false })

let imageResize: ImageResizeMock
let companyMapper: CompanyMapperMock
let technologyMapper: TechnologyMapperMock

let sut: ProjectMapper

describe('Services', () => {
  beforeEach(() => {
    imageResize = new ImageResizeMock()
    companyMapper = new CompanyMapperMock()
    technologyMapper = new TechnologyMapperMock()
    sut = new ProjectMapper(imageResize, technologyMapper, companyMapper)
  })

  describe('Mapper', () => {
    describe('Project', () => {
      it('should map project data to store format', () => {
        const technology = makeTechnologyRaw({ data: { name: 'React' } })

        const result = sut.toStore(
          makeProjectRaw({
            id: 'project-id',
            uid: 'project-slug',
            data: {
              name: 'Project Name',
              role: 'Frontend',
              content: 'Main content',
              team_size: '2 - 10',
              logo_color: '#111111',
              highlight: true,
              thumbnail_color: '#EFEFEF',
              banner_name: 'Hero Banner',
              banner_class: 'banner-class',
              description: 'Project description',
              logo: { url: 'https://cdn/logo.png' },
              banner: { url: 'https://cdn/banner.png' },
              thumbnail: { url: 'https://cdn/thumb.png' },
              start_date: '2025-01-01',
              end_date: '2025-06-01',
              company: makeCompanyRaw({ id: 'company-id', uid: 'company-slug' }),
              technologies: [technology],
            },
          }),
        )

        expect(result.slug).toBe('project-slug')
        expect(result.company.slug).toBe('company-slug')
        expect(result.technologies[0].name).toBe('React')
      })
      it('should be able map company data related to the project.', () => {
        const result = sut.toStore(
          makeProjectRaw({
            data: { company: { id: 'company-single-id', uid: 'company-single-slug' } },
          }),
        )

        expect(companyMapper.toStore).toHaveBeenCalledWith(
          expect.objectContaining({ id: 'company-single-id', uid: 'company-single-slug' }),
        )
        expect(result.company.slug).toBe('company-single-slug')
      })
      it('should be able map technologies related to the project.', () => {
        const result = sut.toStore(
          makeProjectRaw({
            data: { technologies: [{ id: 'technology-id' }] },
          }),
        )
        expect(technologyMapper.toStore).toHaveBeenCalledWith(expect.objectContaining({ id: 'technology-id' }))
        expect(result.technologies[0].id).toBe('technology-id')
      })
      it('should be able map data to masonry format', () => {
        const result = sut.toMasonry(
          makeProjectStoreData({
            slug: 'project-slug',
            thumbnailClass: 'class-name',
            thumbnailColor: '#FFF',
          }),
        )

        expect(result).toMatchObject({
          className: 'class-name',
          link: '/project/project-slug',
          color: '#FFF',
          metaData: {
            slug: 'project-slug',
            thumbnailClass: 'class-name',
            thumbnailColor: '#FFF',
          },
        })
      })
      it('should throw error when project has no associated company', () => {
        const projectData = makeProjectRaw({ uid: 'project-without-company' })
        _.set(projectData, 'data.company', { link_type: 'Document' })

        expect(() => sut.toStore(projectData)).toThrowError(
          'Project project-without-company has no company associated.',
        )
      })
    })
  })
})
