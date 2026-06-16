"use client"

import { motion } from "framer-motion"
import { Star, Clock, Bike, BadgePercent } from "lucide-react"
import type { Restaurant } from "@/lib/data"
import { formatWon } from "@/lib/data"

export function RestaurantList({
  restaurants,
  onSelect,
}: {
  restaurants: Restaurant[]
  onSelect: (r: Restaurant) => void
}) {
  return (
    <div className="px-5 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-6"
      >
        <p className="text-sm font-medium text-primary">Delivering to</p>
        <h1 className="text-pretty text-2xl font-bold tracking-tight text-foreground">
          Your couch, obviously
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Order anything you want. Spend nothing. Receive nothing. Feel amazing.
        </p>
      </motion.div>

      <h2 className="mt-7 mb-3 text-base font-semibold text-foreground">
        Popular near you
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {restaurants.map((r, i) => (
          <motion.button
            key={r.id}
            type="button"
            onClick={() => onSelect(r)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="group overflow-hidden rounded-3xl bg-card text-left shadow-sm ring-1 ring-border transition-shadow hover:shadow-xl"
          >
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={r.image || "/placeholder.svg"}
                alt={r.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                <BadgePercent className="h-3.5 w-3.5 text-accent" />
                {r.tag}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-bold text-foreground">{r.name}</h3>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-sm font-semibold text-secondary-foreground">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  {r.rating}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{r.cuisine}</p>
              <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {r.deliveryTime}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Bike className="h-4 w-4" />
                  {r.deliveryFee === 0 ? "Free" : formatWon(r.deliveryFee)}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
