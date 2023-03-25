import React, { useState } from 'react'

import { SpotLight } from '@react-three/drei'
import * as THREE from 'three'

import { GunModel } from '../Gun/GunModel'
import { useFlashlightControls, useFlashlightStore } from '@/logic/flashlight'

const Flashlight = ({
  ...props
}: JSX.IntrinsicElements[`group`]): JSX.Element => {
  const [target] = useState(() => new THREE.Object3D())
  const isLightOn = useFlashlightStore((s) => s.isOn)
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

      <GunModel />
    </group>
  )
}

export default Flashlight
