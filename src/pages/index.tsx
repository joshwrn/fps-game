import { Globals } from '@react-spring/three'

import { Hud } from '@/components/Hud'
import { Scene } from '@/components/Scene'

Globals.assign({
  frameLoop: `always`,
})

export default function Home(): React.ReactNode {
  return (
    <>
      <Hud />
      <Scene />
    </>
  )
}
