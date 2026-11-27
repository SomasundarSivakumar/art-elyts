import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const CARDS_DATA = [
  {
    name: 'Venus\nNwaokoro',
    role: 'Artist',
    location: 'CA, Ajax',
    palette: ['#52525b', '#27272a', '#09090b'],
    accent: '#e4e4e7',
  },
  {
    name: 'Georgina\nKoutifari-Magklara',
    role: 'Curator',
    location: 'DE, Berlin',
    palette: ['#d6d3d1', '#78716c', '#1c1917'],
    accent: '#fde68a',
  },
  {
    name: 'Robert\nBanat',
    role: 'Artist',
    location: 'US, Brooklyn',
    palette: ['#dc2626', '#991b1b', '#450a0a'],
    accent: '#fca5a5',
  },
  {
    name: 'Mantas\nValentukonis',
    role: 'Artist',
    location: 'LT, Kaunas',
    palette: ['#0ea5e9', '#1d4ed8', '#0f172a'],
    accent: '#7dd3fc',
  },
  {
    name: 'Leigh\nWitherell',
    role: 'Artist',
    location: 'US, Philadelphia',
    palette: ['#f59e0b', '#d97706', '#451a03'],
    accent: '#fde68a',
  },
  {
    name: 'Burning House\nCollective',
    role: 'Curator',
    location: 'EE',
    palette: ['#ef4444', '#b91c1c', '#27272a'],
    accent: '#fecaca',
  },
  {
    name: 'Cassandra\nZampini',
    role: 'Artist',
    location: 'US, New York',
    palette: ['#10b981', '#047857', '#022c22'],
    accent: '#6ee7b7',
  },
  {
    name: 'Maria\nIsserlis',
    role: 'Curator',
    location: 'DE, Berlin',
    palette: ['#8b5cf6', '#4f46e5', '#171717'],
    accent: '#c4b5fd',
  },
]

function createCardTexture(card, index) {
  const width = 640
  const height = 800
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  // Pure black card background
  ctx.fillStyle = '#050505'
  ctx.fillRect(0, 0, width, height)

  // Title text (Artist / Collective Name)
  ctx.fillStyle = '#ffffff'
  ctx.font = '400 50px Inter, system-ui, sans-serif'
  ctx.textBaseline = 'top'
  const lines = card.name.split('\n')
  lines.forEach((line, i) => {
    ctx.fillText(line, 44, 54 + i * 58)
  })

  // Horizontal divider
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
  ctx.fillRect(44, 326, width - 88, 2)

  // "Support Me" white pill with orange $ icon overlapping right side of divider
  const badgeX = 410
  const badgeY = 304
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.roundRect(badgeX, badgeY, 186, 46, 4)
  ctx.fill()

  ctx.fillStyle = '#CBE0E7'
  ctx.beginPath()
  ctx.arc(badgeX - 10, badgeY + 23, 18, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#09090b'
  ctx.font = '700 18px Inter, system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('$', badgeX - 10, badgeY + 13)

  ctx.fillStyle = '#09090b'
  ctx.font = '500 22px Inter, system-ui, sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('Support Me', badgeX + 26, badgeY + 11)

  // Role & location
  ctx.fillStyle = '#ffffff'
  ctx.font = '500 22px Inter, system-ui, sans-serif'
  ctx.fillText(card.role, 44, 368)

  ctx.fillStyle = '#a1a1aa'
  ctx.font = '400 22px Inter, system-ui, sans-serif'
  ctx.fillText(card.location, 44, 398)

  // Right-side square artwork / portrait thumbnail
  const artX = 336
  const artY = 408
  const artW = 260
  const artH = 260

  const grad = ctx.createLinearGradient(artX, artY, artX + artW, artY + artH)
  grad.addColorStop(0, card.palette[0])
  grad.addColorStop(0.55, card.palette[1])
  grad.addColorStop(1, card.palette[2])
  ctx.fillStyle = grad
  ctx.fillRect(artX, artY, artW, artH)

  ctx.save()
  ctx.beginPath()
  ctx.rect(artX, artY, artW, artH)
  ctx.clip()

  ctx.fillStyle = card.accent
  ctx.globalAlpha = 0.28
  ctx.beginPath()
  ctx.arc(
    artX + artW * (0.45 + (index % 2) * 0.12),
    artY + artH * 0.36,
    56,
    0,
    Math.PI * 2,
  )
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(
    artX + artW * 0.5,
    artY + artH * 0.96,
    98,
    92,
    0,
    Math.PI,
    Math.PI * 2,
  )
  ctx.fill()
  ctx.restore()

  // Bottom-left "Add to Apple Wallet" style badge
  const pillX = 44
  const pillY = 664
  const pillW = 224
  const pillH = 68

  ctx.fillStyle = '#09090b'
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.roundRect(pillX, pillY, pillW, pillH, 10)
  ctx.fill()
  ctx.stroke()

  const iconX = pillX + 16
  const iconY = pillY + 18
  ctx.fillStyle = '#3b82f6'
  ctx.fillRect(iconX, iconY, 34, 8)
  ctx.fillStyle = '#facc15'
  ctx.fillRect(iconX, iconY + 7, 34, 8)
  ctx.fillStyle = '#ef4444'
  ctx.fillRect(iconX, iconY + 14, 34, 8)
  ctx.fillStyle = '#e4e4e7'
  ctx.fillRect(iconX, iconY + 21, 34, 11)

  ctx.fillStyle = '#a1a1aa'
  ctx.font = '400 15px Inter, system-ui, sans-serif'
  ctx.fillText('Add to', pillX + 64, pillY + 13)

  ctx.fillStyle = '#ffffff'
  ctx.font = '600 22px Inter, system-ui, sans-serif'
  ctx.fillText('Apple Wallet', pillX + 64, pillY + 32)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

function drawFollowArtCanvas(canvas) {
  const width = 2048
  const height = 900
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, width, height)

  const text = 'DIGITAL. MARKETING.'
  ctx.save()
  ctx.fillStyle = '#655a70'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const baseSize = 200
  ctx.font = `900 ${baseSize}px "FONTSPRING DEMO - Hardbop", Helvetica, Arial, sans-serif`
  if ('letterSpacing' in ctx) {
    ctx.letterSpacing = '8px'
  }

  // Tall poster proportions filling width and height cleanly without clipping
  const measured = ctx.measureText(text)
  const ascent = measured.actualBoundingBoxAscent || 150
  const descent = measured.actualBoundingBoxDescent || 30
  const scaleX = (width * 0.96) / Math.max(measured.width, 1)
  const scaleY = (height * 0.92) / (ascent + descent)
  const centerOffsetY = ((ascent - descent) / 2) * scaleY

  ctx.translate(width / 2, height / 2 + centerOffsetY)
  ctx.scale(scaleX, scaleY)
  ctx.fillText(text, 0, 0)
  ctx.restore()
}

function createCurvedPlaneGeometry(width, height, radius, segments = 32) {
  const geometry = new THREE.PlaneGeometry(width, height, segments, 1)
  const pos = geometry.attributes.position

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const angle = x / radius
    pos.setX(i, radius * Math.sin(angle))
    pos.setZ(i, radius * Math.cos(angle))
  }

  geometry.computeVertexNormals()
  return geometry
}

export default function CurvedCardCanvas({ scrollProgressRef }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0.05, 6.85)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    // 3D "FOLLOW ART" plane placed at z = 0 INSIDE the cylinder:
    // Front cards (z > 0) render IN FRONT of the text,
    // Back cards (z < 0) render BEHIND the text (visible through letter gaps).
    const textCanvas = document.createElement('canvas')
    drawFollowArtCanvas(textCanvas)
    const textTexture = new THREE.CanvasTexture(textCanvas)
    textTexture.colorSpace = THREE.SRGBColorSpace
    textTexture.anisotropy = 8

    const textWidth = 9.6
    const textHeight = 4.2
    const textGeometry = new THREE.PlaneGeometry(textWidth, textHeight)

    const textMaterial = new THREE.MeshBasicMaterial({
      map: textTexture,
      transparent: true,
      alphaTest: 0.2,
      depthWrite: true,
    })
    const textMesh = new THREE.Mesh(textGeometry, textMaterial)
    textMesh.position.set(0, 0, 0)
    scene.add(textMesh)

    const fitTextToViewport = () => {
      const vFov = (camera.fov * Math.PI) / 180
      const visibleHeight = 2 * Math.tan(vFov / 2) * camera.position.z
      const visibleWidth = visibleHeight * camera.aspect
      textMesh.scale.set(
        (visibleWidth * 0.88) / textWidth,
        (visibleHeight * 0.68) / textHeight,
        1,
      )
    }
    fitTextToViewport()

    // Explicitly load Hardbop Black (900) from @font-face, then re-draw
    let disposed = false
    Promise.all([
      document.fonts?.load('900 200px "FONTSPRING DEMO - Hardbop"'),
      document.fonts?.ready,
    ]).then(() => {
      if (disposed) return
      drawFollowArtCanvas(textCanvas)
      textTexture.needsUpdate = true
    })

    // Tilted diagonal cylinder matching the reference image
    const ribbonGroup = new THREE.Group()
    ribbonGroup.rotation.z = 0.36
    ribbonGroup.rotation.x = 0.2
    ribbonGroup.position.set(0.05, -0.05, 0)
    scene.add(ribbonGroup)

    const radius = 2.18
    const cardW = 1.46
    const cardH = 1.82
    const sharedGeometry = createCurvedPlaneGeometry(cardW, cardH, radius, 32)

    // Translucent slate back material for cards wrapping behind the cylinder
    const backMaterial = new THREE.MeshBasicMaterial({
      color: 0x334155,
      transparent: true,
      opacity: 0.28,
      side: THREE.BackSide,
      depthWrite: false,
    })

    const textures = []
    const frontMaterials = []
    const cardPivots = []

    const totalCards = CARDS_DATA.length
    const angleStep = (Math.PI * 2) / totalCards

    CARDS_DATA.forEach((card, index) => {
      const texture = createCardTexture(card, index)
      textures.push(texture)

      const frontMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide,
      })
      frontMaterials.push(frontMaterial)

      const frontMesh = new THREE.Mesh(sharedGeometry, frontMaterial)
      const backMesh = new THREE.Mesh(sharedGeometry, backMaterial)

      const pivot = new THREE.Group()
      pivot.add(backMesh)
      pivot.add(frontMesh)
      pivot.userData.baseAngle = index * angleStep
      ribbonGroup.add(pivot)
      cardPivots.push(pivot)
    })

    let isDragging = false
    let lastPointerX = 0
    let dragOffset = 0
    let targetDragOffset = 0
    let autoPhase = 0.35
    let lastTime = performance.now()
    let rafId = 0

    const onPointerDown = (e) => {
      isDragging = true
      lastPointerX = e.clientX
      container.style.cursor = 'grabbing'
    }

    const onPointerMove = (e) => {
      if (!isDragging) return
      const deltaX = e.clientX - lastPointerX
      lastPointerX = e.clientX
      targetDragOffset += deltaX * 0.006
    }

    const onPointerUp = () => {
      isDragging = false
      container.style.cursor = 'grab'
    }

    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      fitTextToViewport()
    }

    container.style.cursor = 'grab'
    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('resize', handleResize)

    const animate = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      if (!isDragging) {
        autoPhase += dt * 0.22
      }

      dragOffset += (targetDragOffset - dragOffset) * 0.08
      const scrollBoost = (scrollProgressRef?.current ?? 0) * Math.PI * 2.4
      const globalAngle = autoPhase + dragOffset + scrollBoost

      cardPivots.forEach((pivot) => {
        pivot.rotation.y = pivot.userData.baseAngle + globalAngle
      })

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      disposed = true
      cancelAnimationFrame(rafId)
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('resize', handleResize)

      textGeometry.dispose()
      textMaterial.dispose()
      textTexture.dispose()
      sharedGeometry.dispose()
      backMaterial.dispose()
      frontMaterials.forEach((m) => m.dispose())
      textures.forEach((t) => t.dispose())
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [scrollProgressRef])

  return (
    <div
      ref={containerRef}
      className="relative z-10 h-full w-full touch-pan-y select-none"
      aria-label="Interactive 3D curved card carousel"
    />
  )
}
