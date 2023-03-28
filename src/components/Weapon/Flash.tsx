import type { FC } from 'react'
import React from 'react'

import { Globals } from '@react-spring/shared'
import { useSpring, animated } from '@react-spring/three'

import { useWeaponStore } from '@/logic/weapon'

Globals.assign({
  frameLoop: `always`,
})

export const Flash: FC = () => {
  const { isShooting } = useWeaponStore((s) => s)

  const { intensity } = useSpring({
    intensity: isShooting ? 50 : 0,
  })

  console.log(`Player render`, { isShooting, intensity })
  return (
    // @ts-ignore
    <animated.pointLight
      position={[2, 2, 1]}
      intensity={intensity}
      color="red"
    />
  )
}
