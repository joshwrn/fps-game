import { useEffect, useRef, useState } from 'react'

import type { PublicApi, SphereProps } from '@react-three/cannon'
import { useSphere } from '@react-three/cannon'
import type { MeshProps } from '@react-three/fiber'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Mesh } from 'three'

import Flashlight from './Flashlight/Flashlight'
import { randomNumber } from '../utils/randomNumber'

const SPEED = 20
const KEYS = {
  KeyW: `forward`,
  KeyS: `backward`,
  KeyA: `left`,
  KeyD: `right`,
  Space: `jump`,
}
type Keys = keyof typeof KEYS
const moveFieldByKey = (key: Keys) => KEYS[key]
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const rotation = new THREE.Vector3()
const speed = new THREE.Vector3()

const keyGuard = (e: KeyboardEvent): Keys | null => {
  if (Object.keys(KEYS).includes(e.code)) {
    return e.code as Keys
  }
  return null
}

const usePlayerControls = ({
  flashLightRef,
  ref,
  api,
}: {
  flashLightRef: React.RefObject<Mesh>
  ref: React.RefObject<Mesh>
  api: PublicApi
}) => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  })
  const { forward, backward, left, right, jump } = movement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const code = keyGuard(e)
      if (!code) return
      setMovement((m) => ({ ...m, [moveFieldByKey(code)]: true }))
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      const code = keyGuard(e)
      if (!code) return
      setMovement((m) => ({ ...m, [moveFieldByKey(code)]: false }))
    }
    document.addEventListener(`keydown`, handleKeyDown)
    document.addEventListener(`keyup`, handleKeyUp)
    return () => {
      document.removeEventListener(`keydown`, handleKeyDown)
      document.removeEventListener(`keyup`, handleKeyUp)
    }
  }, [])
  const { camera } = useThree()
  const velocity = useRef([0, 0, 0])
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [])
  useFrame((state) => {
    ref.current?.getWorldPosition(camera.position)
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

    // // move flashlight
    // flashLightRef.current.children[0].rotation.x = THREE.MathUtils.lerp(
    //   flashLightRef.current.children[0].rotation.x,
    //   Math.sin((1 < speed.length()) * state.clock.elapsedTime * 10) /
    //     randomNumber(25, 50),
    //   0.1,
    // )
    // flashLightRef.current.rotation.copy(camera.rotation)
    // flashLightRef.current.position
    //   .copy(camera.position)
    //   .add(camera.getWorldDirection(rotation).multiplyScalar(1))

    // jump
    api.velocity.set(direction.x, velocity.current[1], direction.z)
    if (jump && Math.abs(velocity.current[1]) <= 0) {
      api.velocity.set(velocity.current[0], 15, velocity.current[2])
    }
  })
}

export default function Player(props: SphereProps): JSX.Element {
  const flashLightRef = useRef<Mesh>(null)
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 1,
    type: `Dynamic`,
    position: [0, 10, 0],
    args: [4],
    ...props,
  }))
  usePlayerControls({ flashLightRef, ref, api })
  const [isLightOn, setIsLightOn] = useState(false)

  // const handleLight = () => {
  //   flashLightRef.current.children[0].rotation.x = -0.05
  //   setIsLightOn(!isLightOn)
  // }
  return (
    <>
      <mesh ref={ref} />
    </>
  )
}
