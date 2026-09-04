import type { MouseEvent } from 'react'

const MAX_TILT = 7

export function useTilt() {
  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5

    el.style.setProperty('--tilt-x', `${(-py * MAX_TILT).toFixed(2)}deg`)
    el.style.setProperty('--tilt-y', `${(px * MAX_TILT).toFixed(2)}deg`)
  }

  const onMouseLeave = (event: MouseEvent<HTMLElement>) => {
    const el = event.currentTarget
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
  }

  return { onMouseMove, onMouseLeave }
}
