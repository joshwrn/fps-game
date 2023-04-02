import { Globals } from '@react-spring/three'
import { create } from 'zustand'

import { useFireBullet } from './fireBullet'
import { useRecoil } from './recoil'
import { useReloadControls } from './reload'

Globals.assign({
  frameLoop: `always`,
})

export const useWeaponStore = create<{
  isShooting: boolean
  isReloading: boolean
  ammo: number
  setIsShooting: (isShooting: boolean) => void
  shootBullet: () => void
  reload: () => void
  isFiringBullet: boolean
  setIsFiringBullet: (isFiring: boolean) => void
  setIsReloading: (isReloading: boolean) => void
  lastShotAt: number
  setLastShotAt: (lastShotAt: number) => void
}>((set) => ({
  isShooting: false,
  isReloading: false,
  lastShotAt: 0,
  setLastShotAt: (lastShotAt: number) => set(() => ({ lastShotAt })),
  ammo: 30,
  setIsShooting: (isShooting: boolean) =>
    set((state) => ({
      isShooting: state.ammo > 0 ? isShooting : false,
    })),
  shootBullet: () => set((state) => ({ ammo: state.ammo - 1 })),
  reload: () => set({ ammo: 30 }),
  isFiringBullet: false,
  setIsReloading: (isReloading: boolean) => set(() => ({ isReloading })),
  setIsFiringBullet: (isFiring: boolean) =>
    set(() => ({ isFiringBullet: isFiring })),
}))

export const useWeapon = (): void => {
  useFireBullet()
  useRecoil()
  useReloadControls()
}
