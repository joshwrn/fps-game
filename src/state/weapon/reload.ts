import { useHotkeys } from 'react-hotkeys-hook'

import { useWeaponStore } from '.'

export const RELOAD_TIME = 500

export const useReload = (): { reload: VoidFunction } => {
  const { reload, setIsReloading } = useWeaponStore()
  const handleReload = () => {
    // interval to simulate reloading
    setIsReloading(true)
    const interval = setInterval(() => {
      reload()
      clearInterval(interval)
      setIsReloading(false)
    }, RELOAD_TIME)
  }
  return { reload: handleReload }
}

export const useReloadControls = (): void => {
  const { reload } = useReload()
  useHotkeys(`r`, reload)
}
