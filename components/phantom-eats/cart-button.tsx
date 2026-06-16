"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { formatWon } from "@/lib/data"

export function CartButton({
  count,
  total,
  onClick,
}: {
  count: number
  total: number
  onClick: () => void
}) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md px-5 pb-5"
        >
          <motion.button
            type="button"
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex w-full items-center justify-between rounded-2xl bg-primary px-5 py-4 text-primary-foreground shadow-xl shadow-primary/30"
          >
            <span className="flex items-center gap-3">
              <span className="relative inline-flex">
                <ShoppingBag className="h-6 w-6" />
                <motion.span
                  key={count}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground"
                >
                  {count}
                </motion.span>
              </span>
              <span className="font-semibold">View cart</span>
            </span>
            <span className="text-lg font-bold">{formatWon(total)}</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
