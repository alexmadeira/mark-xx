import { vi } from 'vitest'

export function fakeRequesterApi() {
  return {
    query: vi.fn(),
  }
}

export type TFakeRequesterApi = ReturnType<typeof fakeRequesterApi>
