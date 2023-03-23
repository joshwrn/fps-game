import { useEffect, useRef } from 'react'

import type { PublicApi } from '@react-three/cannon'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group, Mesh } from 'three'

import { useMovementStore } from './useMovementControls'
import { randomNumber } from '@/utils/randomNumber'

const SPEED = 20
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const rotation = new THREE.Vector3()
const speed = new THREE.Vector3()

export const useFlashlightMovement = ({
  flashlightRef,
  playerRef,
  api,
}: {
  flashlightRef: React.RefObject<Group>
  playerRef: React.RefObject<Mesh>
  api: PublicApi
}): void => {
  const [movement] = useMovementStore((s) => [s])
  const { forward, backward, left, right, jump } = movement
  const { camera } = useThree()
  const velocity = useRef([0, 0, 0])
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [])
  useFrame((state) => {
    playerRef.current?.getWorldPosition(camera.position)
    // move backward / forward
    frontVector.set(0, 0, Number(backward) - Number(forward))
    // move side to side
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)
    speed.fromArray(velocity.current)

    if (flashlightRef?.current?.children[0]) {
      // move flashlight
      flashlightRef.current.children[0].rotation.x = THREE.MathUtils.lerp(
        flashlightRef.current.children[0].rotation.x,
        Math.sin(speed.length() * state.clock.elapsedTime * 10) /
          randomNumber(25, 50),
        0.1,
      )
      flashlightRef.current.rotation.copy(camera.rotation)
      flashlightRef.current.position
        .copy(camera.position)
        .add(camera.getWorldDirection(rotation).multiplyScalar(1))
    }

    // jump
    api.velocity.set(direction.x, velocity.current[1], direction.z)
    if (jump && Math.abs(velocity.current[1]) <= 0) {
      api.velocity.set(velocity.current[0], 15, velocity.current[2])
    }
  })
}
