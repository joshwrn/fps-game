import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import { useWeaponStore } from '.'
import { randomNumber } from '@/utils/randomNumber'

const getMultiplier = (randomMultiplier: number): number => {
  if (randomMultiplier > 30) return 8
  if (randomMultiplier > 25) return 7
  if (randomMultiplier > 20) return 6
  if (randomMultiplier > 15) return 5
  if (randomMultiplier > 10) return 4
  if (randomMultiplier > 5) return 3
  return 2
}

export const useRecoil = (): void => {
  const { isShooting } = useWeaponStore()
  const { camera } = useThree()

  useFrame(() => {
    // vertical recoil
    const randomMultiplier = randomNumber(1, 30)
    const randomRecoil = randomNumber(1, getMultiplier(randomMultiplier))
    if (isShooting) {
      const recoilAngle = THREE.MathUtils.degToRad(0.5 * randomRecoil) // convert angle to radians
      const recoilAxis = new THREE.Vector3(1, 0, 0) // define rotation axis as y-axis
      const recoilQuaternion = new THREE.Quaternion().setFromAxisAngle(
        recoilAxis,
        recoilAngle,
      ) // create quaternion
      camera.quaternion.multiply(recoilQuaternion) // apply recoil quaternion to camera
    }
  })
}
