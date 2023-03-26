import React, { useRef, useState } from 'react'

import { SpotLight } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'

import { useFlashlightControls, useFlashlightStore } from '@/logic/flashlight'
import { useUpdateFlashlightPosition } from '@/logic/flashlight/useUpdateFlashlightPostion'

const Flashlight = ({
  ...props
}: JSX.IntrinsicElements[`group`]): JSX.Element => {
  const [target] = useState(() => new THREE.Object3D())
  const isLightOn = useFlashlightStore((s) => s.isOn)
  const flashlightRef = useRef<Group>(null)
  useUpdateFlashlightPosition({
    flashlightRef,
  })
  useFlashlightControls()
  return (
    <group {...props}>
      <SpotLight
        castShadow
        target={target}
        penumbra={0.25}
        radiusTop={0.1}
        radiusBottom={50}
        distance={80}
        angle={0.6}
        attenuation={isLightOn ? 20 : 0}
        anglePower={5}
        intensity={isLightOn ? 2 : 0}
        position={[0.9, 0.5, 0]}
      />
      <primitive object={target} position={[4, 0, 0]} />
    </group>
  )
}

export default Flashlight
