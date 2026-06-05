export const fakeMotion = {
  animate: vi.fn((_motionValue: unknown, value: string, options: { onUpdate?: (value: string) => void }) => {
    options.onUpdate?.(value)
  }),
  motionValue: vi.fn((value: string) => ({ value })),
}
