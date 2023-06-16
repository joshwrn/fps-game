import type { FC } from 'react'

import styled from '@emotion/styled'
import { LuFlashlightOff, LuFlashlight } from 'react-icons/lu'

import { useFlashlightStore } from '@/state/flashlight'
import { RELOAD_TIME } from '@/state/weapon/reload'

export const Flashlight: FC = () => {
  const { isOn } = useFlashlightStore((s) => ({
    isOn: s.isOn,
  }))
  return <Container>{isOn ? <LuFlashlight /> : <LuFlashlightOff />}</Container>
}

const Container = styled.div`
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 100%;
    height: 100%;
    stroke: #737373;
  }
`
