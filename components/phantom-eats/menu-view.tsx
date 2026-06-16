"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Star, Clock, Flame, Plus, Check } from "lucide-react"
import type { Restaurant, MenuItem } from "@/lib/data"
import { formatWon } from "@/lib/data"

export function MenuView({
  restaurant,
  onBack,
  onAdd,
  cartQty,
}: {
  restaurant: Restaurant
  onBack: () => void
  onAdd: (item: MenuItem) => void
  cartQty: (itemId: string) => number
}) {
  return (
    <div className="pb-32">
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <motion.button
          type="button"
          onClick={onBack}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to restaurants"
          className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md backdrop-blur"
        >
          <ArrowLeft className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="-mt-8 rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border z-50"
        >
          <h1 className="text-2xl font-bold text-foreground">{restaurant.name}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{restaurant.cuisine}</p>
          <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-foreground">{restaurant.rating}</span>
              ({restaurant.reviews.toLocaleString()})
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {restaurant.deliveryTime}
            </span>
          </div>
        </motion.div>

        <h2 className="mb-3 mt-7 text-base font-semibold text-foreground">Menu</h2>

        <div className="grid grid-cols-1 gap-3">
          {restaurant.menu.map((item, i) => {
            const qty = cartQty(item.id)
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex items-center gap-4 rounded-2xl bg-card p-3 ring-1 ring-border"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="h-20 w-20 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-1.5 flex items-center gap-3">
                    <span className="font-bold text-foreground">{formatWon(item.price)}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Flame className="h-3.5 w-3.5 text-accent" />
                      {item.calories} kcal
                    </span>
                  </div>
                </div>
                <motion.button
                  type="button"
                  onClick={() => onAdd(item)}
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.08 }}
                  aria-label={`Add ${item.name} to cart`}
                  className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/30"
                >
                  {qty > 0 ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground">
                        {qty}
                      </span>
                    </>
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
