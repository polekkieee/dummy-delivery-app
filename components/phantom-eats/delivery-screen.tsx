"use client"

import { motion } from "framer-motion"
import { Loader2, Bike, MapPin, Home } from "lucide-react"

export function VerifyingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background px-8"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <Loader2 className="h-14 w-14 text-primary" />
      </motion.div>
      <div className="text-center">
        <p className="text-lg font-bold text-foreground">Verifying bank details…</p>
        <p className="mt-1 text-sm text-muted-foreground">
          (We are not. There is no bank. Relax.)
        </p>
      </div>
    </motion.div>
  )
}

export function DeliveryScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-background px-6"
    >
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Order on the way
        </p>
        <h2 className="text-pretty text-2xl font-bold text-foreground">
          Your phantom rider is zooming over
        </h2>
      </div>

      {/* Map graphic */}
      <div className="relative h-56 w-full max-w-sm overflow-hidden rounded-3xl bg-secondary ring-1 ring-border">
        {/* faux map grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* route line */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 360 224"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M30 180 C 110 180, 110 70, 200 70 S 300 60, 330 44"
            stroke="var(--color-primary)"
            strokeWidth="4"
            strokeDasharray="8 10"
            strokeLinecap="round"
          />
        </svg>

        {/* restaurant pin */}
        <div className="absolute right-5 top-4 inline-flex flex-col items-center text-primary">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
            <MapPin className="h-5 w-5" />
          </span>
        </div>
        {/* home pin */}
        <div className="absolute bottom-8 left-4 inline-flex flex-col items-center text-foreground">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-card text-foreground shadow-md ring-1 ring-border">
            <Home className="h-5 w-5" />
          </span>
        </div>

        {/* scooter moving across */}
        <motion.div
          initial={{ left: "8%", top: "76%" }}
          animate={{ left: ["8%", "52%", "88%"], top: ["76%", "28%", "16%"] }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute"
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.4, repeat: Number.POSITIVE_INFINITY }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg"
          >
            <Bike className="h-6 w-6" />
          </motion.span>
        </motion.div>
      </div>

      <p className="animate-pulse text-sm text-muted-foreground">
        Estimated arrival: never · Cost so far: ₩0
      </p>
    </motion.div>
  )
}
