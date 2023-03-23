import type { FC } from 'react'
import React from 'react'

import styled from '@emotion/styled'

export const Crosshair: FC = () => {
  return <Dot />
}

const Dot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  transform: translate3d(-50%, -50%, 0);
  border-radius: 999px;
  background-color: #ffffffa6;
  z-index: 999;
`
