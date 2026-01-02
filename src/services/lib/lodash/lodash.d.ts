import 'lodash'

declare module 'lodash' {
  interface LoDashStatic {
    presentsContent(template: string | null | undefined, view?: Record<string, unknown> | undefined): string
  }
}
