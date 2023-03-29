import { Globals } from '@react-spring/three'

import { Hud } from '@/components/Hud'
import { Crosshair } from '@/components/Hud/Crosshair'
import { Scene } from '@/components/Scene'
import { WeaponScene } from '@/components/Weapon/WeaponScene'

Globals.assign({
  frameLoop: `always`,
})

export default function Home(): React.ReactNode {
  return (
    <>
      {/* <WeaponScene /> */}
      <Hud />
      <Scene />
    </>
  )
}
