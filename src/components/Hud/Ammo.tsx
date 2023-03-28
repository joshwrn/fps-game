import type { FC } from 'react'
import React from 'react'

import styled from '@emotion/styled'

import { useWeaponStore } from '@/logic/weapon'

export const Ammo: FC = () => {
  const ammo = useWeaponStore((s) => s.ammo)
  return <Container>{ammo}</Container>
}

const Container = styled.div`
  position: absolute;
  bottom: 50px;
  right: 10%;
  color: #ffffff70;
  font-size: 2rem;
  font-weight: 700;
  z-index: 999;
  pointer-events: none;
  font-family: 'Roboto', sans-serif;
`
