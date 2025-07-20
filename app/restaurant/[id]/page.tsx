"use client"

import { useState } from "react"
import { ArrowLeft, Star, Clock, Truck, MapPin, Plus, Minus, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const restaurant = {
  id: 1,
  name: "Pizza Palace",
  cuisine: "Italian",
  rating: 4.5,
  reviews: 1250,
  deliveryTime: "25-30 min",
  deliveryFee: "$2.99",
  image: "/images/restaurant-pizza-palace.svg",
  offer: "20% OFF",
  distance: "1.2 km",
  priceRange: "$$",
  address: "123 Main Street, Downtown",
  description: "Authentic Italian pizzas made with fresh ingredients and traditional recipes. Family-owned since 1985.",
}

const menuCategories = [
  {
    name: "Popular",
    items: [
      {
        id: 1,
        name: "Margherita Pizza",
        description: "Fresh tomatoes, mozzarella, basil, olive oil",
        price: 16.99,
        image: "/images/pizza-margherita.svg",
        popular: true,
      },
      {
        id: 2,
        name: "Pepperoni Pizza",
        description: "Pepperoni, mozzarella, tomato sauce",
        price: 18.99,
        image: "/images/pizza-pepperoni.svg",
        popular: true,
      },
    ],
  },
  {
    name: "Pizzas",
    items: [
      {
        id: 3,
        name: "Supreme Pizza",
        description: "Pepperoni, sausage, bell peppers, onions, mushrooms",
        price: 22.99,
        image: "/images/pizza-supreme.svg",
      },
      {
        id: 4,
        name: "Hawaiian Pizza",
        description: "Ham, pineapple, mozzarella, tomato sauce",
        price: 19.99,
        image: "/images/pizza-hawaiian.svg",
      },
      {
        id: 5,
        name: "Veggie Deluxe",
        description: "Bell peppers, mushrooms, onions, olives, tomatoes",
        price: 17.99,
        image: "/images/pizza-veggie.svg",
      },
    ],
  },
  {
    name: "Appetizers",
    items: [
      {
        id: 6,
        name: "Garlic Bread",
        description: "Fresh baked bread with garlic butter and herbs",
        price: 6.99,
        image: "/images/garlic-bread.svg",
      },
      {
        id: 7,
        name: "Mozzarella Sticks",
        description: "Crispy breaded mozzarella with marinara sauce",
        price: 8.99,
        image: "/images/mozzarella-sticks.svg",
      },
    ],
  },
  {
    name: "Beverages",
    items: [
      {
        id: 8,
        name: "Coca Cola",
        description: "Classic refreshing cola",
        price: 2.99,
        image: "/images/coca-cola.svg",
      },
      {
        id: 9,
        name: "Italian Soda",
        description: "Sparkling water with natural fruit flavors",
        price: 3.99,
        image: "/images/italian-soda.svg",
      },
    ],
  },
]

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function RestaurantPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeCategory, setActiveCategory] = useState("Popular")

  const addToCart = (item: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      return prevCart.reduce((acc, cartItem) => {
        if (cartItem.id === itemId) {
          if (cartItem.quantity > 1) {
            acc.push({ ...cartItem, quantity: cartItem.quantity - 1 })
          }
        } else {
          acc.push(cartItem)
        }
        return acc
      }, [] as CartItem[])
    })
  }

  const getItemQuantity = (itemId: number) => {
    const item = cart.find((cartItem) => cartItem.id === itemId)
    return item ? item.quantity : 0
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/restaurants" className="mr-4">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/" className="text-2xl font-bold text-red-600">
                FoodieExpress
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {getTotalItems() > 0 && (
                <Link href="/cart">
                  <Button className="relative">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart ({getTotalItems()})
                    <Badge className="absolute -top-2 -right-2 bg-red-600">{getTotalItems()}</Badge>
                  </Button>
                </Link>
              )}
              <Button variant="ghost">Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Restaurant Header */}
      <div className="relative">
        <Image
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          width={800}
          height={300}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <Badge className="bg-green-600 mb-2">{restaurant.offer}</Badge>
            <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-lg opacity-90 mb-4">{restaurant.description}</p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="font-medium">{restaurant.rating}</span>
                <span className="ml-1">({restaurant.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center">
                <Truck className="h-4 w-4 mr-1" />
                <span>{restaurant.deliveryFee}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{restaurant.distance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {menuCategories.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuCategories.map((category) => (
            <TabsContent key={category.name} value={category.name}>
              <div className="grid gap-6">
                {category.items.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-2 flex items-center">
                                {item.name}
                                {"popular" in item && item.popular && (
                                  <Badge variant="secondary" className="ml-2 text-xs">
                                    Popular
                                  </Badge>
                                )}
                              </h3>
                              <p className="text-gray-600 mb-4">{item.description}</p>
                              <p className="text-xl font-bold text-green-600">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="w-32 relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={150}
                            height={150}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute bottom-2 right-2">
                            {getItemQuantity(item.id) === 0 ? (
                              <Button
                                size="sm"
                                onClick={() => addToCart(item)}
                                className="bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            ) : (
                              <div className="flex items-center bg-white rounded-md border border-red-600">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-600 hover:bg-red-50 px-2"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="px-2 text-sm font-medium text-red-600">
                                  {getItemQuantity(item.id)}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => addToCart(item)}
                                  className="text-red-600 hover:bg-red-50 px-2"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Floating Cart Summary */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50">
          <div className="container mx-auto max-w-md">
            <Link href="/cart">
              <Card className="bg-red-600 text-white cursor-pointer hover:bg-red-700 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      <span className="font-medium">
                        {getTotalItems()} item{getTotalItems() > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${getTotalPrice().toFixed(2)}</div>
                      <div className="text-sm opacity-90">View Cart</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
