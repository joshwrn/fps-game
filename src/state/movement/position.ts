import { useEffect, useRef } from 'react'

import { Globals } from '@react-spring/three'
import type { PublicApi } from '@react-three/cannon'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Mesh } from 'three'
import { create } from 'zustand'

import { isSprinting, useMovementStore } from './controls'
import { useObjectStore, usePointerControlsStore } from '@/components/Scene'

const SPEED = 20
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const speed = new THREE.Vector3()

const raycaster = new THREE.Raycaster(
  new THREE.Vector3(),
  new THREE.Vector3(0, -1, 0),
  0,
  10,
)

Globals.assign({
  frameLoop: `always`,
})

export const usePlayerSpeedStore = create<{
  playerSpeed: THREE.Vector3
  setPlayerSpeed: (playerSpeed: THREE.Vector3) => void
  isJumping: boolean
  setIsJumping: (isJumping: boolean) => void
}>((set) => ({
  playerSpeed: new THREE.Vector3(),
  setPlayerSpeed: (playerSpeed: THREE.Vector3) => set({ playerSpeed }),
  isJumping: false,
  setIsJumping: (isJumping: boolean) => set({ isJumping }),
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
  const { objects } = useObjectStore((s) => ({
    objects: s.objects,
  }))
  const { setPlayerSpeed } = usePlayerSpeedStore((s) => ({
    setPlayerSpeed: s.setPlayerSpeed,
  }))
  const velocity = useRef([0, 0, 0])
  useEffect(() => {
    playerApi.velocity.subscribe((v) => (velocity.current = v))
  }, [])

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
    playerApi.velocity.set(direction.x, velocity.current[1], direction.z)

    // jump
    raycaster.ray.origin.copy(
      playerRef.current?.getWorldPosition(new THREE.Vector3()) ??
        new THREE.Vector3(),
    )
    raycaster.ray.origin.y += 6
    const intersections = raycaster.intersectObjects(objects, false)
    const onObject = intersections.length > 0
    if (jump && onObject) {
      playerApi.velocity.set(velocity.current[0], 15, velocity.current[2])
    }
    setPlayerSpeed(speed)
  })
}
