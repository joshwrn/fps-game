import { useRef } from 'react'

import type { SphereProps } from '@react-three/cannon'
import { useSphere } from '@react-three/cannon'
import type { Group, Mesh } from 'three'

import Flashlight from './Flashlight/Flashlight'
import { Flash } from './Weapon/Flash'
import { WeaponModel } from './Weapon/WeaponModel'
import { Weapon } from './Weapon/WeaponScene'
import { useUpdateFlashlightPosition } from '@/state/flashlight/useUpdateFlashlightPostion'
import { useMovementControls } from '@/state/movement/useMovementControls'
import { useUpdatePlayerPosition } from '@/state/movement/useUpdatePlayerPosition'
import { useWeaponStore } from '@/state/weapon'

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
        <Flash />
        <Weapon />
      </group>
    </>
  )
}
