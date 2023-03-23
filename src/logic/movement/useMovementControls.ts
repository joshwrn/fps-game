import { useEffect } from 'react'

import { create } from 'zustand'

export type Movement = {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  jump: boolean
}
type MovementKeys = keyof Movement

const KEYS: { [key: string]: MovementKeys } = {
  KeyW: `forward`,
  KeyS: `backward`,
  KeyA: `left`,
  KeyD: `right`,
  Space: `jump`,
}
type Keys = keyof typeof KEYS

const moveFieldByKey = (key: Keys): MovementKeys => KEYS[key] as MovementKeys

const keyGuard = (e: KeyboardEvent): Keys | null => {
  if (Object.keys(KEYS).includes(e.code)) {
    return e.code as Keys
  }
  return null
}

export const useMovementStore = create<{
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  jump: boolean
  setMovement: (movement: Movement) => void
}>((set) => ({
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
  setMovement: (movement: Movement) => set(movement),
}))

export const useMovementControls = (): void => {
  const [movement, setMovement] = useMovementStore((s) => [s, s.setMovement])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const code = keyGuard(e)
      if (!code) return
      const key = moveFieldByKey(code)
      setMovement({ ...movement, [key]: true })
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      const code = keyGuard(e)
      if (!code) return
      const key = moveFieldByKey(code)
      setMovement({ ...movement, [key]: false })
    }
    document.addEventListener(`keydown`, handleKeyDown)
    document.addEventListener(`keyup`, handleKeyUp)
    return () => {
      document.removeEventListener(`keydown`, handleKeyDown)
      document.removeEventListener(`keyup`, handleKeyUp)
    }
  }, [])
}
