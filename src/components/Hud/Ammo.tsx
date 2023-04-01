import type { FC } from 'react'

import styled from '@emotion/styled'

import { useWeaponStore } from '@/state/weapon'
import { RELOAD_TIME } from '@/state/weapon/reload'

export const Ammo: FC = () => {
  const { ammo, isReloading } = useWeaponStore((s) => ({
    ammo: s.ammo,
    isReloading: s.isReloading,
  }))
  return <Container>{isReloading ? <Progress /> : ammo}</Container>
}

const Progress = styled.div`
  width: 100px;
  height: 10px;
  background: #ffffff70;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  pointer-events: none;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    animation: progress ${RELOAD_TIME}ms linear infinite;
  }
  @keyframes progress {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`

const Container = styled.div`
  position: absolute;
  bottom: 50px;
  right: 5%;
  color: #ffffff70;
  font-size: 2rem;
  font-weight: 700;
  z-index: 999;
  pointer-events: none;
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
`
