import { Globals } from '@react-spring/three'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'

import { isSprinting } from '../movement/controls'
import { usePlayerSpeedStore } from '../movement/position'
import { randomNumber } from '@/utils/randomNumber'

const rotation = new THREE.Vector3()

Globals.assign({
  frameLoop: `always`,
})

export const useUpdateFlashlightPosition = ({
  flashlightRef,
}: {
  flashlightRef: React.RefObject<Group>
}): void => {
  const { camera } = useThree()
  const { playerSpeed } = usePlayerSpeedStore((s) => s)
  useFrame((state) => {
    if (flashlightRef?.current?.children[0]) {
      // move flashlight
      flashlightRef.current.children[0].rotation.x = THREE.MathUtils.lerp(
        flashlightRef.current.children[0].rotation.x,
        Math.sin((playerSpeed.length() / 2) * state.clock.elapsedTime) * 0.1,
        0.01,
      )
      flashlightRef.current.rotation.copy(camera.rotation)
      flashlightRef.current.position
        .copy(camera.position)
        .add(camera.getWorldDirection(rotation).multiplyScalar(1))
    }
  })
}
