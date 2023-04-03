import { useState } from 'react'

import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { create } from 'zustand'

import { useWeaponStore } from '.'
import { usePlayerSpeedStore } from '../movement/position'
import { randomNumber } from '@/utils/randomNumber'

export const useRecoilStore = create<{
  bulletsFired: number
  setBulletsFired: (fn: (prev: number) => number) => void
}>((set) => ({
  bulletsFired: 0,
  setBulletsFired: (fn: (prev: number) => number) =>
    set((prev) => ({ bulletsFired: fn(prev.bulletsFired) })),
}))

export const useRecoil = (): void => {
  const { isShooting, lastShotAt } = useWeaponStore((s) => ({
    isShooting: s.isShooting,
    lastShotAt: s.lastShotAt,
  }))
  const { bulletsFired } = useRecoilStore((s) => ({
    bulletsFired: s.bulletsFired,
  }))
  const { camera } = useThree()

  const [bulletsFiredBeforeStop, setBulletsFiredBeforeStop] = useState(0)

  useFrame(() => {
    // is applying more recoil based on framerate
    // TODO: fix this
    // double fps = recoil is called 2x as much
    if (isShooting) {
      // horizontal recoil
      const recoilAngle = getRecoilPattern(bulletsFired, `x`) * 0.5
      const recoilAxis = new THREE.Vector3(0, 1, 0)
      const recoilQuaternion = new THREE.Quaternion().setFromAxisAngle(
        recoilAxis,
        recoilAngle,
      )
      camera.quaternion.multiplyQuaternions(recoilQuaternion, camera.quaternion)
    }

    if (isShooting) {
      // vertical recoil
      const recoilAngle = getRecoilPattern(bulletsFired, `y`) * 0.1
      const recoilAxis = new THREE.Vector3(1, 0, 0)
      const recoilQuaternion = new THREE.Quaternion().setFromAxisAngle(
        recoilAxis,
        recoilAngle,
      )
      camera.quaternion.multiply(recoilQuaternion)

      setBulletsFiredBeforeStop(bulletsFired)
    }

    const currentTime = new Date().getTime() / 1000
    if (
      !isShooting &&
      bulletsFiredBeforeStop > 0 &&
      lastShotAt + 0.1 < currentTime &&
      lastShotAt + 2 > currentTime
    ) {
      // reset recoil
      const random = randomNumber(-0.00004, -1)
      const amplitude =
        random * bulletsFiredBeforeStop * (2 - (currentTime - lastShotAt)) ** 4
      const recoilAngle = amplitude
      // Math.cos((clock.getElapsedTime() - lastShotAt) * 10) * amplitude

      const recoilAxis = new THREE.Vector3(1, 0, 0)
      const recoilQuaternion = new THREE.Quaternion().setFromAxisAngle(
        recoilAxis,
        recoilAngle,
      )
      camera.quaternion.multiply(recoilQuaternion)
    }
  })
}

const getRecoilPattern = (bulletsFired: number, axis: `x` | `y`): number => {
  if (bulletsFired >= recoilPattern.length) {
    return 0
  }
  const randomMultiplier = {
    x: randomNumber(0.15, 0.2),
    y: randomNumber(0.45, 0.55),
  }
  const amount = recoilPattern[bulletsFired][axis]
  const recoilAngle = THREE.MathUtils.degToRad(randomMultiplier[axis] * amount)
  return recoilAngle
}

// recoil pattern for 30 bullets
const recoilPattern = [
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
  { x: 0, y: 4 },
  { x: 0, y: 2 },
  { x: -1, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 3 },
  { x: -1, y: 4 },
  { x: -1, y: 2 },
  { x: 0, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 3 },
  { x: -1, y: 4 },
  { x: -1, y: 2 },
  { x: 0, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 3 },
  { x: -1, y: 4 },
  { x: -1, y: 2 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 3 },
  { x: 1, y: 4 },
  { x: 1, y: 2 },
  { x: 1, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 3 },
  { x: 1, y: 4 },
  { x: 1, y: 2 },
]
