import type { TSchemaPageConfig } from '@/services/schema/page'
import type { TStorePageConfigsData } from '@/services/store/page-configs'

export class FakePageConfigsStore {
  public readonly data: TStorePageConfigsData

  private readonly setPageConfigSpy: ReturnType<typeof vi.fn>
  private readonly setStatusSpy: ReturnType<typeof vi.fn>

  constructor(props: Partial<TStorePageConfigsData> = {}) {
    this.data = {
      list: props.list || {},
      status: props.status || 'idle',
    }

    this.setPageConfigSpy = vi.fn(this.setPageConfig.bind(this))
    this.setStatusSpy = vi.fn(this.setStatus.bind(this))
  }

  private setStatus(status: TStorePageConfigsData['status']) {
    this.data.status = status
  }

  private setPageConfig(config: TSchemaPageConfig) {
    this.data.list[config.key] = config
  }

  public get actions() {
    return {
      setPageConfig: this.setPageConfigSpy,
      setStatus: this.setStatusSpy,
    }
  }
}
