export interface ILoader<TRequestInstance> {
  addInstance: (instance: TRequestInstance) => void
}
