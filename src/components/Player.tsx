import { useRef } from 'react'

import type { SphereProps } from '@react-three/cannon'
import { useSphere } from '@react-three/cannon'
import type { Group, Mesh } from 'three'

import Flashlight from './Flashlight/Flashlight'
import { useUpdateFlashlightPosition } from '@/logic/flashlight/useUpdateFlashlightPostion'
import { useMovementControls } from '@/logic/movement/useMovementControls'
import { useUpdatePlayerPosition } from '@/logic/movement/useUpdatePlayerPosition'

export default function Player(props: SphereProps): JSX.Element {
  const flashlightRef = useRef<Group>(null)
  const [playerRef, playerApi] = useSphere<Mesh>(() => ({
    mass: 1,
    type: `Dynamic`,
    position: [0, 10, 0],
    args: [4],
    ...props,
  }))

  useMovementControls()
  useUpdatePlayerPosition({
    playerRef,
    playerApi,
  })
  useUpdateFlashlightPosition({
    flashlightRef,
  })

  return (
    <>
      <mesh ref={playerRef} />
      <group ref={flashlightRef}>
        <Flashlight
          position={[2, -1.8, -1.5]}
          rotation={[0, Math.PI / 2 + 0.1, 0]}
        />
      </group>
    </>
  )
}
