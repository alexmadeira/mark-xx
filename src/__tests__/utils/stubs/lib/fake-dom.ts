export type FakeDomRect = Partial<DOMRect>

export function makeFakeElement(rect: FakeDomRect): HTMLElement {
  return {
    getBoundingClientRect: vi.fn(() => ({
      bottom: rect.bottom ?? 0,
      height: rect.height ?? 0,
      left: rect.left ?? 0,
      right: rect.right ?? 0,
      top: rect.top ?? 0,
      width: rect.width ?? 0,
      x: rect.x ?? 0,
      y: rect.y ?? 0,
      toJSON: vi.fn(),
    })),
  } as unknown as HTMLElement
}

export function makeFakeMetaElement() {
  return {
    setAttribute: vi.fn(),
  }
}

export function stubDocumentElementStyle() {
  vi.stubGlobal('document', {
    documentElement: {
      style: {
        setProperty: vi.fn(),
      },
    },
  })
}

export function stubWindowListeners() {
  vi.stubGlobal('window', {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })
}
