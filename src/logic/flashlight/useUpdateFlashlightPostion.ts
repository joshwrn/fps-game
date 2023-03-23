import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'

import { isSprinting } from '../movement/useMovementControls'
import { randomNumber } from '@/utils/randomNumber'

const rotation = new THREE.Vector3()

export const useUpdateFlashlightPosition = ({
  flashlightRef,
  playerSpeed,
}: {
  flashlightRef: React.RefObject<Group>
  playerSpeed: THREE.Vector3
}): void => {
  const { camera } = useThree()
  useFrame((state) => {
    if (flashlightRef?.current?.children[0]) {
      // move flashlight
      const randomNumbers = isSprinting() ? [10, 20] : [25, 50]
      flashlightRef.current.children[0].rotation.x = THREE.MathUtils.lerp(
        flashlightRef.current.children[0].rotation.x,
        Math.sin(playerSpeed.length() * state.clock.elapsedTime * 10) /
          randomNumber(randomNumbers[0], randomNumbers[1]),
        0.1,
      )
      flashlightRef.current.rotation.copy(camera.rotation)
      flashlightRef.current.position
        .copy(camera.position)
        .add(camera.getWorldDirection(rotation).multiplyScalar(1))
    }
  })
}
