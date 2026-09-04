import { useEffect, useRef } from 'react'

type Kind = 'rice' | 'chili' | 'steam'

interface Particle {
  kind: Kind
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  rotation: number
  rotationSpeed: number
  opacity: number
  drift: number
  driftSpeed: number
}

const RICE_COLOR = 'rgba(255, 244, 214, 0.9)'
const CHILI_COLOR = 'rgba(217, 79, 48, 0.85)'
const STEAM_COLOR = 'rgba(255, 255, 255, 0.10)'

function makeParticle(kind: Kind, width: number, height: number): Particle {
  return {
    kind,
    x: Math.random() * width,
    y: Math.random() * height,
    size:
      kind === 'steam'
        ? 40 + Math.random() * 60
        : kind === 'rice'
          ? 5 + Math.random() * 4
          : 3 + Math.random() * 3,
    speedY:
      kind === 'steam'
        ? -(0.15 + Math.random() * 0.25)
        : -(0.1 + Math.random() * 0.35),
    speedX: (Math.random() - 0.5) * 0.15,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.015,
    opacity: kind === 'steam' ? 0.5 + Math.random() * 0.3 : 0.5 + Math.random() * 0.5,
    drift: Math.random() * Math.PI * 2,
    driftSpeed: 0.004 + Math.random() * 0.006,
  }
}

export default function BiryaniParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let animationFrame = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      const el = canvas
      if (!el) return
      width = el.clientWidth
      height = el.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      el.width = width * dpr
      el.height = height * dpr
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const riceCount = Math.round((width * height) / 22000)
      const chiliCount = Math.round((width * height) / 60000)
      const steamCount = Math.round((width * height) / 90000)

      particles = [
        ...Array.from({ length: riceCount }, () => makeParticle('rice', width, height)),
        ...Array.from({ length: chiliCount }, () => makeParticle('chili', width, height)),
        ...Array.from({ length: steamCount }, () => makeParticle('steam', width, height)),
      ]
    }

    function drawRice(p: Particle) {
      if (!ctx) return
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.globalAlpha = p.opacity
      ctx.fillStyle = RICE_COLOR
      ctx.beginPath()
      ctx.ellipse(0, 0, p.size, p.size * 0.42, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    function drawChili(p: Particle) {
      if (!ctx) return
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.globalAlpha = p.opacity
      ctx.fillStyle = CHILI_COLOR
      ctx.beginPath()
      ctx.moveTo(0, -p.size)
      ctx.lineTo(p.size * 0.8, p.size * 0.6)
      ctx.lineTo(-p.size * 0.8, p.size * 0.6)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    function drawSteam(p: Particle) {
      if (!ctx) return
      ctx.save()
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
      gradient.addColorStop(0, STEAM_COLOR)
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = gradient
      ctx.globalAlpha = p.opacity
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    function step() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.y += p.speedY
        p.drift += p.driftSpeed
        p.x += p.speedX + Math.sin(p.drift) * 0.3
        p.rotation += p.rotationSpeed

        if (p.y < -p.size * 2) {
          p.y = height + p.size * 2
          p.x = Math.random() * width
        }
        if (p.x < -p.size * 2) p.x = width + p.size * 2
        if (p.x > width + p.size * 2) p.x = -p.size * 2

        if (p.kind === 'rice') drawRice(p)
        else if (p.kind === 'chili') drawChili(p)
        else drawSteam(p)
      }

      animationFrame = requestAnimationFrame(step)
    }

    resize()
    window.addEventListener('resize', resize)

    if (prefersReducedMotion) {
      for (const p of particles) {
        if (p.kind === 'rice') drawRice(p)
        else if (p.kind === 'chili') drawChili(p)
        else drawSteam(p)
      }
    } else {
      animationFrame = requestAnimationFrame(step)
    }

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="biryani-particles" aria-hidden="true" />
}
