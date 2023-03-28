import { Hud } from '@/components/Hud'
import { Crosshair } from '@/components/Hud/Crosshair'
import { Scene } from '@/components/Scene'
import { WeaponScene } from '@/components/Weapon/WeaponScene'

export default function Home(): React.ReactNode {
  return (
    <>
      <WeaponScene />
      <Hud />
      <Scene />
    </>
  )
}
