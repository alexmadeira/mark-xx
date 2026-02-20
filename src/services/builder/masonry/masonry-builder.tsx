import type { TEMasonrySize } from '@/enums/masonry'
import type {
  TMasonryAvaliableGridSizes,
  TMasonryContent,
  TMasonryContentWrapperProps,
  TMasonryCurrentArea,
  TMasonryFitSizeProps,
  TMasonryProps,
  TMasonryRenderProps,
  TMasonrySetContentsProps,
  TMasonrySizeProps,
} from '@/services/builder/masonry'
import type { TMasonryGridSize } from '@/services/builder/masonry/masonry-size'

import { Link } from 'react-router-dom'

import { Slot } from '@radix-ui/react-slot'
import _ from 'lodash'
import potpack from 'potpack'
import { twMerge } from 'tailwind-merge'

import { DataList } from '_SRV/utils/data-list'

export class MasonryBuilder {
  private gridBuilt = false
  private contentsKey = ''
  private contents: TMasonryContent[] = []
  private currentArea: TMasonryCurrentArea = { maxArea: 0, items: 0, size: 0 }
  private avaliableGridSizes: TMasonryAvaliableGridSizes = {} as TMasonryAvaliableGridSizes

  private readonly grid = new DataList<TMasonryGridSize>()
  private readonly gridContents = new DataList<TMasonryContent>()

  constructor(private readonly props: TMasonryProps) {
    _.bindAll(this, ['render'])
  }

  private build() {
    this.buildPrepare()
    this.buildCurrentArea()
    this.buildAvaliableSizes()
    this.buildGrid()
    this.gridBuilt = true
  }

  private buildPrepare() {
    this.gridReset()
    this.avaliableGridSizes = {} as TMasonryAvaliableGridSizes
  }

  private gridReset() {
    this.grid.clear()
    this.gridContents.clear()
    this.currentArea.size = 0
    this.currentArea.items = 0
  }

  private buildGrid() {
    this.buildGridItems()
    this.buildGridContents()
  }

  private buildCurrentArea() {
    this.currentArea = { maxArea: this.maxArea, items: 0, size: 0 }
  }

  private buildAvaliableSizes() {
    this.sizes.forEach((item) => {
      _.set(this.avaliableGridSizes, this.size(item).key, _.cloneDeep(item))
    })
  }

  private buildGridItems() {
    if (this.required) {
      this.currentArea.items++
      this.currentArea.size += this.size(this.required).area
      this.grid.add(this.required)
    }

    while (!this.isFilled()) {
      const someSize = this.someAvailableSize()

      this.currentArea.items++
      this.currentArea.size += this.size(someSize).area
      this.decreaseLimit(this.size(someSize).key)
      this.grid.add(_.cloneDeep(someSize))
    }
    potpack(this.grid)
  }

  private buildGridContents() {
    if (!this.random) return this.gridContents.set(this.contents)
    return this.gridContents.set(_.shuffle(this.contents))
  }

  private isFilled() {
    if (this.maxArea) {
      return _.gte(this.currentArea.size, this.maxArea)
    }
    return _.gte(this.currentArea.items, this.contents.length)
  }

  private checkAvaliableSize(key: string) {
    const avaliableGridSizeKey = key as TEMasonrySize

    if (!this.avaliableGridSizes[avaliableGridSizeKey]) return true
    if (_.isUndefined(this.avaliableGridSizes[avaliableGridSizeKey].limit)) return true
    if (this.avaliableGridSizes[avaliableGridSizeKey].limit <= 0) return false

    return true
  }

  private takeAvaliableSize(key: string) {
    const avaliableGridSizeKey = key as TEMasonrySize

    if (!this.checkAvaliableSize(avaliableGridSizeKey)) return this.fill
    if (!this.avaliableGridSizes[avaliableGridSizeKey]) return this.fill

    return this.avaliableGridSizes[avaliableGridSizeKey]
  }

  private someAvailableSize() {
    const someKey = _.sample(_.keys(this.avaliableGridSizes))

    if (!someKey) return this.fill

    const avaliableSize = this.takeAvaliableSize(someKey)
    if (!this.fitSize(avaliableSize)) return this.fill

    return avaliableSize
  }

  private size(size: TMasonrySizeProps) {
    return {
      key: `${size.w}x${size.h}`,
      area: size.h * size.w,
    }
  }

  private fitSize(size: TMasonryFitSizeProps) {
    if (!this.maxArea) return true

    const probableTotalArea = this.currentArea.size + size.h * size.w
    if (_.lte(probableTotalArea, this.maxArea)) return true

    return false
  }

  private decreaseLimit(key: string) {
    const avaliableGridSizeKey = key as TEMasonrySize

    if (!this.avaliableGridSizes[avaliableGridSizeKey]) return
    if (!this.avaliableGridSizes[avaliableGridSizeKey].limit) return
    if (this.avaliableGridSizes[avaliableGridSizeKey].limit > 1) {
      return this.avaliableGridSizes[avaliableGridSizeKey].limit--
    }
    delete this.avaliableGridSizes[avaliableGridSizeKey]
  }

  private get maxArea() {
    return this.props.area || 0
  }

  private get name() {
    return this.props.name
  }

  private get fill() {
    return this.props.fill
  }

  private get sizes() {
    return _.cloneDeep(this.props.sizes)
  }

  private get required() {
    return this.props.required
  }

  private get random() {
    return this.props.random
  }

  private generateKey(contents: TMasonryContent[]) {
    return contents.map((c) => c.link ?? c.link ?? '').join('|')
  }

  private setContents(contents: TMasonrySetContentsProps) {
    if (!contents) return

    const newKey = this.generateKey(contents)
    if (this.contentsKey === newKey && this.gridBuilt) return

    this.contentsKey = newKey
    this.contents = contents

    this.build()
  }

  private contentWrapper(props: TMasonryContentWrapperProps) {
    const Wrapper = props.link ? Link : 'div'

    return (
      <Wrapper
        {...props}
        key={props.key}
        to={props.link || '#'}
        data-size={`${props.w}x${props.h}`}
        className={twMerge('group/masonry-item relative aspect-square sm:aspect-auto', props.className)}
      />
    )
  }

  public render({ contents, ...props }: TMasonryRenderProps) {
    if (contents && this.contents !== contents) this.setContents(contents)

    return (
      <div
        key={this.name}
        className={twMerge(
          'group/masonry grid h-full w-full flex-1 grid-flow-row-dense gap-4 px-[max(var(--spacing-safe-area-x),1rem)] py-4',
          'sm:auto-rows-[calc((100vw-1rem*11)/12)] sm:grid-cols-12',
          'lg:px-4',
        )}
      >
        {this.grid.slice(0, this.gridContents.length).map((size, i) => {
          return this.contentWrapper({
            ...size,
            key: `masonry-item-${i}`,
            link: this.gridContents[i].link,
            children: (
              <Slot
                {...props}
                {...this.gridContents[i].metaData}
                className={twMerge(this.gridContents[i].className, props.className)}
              />
            ),
          })
        })}
      </div>
    )
  }
}
