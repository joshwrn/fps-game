import { useEffect, useState } from 'react'

import { useFrame, useThree } from '@react-three/fiber'
import { useHotkeys } from 'react-hotkeys-hook'
import { create } from 'zustand'

export const useWeaponStore = create<{
  isShooting: boolean
  isReloading: boolean
  ammo: number
  toggleShoot: () => void
  shootBullet: () => void
  reload: () => void
}>((set) => ({
  isShooting: false,
  isReloading: false,
  ammo: 30,
  toggleShoot: () => set((state) => ({ isShooting: !state.isShooting })),
  shootBullet: () => set((state) => ({ ammo: state.ammo - 1 })),
  reload: () => set({ ammo: 30 }),
}))

export const useWeapon = (): void => {
  const { isShooting, shootBullet, ammo, reload } = useWeaponStore()
  const [lastShot, setLastShot] = useState(0)
  const clock = useThree((state) => state.clock)
  useHotkeys(`r`, reload)

  useFrame(() => {
    if (isShooting && ammo > 0) {
      if (lastShot + 0.1 < clock.getElapsedTime()) {
        setLastShot(clock.getElapsedTime())
        shootBullet()
      }
    }
  })
}
