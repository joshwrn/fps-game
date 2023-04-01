import type { FC } from 'react'
import React from 'react'

import styled from '@emotion/styled'
import { useSpring, animated } from '@react-spring/three'
import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { WeaponModel } from './WeaponModel'
import { useFlashlightStore } from '@/state/flashlight'
import { useWeapon, useWeaponStore } from '@/state/weapon'
import { randomNumber } from '@/utils/randomNumber'

export const Weapon: FC = () => {
  useWeapon()
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

  return (
    <>
      {/* @ts-expect-error */}
      <animated.group rotation={rotation} position={position}>
        <WeaponModel
          position={[1, -1.8, -1.5]}
          rotation={[0.05, Math.PI / 2 + 0.1, 0]}
        />
      </animated.group>
    </>
  )
}

export const WeaponScene: FC = () => {
  const { flashlightIsOn } = useFlashlightStore((s) => ({
    flashlightIsOn: s.isOn,
  }))
  return (
    <CanvasContainerGun>
      <Canvas camera={{ fov: 35 }}>
        <pointLight position={[2, 2, 1]} intensity={flashlightIsOn ? 10 : 0} />
        <Environment preset="night" />
        <Weapon />
      </Canvas>
    </CanvasContainerGun>
  )
}

const CanvasContainerGun = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
`
