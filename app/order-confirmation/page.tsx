"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Clock, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useSearchParams } from "next/navigation"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("orderNumber")
  const [progress, setProgress] = useState(25)

  // Simulate order progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(50)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const orderDetails = {
    orderNumber: orderNumber || "ORD-2024-001",
    restaurantName: "Pizza Palace",
    restaurantImage: "/images/restaurant-pizza-palace.png",
    estimatedDelivery: "25-30 minutes",
    deliveryAddress: "123 Main Street, Apt 4B, Downtown, 12345",
    items: [
      {
        id: 1,
        name: "Margherita Pizza",
        quantity: 2,
        price: 16.99,
        image: "/images/pizza-margherita.png",
      },
      {
        id: 2,
        name: "Garlic Bread",
        quantity: 1,
        price: 6.99,
        image: "/images/garlic-bread.png",
      },
    ],
    total: 43.97,
    paymentMethod: "Credit Card ending in 1234",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-red-600">
              FoodieExpress
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/orders">
                <Button variant="outline">View All Orders</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600">Thank you for your order. We're preparing your delicious meal.</p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order Details</span>
                <Badge variant="secondary">#{orderDetails.orderNumber}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Restaurant Info */}
              <div className="flex items-center space-x-4 mb-6">
                <Image
                  src={orderDetails.restaurantImage || "/placeholder.svg"}
                  alt={orderDetails.restaurantName}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{orderDetails.restaurantName}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Estimated delivery: {orderDetails.estimatedDelivery}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{orderDetails.deliveryAddress}</span>
                  </div>
                </div>
              </div>

              {/* Order Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Order Progress</span>
                  <span className="text-green-600">Preparing your order...</span>
                </div>
                <Progress value={progress} className="h-3 mb-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Order Placed</span>
                  <span>Preparing</span>
                  <span>On the way</span>
                  <span>Delivered</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold">Items Ordered:</h4>
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Payment Info */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Total Paid:</span>
                  <span className="text-xl font-bold text-green-600">${orderDetails.total.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600">Payment method: {orderDetails.paymentMethod}</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link href="/orders">
              <Button variant="outline" className="w-full bg-transparent">
                Track Your Order
              </Button>
            </Link>
            <Link href="/restaurants">
              <Button className="w-full bg-red-600 hover:bg-red-700">Order Again</Button>
            </Link>
          </div>

          {/* Help Section */}
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <h4 className="font-semibold mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  If you have any questions about your order, our support team is here to help.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Support
                  </Button>
                  <Link href="/help">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Help Center
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
