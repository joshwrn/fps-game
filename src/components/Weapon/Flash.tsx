import type { FC } from 'react'
import React, { useState } from 'react'

import { Globals } from '@react-spring/shared'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'

import { useWeaponStore } from '@/state/weapon'

Globals.assign({
  frameLoop: `always`,
})

export const Flash: FC = () => {
  const { isFiringBullet } = useWeaponStore((s) => ({
    isFiringBullet: s.isFiringBullet,
  }))
  const [target] = useState(() => new THREE.Object3D())

  const { intensity, sIntensity } = useSpring({
    intensity: isFiringBullet ? 5 : 0,
    sIntensity: isFiringBullet ? 30 : 0,
    config: {
      duration: 1,
    },
  })

  return (
    <>
      {/* <mesh castShadow position={[0, 0, -5]} scale={[1, 1, 1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={`hotpink`}
          metalness={1}
          roughness={0.5}
          attach="material"
          envMapIntensity={0.2}
        />
      </mesh> */}
      {/* @ts-ignore */}
      <animated.spotLight
        position={[0.3, 0, 0]}
        rotation={[0, Math.PI / 2 + 0.1, 0]}
        intensity={sIntensity}
        color="#ff5542"
        castShadow
        target={target}
        penumbra={0.5}
        distance={250}
        angle={0.8}
      />
      <primitive object={target} position={[0, -1, -3]} />
      {/* @ts-ignore */}
      <animated.pointLight
        position={[0, 0, -5]}
        intensity={intensity}
        color="#ffd65c"
        castShadow
      />
    </>
  )
}
