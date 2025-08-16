// components/animated/reactbits/SplitText.tsx
'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ScrollTrigger as ScrollTriggerInstance } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface SplitTextProps {
  text: string
  className?: string
  /** jeda antar elemen (ms) */
  delay?: number
  /** durasi tiap elemen (detik) */
  duration?: number
  ease?: string | ((t: number) => number)
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars'
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  /** 0..1: seberapa banyak elemen terlihat sebelum animasi mulai */
  threshold?: number
  /** offset trigger (mis. "-80px", "60px") */
  rootMargin?: string
  textAlign?: React.CSSProperties['textAlign']
  /** elemen pembungkus (default 'h1') */
  as?: keyof React.JSX.IntrinsicElements
  /** callback selesai animasi */
  onLetterAnimationComplete?: () => void
  /** true: mulai saat terlihat (ScrollTrigger), false: langsung jalan saat mount */
  startOnVisible?: boolean
  /** true: animasi sekali (default), false: bisa retrigger saat scroll */
  once?: boolean
}

/** Pecah string ke span-span untuk animasi (tanpa plugin SplitText berbayar) */
function buildNodes(text: string, splitType: SplitTextProps['splitType']) {
  const container = document.createElement('span')
  container.className = 'split-parent inline-block whitespace-normal'
  container.style.overflow = 'visible' // biar descenders aman

  const wrap = (t: string, cls: string) => {
    const s = document.createElement('span')
    s.className = cls
    s.textContent = t
    ;(s as HTMLElement).style.display = 'inline-block'
    ;(s as HTMLElement).style.overflow = 'visible'
    return s
  }

  if (splitType === 'words' || splitType === 'words, chars') {
    const words = text.split(/(\s+)/) // pertahankan spasi sebagai token
    words.forEach((w) => {
      if (/^\s+$/.test(w)) {
        container.appendChild(document.createTextNode(w))
      } else {
        const wordSpan = wrap('', 'split-word')
        if (splitType === 'words, chars') {
          ;[...w].forEach((ch) => wordSpan.appendChild(wrap(ch, 'split-char')))
        } else {
          wordSpan.textContent = w
        }
        container.appendChild(wordSpan)
      }
    })
  } else if (splitType === 'lines') {
    // fallback sederhana: treat sebagai satu line
    container.appendChild(wrap(text, 'split-line'))
  } else {
    // chars
    ;[...text].forEach((ch) => {
      container.appendChild(wrap(ch, 'split-char'))
    })
  }

  return container
}

export default function SplitText({
  text,
  className = '',
  delay = 100,
  duration = 0.6, // detik
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  as = 'h1',
  onLetterAnimationComplete,
  startOnVisible = true,
  once = true,
}: SplitTextProps) {
  const Tag = as as any
  const hostRef = useRef<HTMLElement | null>(null)
  const originalHTML = useRef<string>('')
  const createdTriggerRef = useRef<ScrollTriggerInstance | null>(null)

  const reduced = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  }, [])

  useEffect(() => {
    const el = hostRef.current
    if (!el) return

    // simpan konten asli untuk revert
    originalHTML.current = el.innerHTML

    // build span nodes
    el.innerHTML = ''
    const nodes = buildNodes(text, splitType)
    el.appendChild(nodes)

    const selector =
      splitType === 'chars'
        ? '.split-char'
        : splitType === 'words'
        ? '.split-word'
        : splitType === 'words, chars'
        ? '.split-char'
        : '.split-line'

    const targets: HTMLElement[] = Array.from(nodes.querySelectorAll<HTMLElement>(selector))
    if (targets.length === 0) return

    // hint performa
    targets.forEach((t) => (t.style.willChange = 'transform, opacity'))

    // jika prefers-reduced-motion, langsung set ke 'to'
    if (reduced) {
      gsap.set(targets, { ...to, clearProps: 'willChange' })
      onLetterAnimationComplete?.()
      return
    }

    // hitung start area untuk ScrollTrigger dari threshold + rootMargin
    const startPct = (1 - threshold) * 100
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin)
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px'
    const sign = marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`
    const start = `top ${startPct}%${sign}`

    const tl = gsap.timeline({
      ...(startOnVisible
        ? {
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: 'play none none none',
              once,
              invalidateOnRefresh: true,
              onEnter: (self: ScrollTriggerInstance) => {
                createdTriggerRef.current = self
              },
            },
          }
        : {}),
      onComplete: () => {
        gsap.set(targets, { ...to, clearProps: 'willChange', immediateRender: true })
        onLetterAnimationComplete?.()
      },
      smoothChildTiming: true,
    })

    tl.set(targets, { ...from, immediateRender: false, force3D: true })
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    })

    if (!startOnVisible) {
      tl.play(0)
    }

    return () => {
      tl.kill()
      if (createdTriggerRef.current) {
        createdTriggerRef.current.kill()
        createdTriggerRef.current = null
      }
      gsap.killTweensOf(targets)
      el.innerHTML = originalHTML.current
    }
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    reduced,
    onLetterAnimationComplete,
    startOnVisible,
    once,
  ])

  return (
    <Tag
      ref={hostRef as any}
      className={['split-parent', className].join(' ')}
      style={{
        textAlign,
        wordWrap: 'break-word',
        paddingBottom: '0.2em', // ruang kecil untuk descenders
        overflow: 'visible',
      }}
    >
      {text}
    </Tag>
  )
}
