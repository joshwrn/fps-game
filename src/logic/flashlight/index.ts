import { useHotkeys } from 'react-hotkeys-hook'
import { create } from 'zustand'

export const useFlashlightStore = create<{
  isOn: boolean
  toggle: () => void
}>((set) => ({
  isOn: true,
  toggle: () => set((state) => ({ isOn: !state.isOn })),
}))

export const useFlashlightControls = (): void => {
  const [toggle] = useFlashlightStore((s) => [s.toggle])
  useHotkeys(`f`, () => {
    toggle()
  })
}
