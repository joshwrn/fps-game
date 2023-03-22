import { useEffect, useRef, useState } from 'react'

import { useSphere } from '@react-three/cannon'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import Flashlight from './Flashlight/Flashlight'
import { randomNumber } from '../utils/randomNumber'

const SPEED = 20
const keys = {
  KeyW: `forward`,
  KeyS: `backward`,
  KeyA: `left`,
  KeyD: `right`,
  Space: `jump`,
}
const moveFieldByKey = (key) => keys[key]
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const rotation = new THREE.Vector3()
const speed = new THREE.Vector3()

const usePlayerControls = ({ flashLightRef, ref, api }) => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  })
  const { forward, backward, left, right, jump } = movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }))
    }
    const handleKeyUp = (e) => {
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }))
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
    ref.current.getWorldPosition(camera.position)
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

    // move flashlight
    flashLightRef.current.children[0].rotation.x = THREE.MathUtils.lerp(
      flashLightRef.current.children[0].rotation.x,
      Math.sin((1 < speed.length()) * state.clock.elapsedTime * 10) /
        randomNumber(25, 50),
      0.1,
    )
    flashLightRef.current.rotation.copy(camera.rotation)
    flashLightRef.current.position
      .copy(camera.position)
      .add(camera.getWorldDirection(rotation).multiplyScalar(1))

    // jump
    api.velocity.set(direction.x, velocity.current[1], direction.z)
    if (jump && Math.abs(velocity.current[1].toFixed(2)) <= 0) {
      api.velocity.set(velocity.current[0], 15, velocity.current[2])
    }
  })
}

export default function Player(props) {
  const flashLightRef = useRef()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: `Dynamic`,
    position: [0, 10, 0],
    args: [4, 1, 1],
    ...props,
  }))
  usePlayerControls({ flashLightRef, ref, api })
  const [isLightOn, setIsLightOn] = useState(false)

  const handleLight = () => {
    flashLightRef.current.children[0].rotation.x = -0.05
    setIsLightOn(!isLightOn)
  }
  return (
    <>
      <mesh ref={ref} />
      <group ref={flashLightRef} onPointerMissed={handleLight}>
        <Flashlight
          isLightOn={isLightOn}
          position={[2, -1.8, -1.5]}
          rotation={[0, Math.PI / 2 + 0.1, 0]}
        />
      </group>
    </>
  )
}
