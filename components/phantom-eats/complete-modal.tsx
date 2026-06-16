"use client"

import { motion } from "framer-motion"
import { PartyPopper, Wallet, Flame, RotateCcw } from "lucide-react"
import { Confetti } from "./confetti"
import { formatWon } from "@/lib/data"

export function CompleteModal({
  total,
  totalCalories,
  onReset,
}: {
  total: number
  totalCalories: number
  onReset: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <Confetti />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-primary/10 backdrop-blur-sm"
        aria-hidden="true"
      />
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative z-[70] w-full max-w-sm rounded-3xl bg-card p-7 text-center shadow-2xl ring-1 ring-border"
        role="dialog"
        aria-label="Order complete"
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.1 }}
          className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <PartyPopper className="h-10 w-10" />
        </motion.div>

        <h2 className="mt-5 text-2xl font-bold text-foreground">Order Complete!</h2>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          You didn&apos;t actually order anything. You just saved your money and
          your waistline. Legend.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-secondary/70 p-4">
            <Wallet className="mx-auto h-6 w-6 text-primary" />
            <p className="mt-2 text-lg font-bold text-foreground">{formatWon(total)}</p>
            <p className="text-xs text-muted-foreground">money saved</p>
          </div>
          <div className="rounded-2xl bg-secondary/70 p-4">
            <Flame className="mx-auto h-6 w-6 text-accent" />
            <p className="mt-2 text-lg font-bold text-foreground">
              {totalCalories.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">kcal dodged</p>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={onReset}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-bold text-primary-foreground shadow-lg shadow-primary/30"
        >
          <RotateCcw className="h-5 w-5" />
          Reset and order again
        </motion.button>
      </motion.div>
    </div>
  )
}
