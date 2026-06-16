"use client"

import { motion } from "framer-motion"
import { X, Plus, Minus, Flame, ShieldCheck } from "lucide-react"
import type { CartEntry } from "@/lib/data"
import { formatWon } from "@/lib/data"

export function CheckoutSheet({
  entries,
  subtotal,
  deliveryFee,
  total,
  totalCalories,
  onClose,
  onInc,
  onDec,
  onPlaceOrder,
}: {
  entries: CartEntry[]
  subtotal: number
  deliveryFee: number
  total: number
  totalCalories: number
  onClose: () => void
  onInc: (itemId: string) => void
  onDec: (itemId: string) => void
  onPlaceOrder: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="relative flex max-h-[88vh] w-full max-w-md flex-col rounded-t-3xl bg-card"
        role="dialog"
        aria-label="Your cart"
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="text-lg font-bold text-foreground">Your order</h2>
          <motion.button
            type="button"
            onClick={onClose}
            whileTap={{ scale: 0.9 }}
            aria-label="Close cart"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="grid grid-cols-1 gap-3">
            {entries.map((e) => (
              <li
                key={e.item.id}
                className="flex items-center gap-3 rounded-2xl bg-secondary/60 p-3"
              >
                <img
                  src={e.item.image || "/placeholder.svg"}
                  alt={e.item.name}
                  className="h-14 w-14 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-foreground">{e.item.name}</p>
                  <p className="text-sm text-muted-foreground">{formatWon(e.item.price)}</p>
                </div>
                <div className="flex items-center gap-2.5 rounded-full bg-card px-1.5 py-1 ring-1 ring-border">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.85 }}
                    onClick={() => onDec(e.item.id)}
                    aria-label={`Remove one ${e.item.name}`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-foreground"
                  >
                    <Minus className="h-4 w-4" />
                  </motion.button>
                  <span className="w-4 text-center text-sm font-bold text-foreground">
                    {e.qty}
                  </span>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.85 }}
                    onClick={() => onInc(e.item.id)}
                    aria-label={`Add one ${e.item.name}`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2 rounded-2xl bg-secondary/60 p-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatWon(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery fee</span>
              <span>{deliveryFee === 0 ? "Free" : formatWon(deliveryFee)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold text-foreground">
              <span>Total</span>
              <span>{formatWon(total)}</span>
            </div>
            <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-accent" />
                Total damage
              </span>
              <span>{totalCalories.toLocaleString()} kcal</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border p-5">
          <motion.button
            type="button"
            onClick={onPlaceOrder}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30"
          >
            Place Order · {formatWon(total)}
          </motion.button>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            No card needed. No food incoming. Pure vibes.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
