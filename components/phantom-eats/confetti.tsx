"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

const COLORS = [
  "var(--color-primary)",
  "var(--color-accent)",
  "#ffd166",
  "#06d6a0",
  "#118ab2",
]

type Piece = {
  id: number
  x: number
  delay: number
  duration: number
  rotate: number
  color: string
  size: number
  drift: number
}

export function Confetti({ count = 120 }: { count?: number }) {
  const pieces = useMemo<Piece[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2.4 + Math.random() * 1.8,
      rotate: Math.random() * 720 - 360,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 8,
      drift: Math.random() * 80 - 40,
    }))
  }, [count])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-5%] block rounded-[2px]"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size * 1.4,
            backgroundColor: p.color,
          }}
          initial={{ y: "-10vh", opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            x: p.drift,
            rotate: p.rotate,
            opacity: [1, 1, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 0.4,
          }}
        />
      ))}
    </div>
  )
}
