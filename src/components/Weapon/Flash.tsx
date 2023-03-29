import type { FC } from 'react'
import React from 'react'

import { Globals } from '@react-spring/shared'
import { useSpring, animated } from '@react-spring/three'

import { useWeaponStore } from '@/state/weapon'

Globals.assign({
  frameLoop: `always`,
})

export const Flash: FC = () => {
  const { isShooting, firingBullet } = useWeaponStore((s) => s)

  const { intensity } = useSpring({
    intensity: firingBullet ? 0.5 : 0,
    config: {
      duration: 0,
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
      <animated.pointLight
        position={[0, 0, -5]}
        intensity={intensity}
        color="#ffd65c"
        castShadow
      />
    </>
  )
}
