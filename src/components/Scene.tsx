import type { ReactElement } from 'react'
import React, { useState } from 'react'

import styled from '@emotion/styled'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { PointerLockControls, Float, Environment } from '@react-three/drei'
import type { MeshProps } from '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import type { Mesh } from 'three'

import Player from './Player'
import { Flash } from './Weapon/Flash'
import { useWeaponStore } from '@/logic/weapon'

function Box(props: MeshProps) {
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [ref, api] = useBox<Mesh>(() => ({
    mass: 1,
    args: [1, 1, 1],
    position: [0, 5, -10],
  }))
  return (
    <mesh
      {...props}
      ref={ref}
      castShadow
      scale={[1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={hovered ? `hotpink` : `orange`}
        metalness={1}
        roughness={0.5}
        attach="material"
        envMapIntensity={0.2}
      />
    </mesh>
  )
}

export const Scene = (): ReactElement => {
  const [toggleShoot] = useWeaponStore((s) => [s.toggleShoot])
  return (
    <CanvasContainer>
      <Canvas
        shadows
        gl={{ alpha: false }}
        camera={{ fov: 80 }}
        onMouseDown={() => toggleShoot()}
        onMouseUp={() => toggleShoot()}
      >
        <Flash />
        <fog attach="fog" args={[`black`, 0, 150]} />
        <Environment preset="night" />
        <hemisphereLight
          intensity={1}
          color="rgb(25, 24, 61)"
          groundColor="rgb(0, 0, 0)"
        />
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
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial
        color="rgb(86, 187, 64)"
        metalness={0}
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
