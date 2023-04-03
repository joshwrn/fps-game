import { useEffect } from 'react'

import { useFrame, useThree } from '@react-three/fiber'
import useSound from 'use-sound'

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
    isFiringBullet,
  } = useWeaponStore()
  const { setBulletsFired, bulletsFired } = useRecoilStore()
  const { reload } = useReload()
  const [play] = useSound(`/sounds/weapon/shot.wav`, {
    volume: 0.8 + bulletsFired * 0.01,
    playbackRate: 1 + bulletsFired * 0.001,
  })

  useEffect(() => {
    if (isFiringBullet) {
      play()
    }
  }, [isFiringBullet])

  useEffect(() => {
    if (ammo === 0 || isReloading) {
      setIsShooting(false)
      setIsFiringBullet(false)
    }
    if (ammo === 0 && !isReloading) {
      reload()
    }
  }, [ammo, isReloading])

  useEffect(() => {
    if (!isShooting) {
      setBulletsFired(() => 0)
    }
  }, [isShooting])

  useFrame(() => {
    // need to do this independent of frame rate
    const currentTime = new Date().getTime() / 1000
    const readyToShoot = lastShotAt + 0.11 < currentTime

    if (isShooting && ammo > 0 && readyToShoot && !isFiringBullet) {
      setLastShotAt(currentTime)
      shootBullet()
      setIsFiringBullet(true)
      setBulletsFired((prev) => prev + 1)
    }

    if (!isShooting || !readyToShoot) {
      setIsFiringBullet(false)
    }
  })
}
