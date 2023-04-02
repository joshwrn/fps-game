import { useState } from 'react'

import { useFrame, useThree } from '@react-three/fiber'

import { useWeaponStore } from '.'
import { useRecoilStore } from './recoil'
import { useReload } from './reload'

export const useFireBullet = (): void => {
  const {
    isShooting,
    shootBullet,
    ammo,
    setIsFiringBullet,
    setIsShooting,
    isReloading,
    lastShotAt,
    setLastShotAt,
  } = useWeaponStore()
  const { setBulletsFired } = useRecoilStore()
  const { reload } = useReload()
  const clock = useThree((state) => state.clock)

  useFrame(() => {
    const readyToShoot = lastShotAt + 0.1 < clock.getElapsedTime()

    // console.log(lastShotAt, clock.getElapsedTime(), readyToShoot)

    if (isShooting && ammo > 0 && readyToShoot) {
      setLastShotAt(clock.getElapsedTime())
      shootBullet()
      setIsFiringBullet(true)
      setBulletsFired((prev) => prev + 1)
    }

    if (!isShooting || !readyToShoot) {
      setIsFiringBullet(false)
    }

    if (!isShooting) {
      setBulletsFired(() => 0)
    }

    if (ammo === 0 || isReloading) {
      setIsShooting(false)
      setIsFiringBullet(false)
    }

    if (ammo === 0) {
      reload()
    }
  })
}
