import type { FC } from 'react'
import React from 'react'

import { Ammo } from './Ammo'
import { Crosshair } from './Crosshair'

export const Hud: FC = () => {
  return (
    <>
      <Ammo />
      <Crosshair />
    </>
  )
}
