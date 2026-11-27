import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import CurvedCardCanvas from './components/CurvedCardCanvas'

const WORKS = [
  {
    id: '01',
    title: 'Solaris Monolith',
    category: 'Kinetic Sculpture',
    year: '2026',
    gradient: 'from-amber-500/30 via-orange-600/20 to-neutral-900',
    accent: 'border-amber-500/30',
  },
  {
    id: '02',
    title: 'Velvet Horizon',
    category: 'Spatial Audio & WebGL',
    year: '2026',
    gradient: 'from-rose-500/30 via-fuchsia-700/20 to-neutral-900',
    accent: 'border-rose-500/30',
  },
  {
    id: '03',
    title: 'Obsidian Echo',
    category: 'Generative Identity',
    year: '2025',
    gradient: 'from-cyan-500/30 via-sky-700/20 to-neutral-900',
    accent: 'border-cyan-500/30',
  },
  {
    id: '04',
    title: 'Chromatic Drift',
    category: 'Interactive Exhibition',
    year: '2025',
    gradient: 'from-emerald-500/30 via-teal-700/20 to-neutral-900',
    accent: 'border-emerald-500/30',
  },
]

const PILLARS = [
  {
    number: '01',
    title: 'Tactile Motion',
    description:
      'Every scroll interaction carries physical weight and inertia, turning static layouts into responsive surfaces.',
  },
  {
    number: '02',
    title: 'Editorial Clarity',
    description:
      'High-contrast typography paired with generous negative space lets each visual artifact breathe naturally.',
  },
  {
    number: '03',
    title: 'Zero-Friction Craft',
    description:
      'Built on React, Vite, Tailwind CSS, Three.js, and Lenis for instant builds and silky 60fps+ scrolling.',
  },
]

export default function App() {
  const lenisRef = useRef(null)
  const scrollProgressRef = useRef(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    const handleScroll = ({ progress }) => {
      scrollProgressRef.current = progress
      setScrollProgress(progress)
    }
    lenis.on('scroll', handleScroll)

    let rafId = 0
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.off('scroll', handleScroll)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollToSection = (target) => {
    lenisRef.current?.scrollTo(target, { offset: -64 })
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-black/20">
        <div
          className="h-full bg-white transition-[width] duration-75"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

      {/* Navigation */}
      <header className="fixed top-0.5 left-0 right-0 z-40 mix-blend-difference">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={() => scrollToSection(0)}
            className="cursor-pointer text-sm font-semibold tracking-[0.22em] text-white uppercase"
          >
            Art Elyts
          </button>

          <nav className="flex items-center gap-8 text-xs font-medium tracking-widest text-white/80 uppercase">
            <button
              type="button"
              onClick={() => scrollToSection('#works')}
              className="cursor-pointer transition-colors hover:text-white"
            >
              Works
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('#ethos')}
              className="cursor-pointer transition-colors hover:text-white"
            >
              Ethos
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('#contact')}
              className="cursor-pointer transition-colors hover:text-white"
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative h-screen w-full overflow-hidden bg-[#CBE0E7]">
          <h1 className="sr-only">Digital. Marketing.</h1>
          <svg
            className="pointer-events-none absolute right-[12%] bottom-[10%] z-[5] h-90 w-72 opacity-90"
            viewBox="0 0 280 180"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 16 L266 154 M28 38 L244 162 M8 28 L224 156 M42 54 L256 170"
              stroke="#121212"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <CurvedCardCanvas scrollProgressRef={scrollProgressRef} />
          <div className="pointer-events-none absolute bottom-6 left-6 z-20 hidden items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-neutral-950/80 uppercase sm:flex">
            <span>Drag or Scroll</span>
            <span className="h-px w-8 bg-neutral-950/50" />
            <span>{Math.round(scrollProgress * 100)}%</span>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection('#works')}
            className="group absolute right-6 bottom-6 z-20 flex h-16 w-44 cursor-pointer items-center justify-between bg-neutral-950 px-5 text-sm font-medium tracking-wide text-white shadow-2xl transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Join</span>
            <svg
              className="h-4 w-4 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 12L12 4M12 4H6M12 4V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </section>
        <section id="works" className="mx-auto max-w-6xl px-6 py-28">
          <div className="mb-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium tracking-[0.28em] text-[#CBE0E7] uppercase">
                Selected Works
              </p>
              <h2 className="mt-3 font-serif text-4xl text-neutral-50 sm:text-6xl">
                Curated Artifacts
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-400">
              Experiments in motion, typography, and atmospheric depth crafted for
              modern browsers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {WORKS.map((work) => (
              <article
                key={work.id}
                className={`group relative overflow-hidden rounded-2xl border ${work.accent} bg-gradient-to-br ${work.gradient} p-8 transition-transform duration-500 hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between text-xs tracking-widest text-neutral-400 uppercase">
                  <span>{work.id}</span>
                  <span>{work.year}</span>
                </div>

                <div className="mt-24">
                  <p className="text-xs tracking-widest text-neutral-300 uppercase">
                    {work.category}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl text-neutral-50 transition-colors group-hover:text-amber-300 sm:text-4xl">
                    {work.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          id="ethos"
          className="border-y border-white/10 bg-neutral-900/40 px-6 py-28"
        >
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-medium tracking-[0.28em] text-[#CBE0E7] uppercase">
              Studio Ethos
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl text-neutral-50 sm:text-6xl">
              Motion is not decoration — it is how space communicates.
            </h2>

            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="border-t border-white/10 pt-6"
                >
                  <span className="text-xs font-medium tracking-widest text-[#CBE0E7]">
                    {pillar.number}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl text-neutral-100">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <footer id="contact" className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium tracking-[0.28em] text-[#CBE0E7] uppercase">
                Start a Conversation
              </p>
              <h2 className="mt-3 font-serif text-4xl text-neutral-50 sm:text-6xl">
                Let&apos;s build something{' '}
                <span className="italic text-[#CBE0E7]">memorable</span>.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection(0)}
              className="cursor-pointer rounded-full border border-white/15 px-6 py-3 text-xs font-semibold tracking-widest text-neutral-200 uppercase transition-colors hover:border-[#CBE0E7] hover:text-[#CBE0E7]"
            >
              Back to Top ↑
            </button>
          </div>

          <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row">
            <span>© {new Date().getFullYear()} Art Elyts Studio</span>
            <span>React + Vite + Tailwind CSS + Three.js + Lenis</span>
          </div>
        </footer>
      </main>
    </div>
  )
}
