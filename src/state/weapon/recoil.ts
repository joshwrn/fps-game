import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { create } from 'zustand'

import { useWeaponStore } from '.'
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
  const { isShooting } = useWeaponStore((s) => ({
    isShooting: s.isShooting,
  }))
  const { bulletsFired } = useRecoilStore((s) => ({
    bulletsFired: s.bulletsFired,
    setBulletsFired: s.setBulletsFired,
  }))
  const { camera } = useThree()

  useFrame(() => {
    if (isShooting) {
      // horizontal recoil
      const quat = new THREE.Quaternion()
      const recoilAngle = getRecoilPattern(bulletsFired, `x`)
      quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), recoilAngle)
      camera.quaternion.multiplyQuaternions(quat, camera.quaternion)
    }

    if (isShooting) {
      // vertical recoil
      const recoilAngle = getRecoilPattern(bulletsFired, `y`)
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
