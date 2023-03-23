import type { FC, ReactElement } from 'react'
import React, { useState } from 'react'

import styled from '@emotion/styled'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import {
  PointerLockControls,
  Stars,
  Float,
  Sky,
  Environment,
  Sparkles,
} from '@react-three/drei'
import type { MeshProps } from '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import type { Mesh } from 'three'

import Player from './Player'

function Box(props: MeshProps) {
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [ref, api] = useBox<Mesh>(() => ({
    mass: 1,
    args: [1, 1, 1],
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
  return (
    <CanvasContainer>
      <Canvas shadows gl={{ alpha: false }} camera={{ fov: 80 }}>
        <fog attach="fog" args={[`black`, 0, 50]} />
        <Environment preset="night" />
        <hemisphereLight
          intensity={1}
          color="rgb(0, 0, 0)"
          groundColor="rgb(255, 255, 255)"
        />
        <Physics gravity={[0, -60, 0]}>
          <Player />
          <Float
            speed={4}
            rotationIntensity={3}
            floatIntensity={1}
            floatingRange={[1, 2]}
          >
            <Box position={[5, 10, 0]} />
          </Float>
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
        metalness={1}
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
  background-color: black;
`
