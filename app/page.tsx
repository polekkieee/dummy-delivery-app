"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Ghost } from "lucide-react"
import { restaurants, type CartEntry, type MenuItem, type Restaurant } from "@/lib/data"
import { RestaurantList } from "@/components/phantom-eats/restaurant-list"
import { MenuView } from "@/components/phantom-eats/menu-view"
import { CartButton } from "@/components/phantom-eats/cart-button"
import { CheckoutSheet } from "@/components/phantom-eats/checkout-sheet"
import { VerifyingScreen, DeliveryScreen } from "@/components/phantom-eats/delivery-screen"
import { CompleteModal } from "@/components/phantom-eats/complete-modal"

type Stage = "browsing" | "cart" | "verifying" | "delivery" | "complete"

export default function Page() {
  const [selected, setSelected] = useState<Restaurant | null>(null)
  const [cart, setCart] = useState<Record<string, CartEntry>>({})
  const [stage, setStage] = useState<Stage>("browsing")
  // Snapshot of the order totals at checkout time so the celebration is accurate.
  const [summary, setSummary] = useState({ total: 0, calories: 0 })
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const entries = useMemo(() => Object.values(cart), [cart])
  const count = entries.reduce((n, e) => n + e.qty, 0)
  const subtotal = entries.reduce((n, e) => n + e.item.price * e.qty, 0)
  const totalCalories = entries.reduce((n, e) => n + e.item.calories * e.qty, 0)
  const deliveryFee = selected && count > 0 ? selected.deliveryFee : 0
  const total = subtotal + deliveryFee

  function addItem(item: MenuItem) {
    setCart((prev) => {
      const existing = prev[item.id]
      return { ...prev, [item.id]: { item, qty: (existing?.qty ?? 0) + 1 } }
    })
  }

  function decItem(itemId: string) {
    setCart((prev) => {
      const existing = prev[itemId]
      if (!existing) return prev
      if (existing.qty <= 1) {
        const { [itemId]: _removed, ...rest } = prev
        return rest
      }
      return { ...prev, [itemId]: { ...existing, qty: existing.qty - 1 } }
    })
  }

  function placeOrder() {
    setSummary({ total, calories: totalCalories })
    setStage("verifying")
    timers.current.push(
      setTimeout(() => setStage("delivery"), 2000),
      setTimeout(() => setStage("complete"), 5000),
    )
  }

  function reset() {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setCart({})
    setSelected(null)
    setStage("browsing")
  }

  return (
    <main className="mx-auto min-h-dvh max-w-md bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center gap-2 bg-background/80 px-5 py-4 backdrop-blur">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Ghost className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <p className="text-base font-extrabold tracking-tight text-foreground">
            Phantom Eats
          </p>
          <p className="text-[11px] text-muted-foreground">order nothing · feel everything</p>
        </div>
      </header>

      {/* Main views */}
      <AnimatePresence 
        mode="wait" 
        onExitComplete={() => window.scrollTo(0, 0)} 
      >
        {selected ? (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <MenuView
              restaurant={selected}
              onBack={() => setSelected(null)}
              onAdd={addItem}
              cartQty={(id) => cart[id]?.qty ?? 0}
            />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.25 }}
          >
            <RestaurantList restaurants={restaurants} onSelect={setSelected} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating cart */}
      <CartButton
        count={stage === "browsing" ? count : 0}
        total={total}
        onClick={() => setStage("cart")}
      />

      {/* Overlays */}
      <AnimatePresence>
        {stage === "cart" && (
          <CheckoutSheet
            key="cart"
            entries={entries}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            totalCalories={totalCalories}
            onClose={() => setStage("browsing")}
            onInc={(id) => addItem(cart[id].item)}
            onDec={decItem}
            onPlaceOrder={placeOrder}
          />
        )}
        {stage === "verifying" && <VerifyingScreen key="verifying" />}
        {stage === "delivery" && <DeliveryScreen key="delivery" />}
        {stage === "complete" && (
          <CompleteModal
            key="complete"
            total={summary.total}
            totalCalories={summary.calories}
            onReset={reset}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
