import { useHotkeys } from 'react-hotkeys-hook'
import useSound from 'use-sound'

import { useWeaponStore } from '.'

export const RELOAD_TIME = 1000

export const useReload = (): { reload: VoidFunction } => {
  const { reload, setIsReloading, isReloading } = useWeaponStore()
  const [playReload] = useSound(`/sounds/weapon/reload.wav`, {
    volume: 0.7,
  })
  const [playBolt] = useSound(`/sounds/weapon/bolt.wav`, {
    volume: 0.7,
  })
  const handleReload = () => {
    // interval to simulate reloading
    if (isReloading) return
    setIsReloading(true)
    playReload()
    const interval = setInterval(() => {
      reload()
      clearInterval(interval)
      setIsReloading(false)
      playBolt()
    }, RELOAD_TIME)
  }
  return { reload: handleReload }
}

export const useReloadControls = (): void => {
  const { reload } = useReload()
  useHotkeys(`r`, reload)
}
