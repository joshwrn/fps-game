import type { ReactElement } from 'react'
import React, { useEffect } from 'react'

import styled from '@emotion/styled'
import { Physics, usePlane } from '@react-three/cannon'
import { PointerLockControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import type { Mesh } from 'three'
import { create } from 'zustand'

import { Box } from './Box'
import Player from './Player'
import { useWeaponStore } from '@/state/weapon'

export const useObjectStore = create<{
  objects: Mesh[]
  addObject: (object: Mesh) => void
}>((set) => ({
  objects: [],
  addObject: (object) => set((s) => ({ objects: [...s.objects, object] })),
}))

export const Scene = (): ReactElement => {
  const [setIsShooting] = useWeaponStore((s) => [s.setIsShooting])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const leftClick = event.button === 0
    const mousedown = event.type === `mousedown`
    if (leftClick && mousedown) {
      setIsShooting(true)
    }
    if (leftClick && !mousedown) {
      setIsShooting(false)
    }
  }

  return (
    <CanvasContainer>
      <Canvas
        shadows
        gl={{ alpha: false }}
        camera={{ fov: 80 }}
        onMouseDown={handleClick}
        onMouseUp={handleClick}
      >
        {/* <fog attach="fog" args={[`black`, 0, 150]} /> */}
        {/* <Environment preset="night" /> */}
        <ambientLight intensity={0.5} />
        <Physics gravity={[0, -100, 0]}>
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
  const { addObject } = useObjectStore()

  useEffect(() => {
    if (!ref.current) return
    addObject(ref.current)
  }, [ref])

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
