import { useState } from 'react'

import { useSpring, animated } from '@react-spring/three'
import { SpotLight } from '@react-three/drei'
import * as THREE from 'three'

import { useFlashlightControls, useFlashlightStore } from '@/state/flashlight'
import { useWeaponStore } from '@/state/weapon'
import { randomNumber } from '@/utils/randomNumber'

const Flashlight = ({
  ...props
}: JSX.IntrinsicElements[`group`]): JSX.Element => {
  const [target] = useState(() => new THREE.Object3D())
  const isLightOn = useFlashlightStore((s) => s.isOn)
  const { isFiringBullet } = useWeaponStore((s) => ({
    isFiringBullet: s.isFiringBullet,
  }))
  const { rotation, position } = useSpring({
    rotation: [isFiringBullet ? 0.5 : 0, isFiringBullet ? -0.2 : 0, 0],
    position: [
      isFiringBullet ? randomNumber(0.1, 1) : 0,
      isFiringBullet ? randomNumber(0.1, 1) : 0,
      isFiringBullet ? randomNumber(0.1, 0.5) : 0,
    ],
    config: { tension: 600, friction: 100, mass: 1 },
  })

  useFlashlightControls()

  return (
    <group {...props}>
      {/* @ts-expect-error */}
      <animated.group rotation={rotation} position={position}>
        <SpotLight
          castShadow
          target={target}
          penumbra={0.25}
          radiusTop={0.1}
          radiusBottom={50}
          distance={150}
          angle={0.6}
          attenuation={isLightOn ? 20 : 0}
          anglePower={5}
          intensity={isLightOn ? 2 : 0}
          position={[0.9, 0.5, 0]}
        />
        <primitive object={target} position={[4, 0, 0]} />
      </animated.group>
    </group>
  )
}

export default Flashlight
