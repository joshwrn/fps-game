import type { FC } from 'react'
import React from 'react'

import styled from '@emotion/styled'

import { Ammo } from './Ammo'
import { Crosshair } from './Crosshair'
import { Flashlight } from './Flashlight'

export const Hud: FC = () => {
  return (
    <>
      <Crosshair />
      <BottomContainer>
        <Flashlight />
        <Ammo />
      </BottomContainer>
    </>
  )
}

const BottomContainer = styled.div`
  position: absolute;
  bottom: 50px;
  right: 5%;
  color: #ffffff70;
  font-size: 2rem;
  font-weight: 700;
  z-index: 999;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  transform: skewY(10deg);
`
