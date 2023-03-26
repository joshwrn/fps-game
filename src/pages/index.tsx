import { Crosshair } from '@/components/Crosshair'
import { Scene } from '@/components/Scene'
import { WeaponScene } from '@/components/Weapon/WeaponScene'

export default function Home(): React.ReactNode {
  return (
    <>
      <WeaponScene />
      <Crosshair />
      <Scene />
    </>
  )
}
