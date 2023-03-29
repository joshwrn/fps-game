import { useEffect, useState } from 'react'

import { Globals } from '@react-spring/three'
import { useFrame, useThree } from '@react-three/fiber'
import { useHotkeys } from 'react-hotkeys-hook'
import * as THREE from 'three'
import { create } from 'zustand'

import { randomNumber } from '@/utils/randomNumber'

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
  toggleShoot: () =>
    set((state) => ({ isShooting: state.ammo > 0 ? !state.isShooting : false })),
  shootBullet: () => set((state) => ({ ammo: state.ammo - 1 })),
  reload: () => set({ ammo: 30 }),
  firingBullet: false,
  toggleFiringBullet: (isFiring: boolean) =>
    set(() => ({ firingBullet: isFiring })),
}))

const vec = new THREE.Vector3()

export const useWeapon = (): void => {
  const {
    isShooting,
    shootBullet,
    firingBullet,
    ammo,
    reload,
    toggleFiringBullet,
    toggleShoot,
  } = useWeaponStore()
  const [lastShot, setLastShot] = useState(0)
  const clock = useThree((state) => state.clock)
  useHotkeys(`r`, reload)

  const { camera, mouse, controls } = useThree()

  useFrame(() => {
    // rotate camera up when shooting
    if (isShooting) {
      camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, 0.1, 0.1)
    } else {
      camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, 0, 0.1)
    }

    const readyToShoot = lastShot + 0.1 < clock.getElapsedTime()
    if (isShooting && ammo > 0) {
      if (readyToShoot) {
        setLastShot(clock.getElapsedTime())
        shootBullet()
        toggleFiringBullet(true)
      }
    }

    if (!isShooting || !readyToShoot) toggleFiringBullet(false)

    if (ammo === 0) {
      toggleShoot()
      toggleFiringBullet(false)
    }
  })
}
