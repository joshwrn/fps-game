import { useEffect, useState } from 'react'

import { Globals } from '@react-spring/three'
import { useFrame, useThree } from '@react-three/fiber'
import { useHotkeys } from 'react-hotkeys-hook'
import { create } from 'zustand'

Globals.assign({
  frameLoop: `always`,
})

export const useWeaponStore = create<{
  isShooting: boolean
  isReloading: boolean
  ammo: number
  toggleShoot: () => void
  shootBullet: () => void
  reload: () => void
  firingBullet: boolean
  toggleFiringBullet: (isFiring: boolean) => void
}>((set) => ({
  isShooting: false,
  isReloading: false,
  ammo: 30,
  toggleShoot: () => set((state) => ({ isShooting: !state.isShooting })),
  shootBullet: () => set((state) => ({ ammo: state.ammo - 1 })),
  reload: () => set({ ammo: 30 }),
  firingBullet: false,
  toggleFiringBullet: (isFiring: boolean) =>
    set(() => ({ firingBullet: isFiring })),
}))

export const useWeapon = (): void => {
  const { isShooting, shootBullet, ammo, reload, toggleFiringBullet } =
    useWeaponStore()
  const [lastShot, setLastShot] = useState(0)
  const clock = useThree((state) => state.clock)
  useHotkeys(`r`, reload)

  useFrame(() => {
    if (isShooting && ammo > 0) {
      if (lastShot + 0.1 < clock.getElapsedTime()) {
        setLastShot(clock.getElapsedTime())
        shootBullet()
        toggleFiringBullet(true)
      } else {
        toggleFiringBullet(false)
      }
    } else {
      toggleFiringBullet(false)
    }
  })
}
