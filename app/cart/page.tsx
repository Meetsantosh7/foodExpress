"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Minus, Trash2, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// Mock cart data - in a real app, this would come from state management
const initialCartItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 16.99,
    quantity: 2,
    image: "/images/pizza-margherita.png",
    restaurant: "Pizza Palace",
  },
  {
    id: 2,
    name: "Garlic Bread",
    price: 6.99,
    quantity: 1,
    image: "/images/garlic-bread.png",
    restaurant: "Pizza Palace",
  },
]

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  restaurant: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== itemId))
    } else {
      setCartItems(cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(0.1) // 10% discount
    } else if (promoCode.toLowerCase() === "welcome20") {
      setDiscount(0.2) // 20% discount
    } else {
      setDiscount(0)
    }
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discountAmount = subtotal * discount
  const deliveryFee = 2.99
  const tax = (subtotal - discountAmount) * 0.08 // 8% tax
  const total = subtotal - discountAmount + deliveryFee + tax

  if (cartItems.length === 0) {
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
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Empty cart"
              width={200}
              height={200}
              className="mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/restaurants">
              <Button className="bg-red-600 hover:bg-red-700">Browse Restaurants</Button>
            </Link>
          </div>
        </div>
      </div>
    )
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
              <Button variant="ghost">Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Your Order</h1>

            {/* Delivery Info */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="font-medium">Delivering to</p>
                      <p className="text-sm text-gray-600">123 Main Street, Downtown</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>25-30 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cart Items */}
            <Card>
              <CardContent className="p-0">
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="p-4 flex items-center space-x-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.restaurant}</p>
                        <p className="font-bold text-green-600">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Apply
                    </Button>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-600 mt-2">
                      Promo code applied! {(discount * 100).toFixed(0)}% off
                    </p>
                  )}
                </div>

                <Separator className="my-4" />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Proceed to Checkout</Button>
                </Link>

                <div className="mt-4 text-center">
                  <Link href="/restaurants" className="text-sm text-red-600 hover:underline">
                    Add more items
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
