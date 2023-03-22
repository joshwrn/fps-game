import type { FC, ReactElement } from 'react'
import React, { useState } from 'react'

import styled from '@emotion/styled'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { PointerLockControls, Stars, Float } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

function Box(props) {
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [ref, api] = useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    ...props,
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
      <meshStandardMaterial color={hovered ? `hotpink` : `orange`} />
    </mesh>
  )
}

export const Scene = (): ReactElement => {
  return (
    <CanvasContainer>
      <Canvas shadows gl={{ alpha: false }} camera={{ fov: 80 }}>
        <Stars />
        <ambientLight intensity={1} />
        <Physics gravity={[0, -60, 0]}>
          {/* <Player /> */}
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
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="rgba(0, 48, 10, 0.2)" />
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
