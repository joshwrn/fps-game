import { useState } from 'react'

import { useFrame, useThree } from '@react-three/fiber'

import { useWeaponStore } from '.'

export const useFireBullet = (): void => {
  const {
    isShooting,
    shootBullet,
    ammo,
    setIsFiringBullet,
    setIsShooting,
    isReloading,
  } = useWeaponStore()
  const [lastShot, setLastShot] = useState(0)
  const clock = useThree((state) => state.clock)

  useFrame(() => {
    const readyToShoot = lastShot + 0.1 < clock.getElapsedTime()

    if (isShooting && ammo > 0) {
      if (readyToShoot) {
        setLastShot(clock.getElapsedTime())
        shootBullet()
        setIsFiringBullet(true)
      }
    }

    if (!isShooting || !readyToShoot) setIsFiringBullet(false)

    if (ammo === 0 || isReloading) {
      setIsShooting(false)
      setIsFiringBullet(false)
    }
  })
}
