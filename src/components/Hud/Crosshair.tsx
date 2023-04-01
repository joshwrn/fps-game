import type { FC } from 'react'
import React from 'react'

import styled from '@emotion/styled'
import { useSpring, animated } from '@react-spring/web'

import { useWeaponStore } from '@/state/weapon'
import { randomNumber } from '@/utils/randomNumber'

export const Crosshair: FC = () => {
  const { isFiringBullet, isShooting } = useWeaponStore((s) => ({
    isFiringBullet: s.isFiringBullet,
    isShooting: s.isShooting,
  }))
  const styles = useSpring({
    from: { x: 0, y: 0 },
    to: {
      x: isFiringBullet ? randomNumber(-50, 50) : 0,
      y: isShooting ? -50 : 0,
    },
    config: { tension: isShooting ? 900 : 1500, friction: 300, mass: 1 },
  })
  return <Dot />
}

const Dot = styled(animated.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  border-radius: 50%;

  border-radius: 999px;
  background-color: #ffffffa6;
  z-index: 999;
`
