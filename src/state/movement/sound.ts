import useSound from 'use-sound'
import type { PlayFunction } from 'use-sound/dist/types'

import { isSprinting } from './controls'
import { randomNumber } from '@/utils/randomNumber'

export const useFootstep = (): PlayFunction[] => {
  const multiplier = isSprinting() ? 0.5 : 0.2
  const rate = randomNumber(0.8, 1.1)
  const [one] = useSound(`/sounds/footsteps/1.wav`, {
    volume: 1 * multiplier,
    playbackRate: rate,
  })
  const [two] = useSound(`/sounds/footsteps/2.wav`, {
    volume: 1 * multiplier,
    playbackRate: rate,
  })
  const [three] = useSound(`/sounds/footsteps/3.wav`, {
    volume: 1 * multiplier,
    playbackRate: rate,
  })
  const [four] = useSound(`/sounds/footsteps/4.wav`, {
    volume: 1 * multiplier,
    playbackRate: rate,
  })
  const [five] = useSound(`/sounds/footsteps/5.wav`, {
    volume: 1 * multiplier,
    playbackRate: rate,
  })

  return [one, two, three, four, five]
}
