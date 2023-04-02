import type { ReactElement } from 'react'
import React from 'react'

import styled from '@emotion/styled'
import { Physics, usePlane } from '@react-three/cannon'
import { PointerLockControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import type { Mesh } from 'three'

import { Box } from './Box'
import Player from './Player'
import { useWeaponStore } from '@/state/weapon'

export const Scene = (): ReactElement => {
  const [setIsShooting] = useWeaponStore((s) => [s.setIsShooting])

  return (
    <CanvasContainer>
      <Canvas
        shadows
        gl={{ alpha: false }}
        camera={{ fov: 80 }}
        onMouseDown={() => setIsShooting(true)}
        onMouseUp={() => setIsShooting(false)}
      >
        {/* <fog attach="fog" args={[`black`, 0, 150]} /> */}
        <Environment preset="night" />
        <ambientLight intensity={0.5} />
        <Physics gravity={[0, -60, 0]}>
          <Player />
          <Box position={[5, 10, 0]} />
          <Ground />
        </Physics>
        <PointerLockControls />
      </Canvas>
    </CanvasContainer>
  )
}

export const Ground = (): React.ReactElement => {
  const [ref] = usePlane<Mesh>(() => ({ rotation: [-Math.PI / 2, 0, 0] }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial
        color="rgb(69, 69, 69)"
        metalness={0.3}
        roughness={0.5}
        attach="material"
        envMapIntensity={0.2}
      />
    </mesh>
  )
}

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
`
