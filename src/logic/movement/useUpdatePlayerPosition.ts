import { useEffect, useRef } from 'react'

import type { PublicApi } from '@react-three/cannon'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Mesh } from 'three'
import { create } from 'zustand'

import { isSprinting, useMovementStore } from './useMovementControls'

const SPEED = 20
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const speed = new THREE.Vector3()

export const usePlayerSpeedStore = create<{
  playerSpeed: THREE.Vector3
  setPlayerSpeed: (playerSpeed: THREE.Vector3) => void
}>((set) => ({
  playerSpeed: new THREE.Vector3(),
  setPlayerSpeed: (playerSpeed: THREE.Vector3) => set({ playerSpeed }),
}))

export const useUpdatePlayerPosition = ({
  playerRef,
  playerApi,
}: {
  playerRef: React.RefObject<Mesh>
  playerApi: PublicApi
}): void => {
  const { forward, backward, left, right, jump } = useMovementStore((s) => s)
  const { camera } = useThree()

  const { setPlayerSpeed } = usePlayerSpeedStore((s) => s)
  const velocity = useRef([0, 0, 0])
  useEffect(
    () => playerApi.velocity.subscribe((v) => (velocity.current = v)),
    [],
  )
  useFrame(() => {
    playerRef.current?.getWorldPosition(camera.position)
    // move backward / forward
    frontVector.set(0, 0, Number(backward) - Number(forward))
    // move side to side
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED * (isSprinting() ? 2 : 1))
      .applyEuler(camera.rotation)
    speed.fromArray(velocity.current)

    // jump
    playerApi.velocity.set(direction.x, velocity.current[1], direction.z)
    if (jump && Math.abs(velocity.current[1]) <= 0) {
      playerApi.velocity.set(velocity.current[0], 15, velocity.current[2])
    }
    setPlayerSpeed(speed)
  })
}
