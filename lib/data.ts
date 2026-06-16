export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  calories: number
  image: string
}

export type CartEntry = {
  item: MenuItem
  qty: number
}

export type Restaurant = {
  id: string
  name: string
  cuisine: string
  rating: number
  reviews: number
  deliveryTime: string
  deliveryFee: number
  image: string
  tag: string
  menu: MenuItem[]
}

// Prices are in Korean Won (₩) to lean into the Baemin-style vibe.
export const restaurants: Restaurant[] = [
  {
    id: "smash-house",
    name: "Smash House",
    cuisine: "Burgers · American",
    rating: 4.8,
    reviews: 1243,
    deliveryTime: "20–30 min",
    deliveryFee: 0,
    image: "/restaurants/burger.png",
    tag: "Free delivery",
    menu: [
      {
        id: "double-smash",
        name: "Double Smash Burger",
        description: "Two seared patties, melted cheddar, house sauce.",
        price: 12900,
        calories: 780,
        image: "/menu/smash-burger.png",
      },
      {
        id: "loaded-fries",
        name: "Loaded Cheese Fries",
        description: "Crispy fries, molten cheese, smoky bacon bits.",
        price: 7500,
        calories: 540,
        image: "/menu/loaded-fries.png",
      },
      {
        id: "choc-shake",
        name: "Chocolate Milkshake",
        description: "Thick hand-spun shake with whipped cream.",
        price: 5900,
        calories: 430,
        image: "/menu/milkshake.png",
      },
    ],
  },
  {
    id: "sushi-zen",
    name: "Sushi Zen",
    cuisine: "Sushi · Japanese",
    rating: 4.9,
    reviews: 982,
    deliveryTime: "25–35 min",
    deliveryFee: 3000,
    image: "/restaurants/sushi.png",
    tag: "Top rated",
    menu: [
      {
        id: "salmon-nigiri",
        name: "Salmon Nigiri Set",
        description: "Six pieces of buttery fresh salmon over rice.",
        price: 15900,
        calories: 420,
        image: "/menu/nigiri.png",
      },
      {
        id: "spicy-tuna",
        name: "Spicy Tuna Roll",
        description: "Tuna, chili mayo, cucumber crunch, eight pieces.",
        price: 11900,
        calories: 360,
        image: "/menu/spicy-tuna-roll.png",
      },
      {
        id: "miso-soup",
        name: "Miso Soup",
        description: "Warm dashi broth, silky tofu, seaweed, scallion.",
        price: 3500,
        calories: 90,
        image: "/menu/miso-soup.png",
      },
    ],
  },
  {
    id: "seoul-chicken",
    name: "Seoul Chicken",
    cuisine: "Fried Chicken · Korean",
    rating: 4.7,
    reviews: 2105,
    deliveryTime: "30–40 min",
    deliveryFee: 2000,
    image: "/restaurants/korean.png",
    tag: "Trending now",
    menu: [
      {
        id: "kfc",
        name: "Korean Fried Chicken",
        description: "Double-fried wings glazed in sweet-spicy gochujang.",
        price: 18900,
        calories: 910,
        image: "/menu/fried-chicken.png",
      },
      {
        id: "tteokbokki",
        name: "Tteokbokki",
        description: "Chewy rice cakes simmered in fiery red sauce.",
        price: 8900,
        calories: 480,
        image: "/menu/tteokbokki.png",
      },
      {
        id: "kimbap",
        name: "Kimbap Roll",
        description: "Seaweed rice roll packed with veggies and egg.",
        price: 6500,
        calories: 320,
        image: "/menu/kimbap.png",
      },
    ],
  },
  {
    id: "forno-pizza",
    name: "Forno Pizza",
    cuisine: "Pizza · Italian",
    rating: 4.6,
    reviews: 1567,
    deliveryTime: "25–35 min",
    deliveryFee: 0,
    image: "/restaurants/pizza.png",
    tag: "Free delivery",
    menu: [
      {
        id: "margherita",
        name: "Margherita",
        description: "San Marzano tomato, fresh basil, fior di latte.",
        price: 13900,
        calories: 690,
        image: "/menu/margherita.png",
      },
      {
        id: "pepperoni",
        name: "Pepperoni",
        description: "Crispy cup pepperoni over bubbling mozzarella.",
        price: 15900,
        calories: 820,
        image: "/menu/pepperoni.png",
      },
      {
        id: "garlic-knots",
        name: "Garlic Knots",
        description: "Golden knots brushed with garlic herb butter.",
        price: 5500,
        calories: 410,
        image: "/menu/garlic-knots.png",
      },
    ],
  },
]

export function formatWon(amount: number): string {
  return "₩" + amount.toLocaleString("ko-KR")
}
