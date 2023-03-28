import type { FC } from 'react'
import React from 'react'

import styled from '@emotion/styled'
import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { WeaponModel } from './WeaponModel'
import { useFlashlightStore } from '@/logic/flashlight'
import { useWeapon } from '@/logic/weapon'

const Weapon = () => {
  useWeapon()
  return (
    <WeaponModel
      position={[1, -1.8, -1.5]}
      rotation={[0.05, Math.PI / 2 + 0.1, 0]}
    />
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
