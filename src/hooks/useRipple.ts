import type { MouseEvent } from 'react'

export function useRipple() {
  return function onRipple(event: MouseEvent<HTMLElement>) {
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    const diameter = Math.max(rect.width, rect.height)
    const radius = diameter / 2

    const circle = document.createElement('span')
    circle.className = 'ripple-effect'
    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${event.clientX - rect.left - radius}px`
    circle.style.top = `${event.clientY - rect.top - radius}px`

    const existing = target.getElementsByClassName('ripple-effect')[0]
    existing?.remove()

    target.appendChild(circle)
    circle.addEventListener('animationend', () => circle.remove())
  }
}
