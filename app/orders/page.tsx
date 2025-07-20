"use client"

import { useState } from "react"
import { ArrowLeft, Clock, CheckCircle, Truck, MapPin, Phone, Star, RotateCcw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
  image: string
}

interface Order {
  id: string
  restaurantName: string
  restaurantImage: string
  items: OrderItem[]
  status: "preparing" | "on-the-way" | "delivered" | "cancelled"
  orderDate: string
  deliveryTime: string
  total: number
  deliveryAddress: string
  paymentMethod: string
  orderNumber: string
  estimatedDelivery?: string
  deliveryPerson?: {
    name: string
    phone: string
    rating: number
  }
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    restaurantName: "Pizza Palace",
    restaurantImage: "/images/restaurant-pizza-palace.svg",
    items: [
      {
        id: 1,
        name: "Margherita Pizza",
        quantity: 2,
        price: 16.99,
        image: "/images/pizza-margherita.svg",
      },
      {
        id: 2,
        name: "Garlic Bread",
        quantity: 1,
        price: 6.99,
        image: "/images/garlic-bread.svg",
      },
    ],
    status: "on-the-way",
    orderDate: "2024-01-20T14:30:00Z",
    deliveryTime: "25-30 min",
    total: 43.97,
    deliveryAddress: "123 Main Street, Downtown",
    paymentMethod: "Credit Card",
    estimatedDelivery: "3:15 PM",
    deliveryPerson: {
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      rating: 4.8,
    },
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    restaurantName: "Burger Barn",
    restaurantImage: "/images/restaurant-burger-barn.svg",
    items: [
      {
        id: 3,
        name: "Classic Burger",
        quantity: 1,
        price: 12.99,
        image: "/images/burger-classic.svg",
      },
      {
        id: 4,
        name: "French Fries",
        quantity: 1,
        price: 4.99,
        image: "/images/french-fries.svg",
      },
    ],
    status: "preparing",
    orderDate: "2024-01-20T13:45:00Z",
    deliveryTime: "20-25 min",
    total: 20.97,
    deliveryAddress: "123 Main Street, Downtown",
    paymentMethod: "PayPal",
    estimatedDelivery: "3:00 PM",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    restaurantName: "Sushi Zen",
    restaurantImage: "/images/restaurant-sushi-zen.svg",
    items: [
      {
        id: 5,
        name: "California Roll",
        quantity: 2,
        price: 8.99,
        image: "/images/sushi-roll.svg",
      },
      {
        id: 6,
        name: "Miso Soup",
        quantity: 1,
        price: 3.99,
        image: "/images/miso-soup.svg",
      },
    ],
    status: "delivered",
    orderDate: "2024-01-19T19:20:00Z",
    deliveryTime: "30-35 min",
    total: 24.97,
    deliveryAddress: "123 Main Street, Downtown",
    paymentMethod: "Credit Card",
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    restaurantName: "Taco Fiesta",
    restaurantImage: "/images/restaurant-taco-fiesta.svg",
    items: [
      {
        id: 7,
        name: "Chicken Tacos",
        quantity: 3,
        price: 2.99,
        image: "/images/tacos-chicken.svg",
      },
    ],
    status: "cancelled",
    orderDate: "2024-01-18T12:15:00Z",
    deliveryTime: "15-20 min",
    total: 11.96,
    deliveryAddress: "123 Main Street, Downtown",
    paymentMethod: "Credit Card",
  },
]

const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "preparing":
      return "bg-yellow-100 text-yellow-800"
    case "on-the-way":
      return "bg-blue-100 text-blue-800"
    case "delivered":
      return "bg-green-100 text-green-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: Order["status"]) => {
  switch (status) {
    case "preparing":
      return <Clock className="h-4 w-4" />
    case "on-the-way":
      return <Truck className="h-4 w-4" />
    case "delivered":
      return <CheckCircle className="h-4 w-4" />
    case "cancelled":
      return <RotateCcw className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

const getStatusProgress = (status: Order["status"]) => {
  switch (status) {
    case "preparing":
      return 25
    case "on-the-way":
      return 75
    case "delivered":
      return 100
    case "cancelled":
      return 0
    default:
      return 0
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filterOrders = (status?: Order["status"]) => {
    if (!status) return mockOrders
    return mockOrders.filter((order) => order.status === status)
  }

  const getFilteredOrders = () => {
    switch (activeTab) {
      case "active":
        return mockOrders.filter((order) => order.status === "preparing" || order.status === "on-the-way")
      case "delivered":
        return filterOrders("delivered")
      case "cancelled":
        return filterOrders("cancelled")
      default:
        return mockOrders
    }
  }

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={order.restaurantImage || "/placeholder.svg"}
              alt={order.restaurantName}
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />
            <div>
              <CardTitle className="text-lg">{order.restaurantName}</CardTitle>
              <p className="text-sm text-gray-600">Order #{order.orderNumber}</p>
              <p className="text-sm text-gray-500">{formatDate(order.orderDate)}</p>
            </div>
          </div>
          <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1`}>
            {getStatusIcon(order.status)}
            <span className="capitalize">{order.status.replace("-", " ")}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {/* Order Progress */}
        {(order.status === "preparing" || order.status === "on-the-way") && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Order Progress</span>
              <span>{order.estimatedDelivery && `Est. ${order.estimatedDelivery}`}</span>
            </div>
            <Progress value={getStatusProgress(order.status)} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Order Placed</span>
              <span>Preparing</span>
              <span>On the way</span>
              <span>Delivered</span>
            </div>
          </div>
        )}

        {/* Delivery Person Info */}
        {order.status === "on-the-way" && order.deliveryPerson && (
          <Card className="mb-4 bg-blue-50 border-blue-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Your delivery partner</p>
                  <p className="text-sm">{order.deliveryPerson.name}</p>
                  <div className="flex items-center text-xs text-gray-600">
                    <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                    <span>{order.deliveryPerson.rating}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="flex items-center space-x-1 bg-transparent">
                  <Phone className="h-3 w-3" />
                  <span>Call</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Items */}
        <div className="space-y-2 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="rounded object-cover"
                />
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <Separator className="my-3" />

        {/* Order Summary */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            <div className="flex items-center mb-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{order.deliveryAddress}</span>
            </div>
            <p>Payment: {order.paymentMethod}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
            <p className="text-sm text-gray-600">{order.items.length} items</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {order.status === "delivered" && (
            <>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                Rate Order
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                Reorder
              </Button>
            </>
          )}
          {order.status === "on-the-way" && (
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              Track Order
            </Button>
          )}
          {order.status === "preparing" && (
            <Button variant="outline" size="sm" className="flex-1 bg-transparent" disabled>
              Cancel Order
            </Button>
          )}
          <Button variant="ghost" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="mr-4">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/" className="text-2xl font-bold text-red-600">
                FoodieExpress
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/restaurants" className="text-gray-600 hover:text-gray-900">
                Restaurants
              </Link>
              <Link href="/orders" className="text-red-600 font-medium">
                Orders
              </Link>
              <Link href="/help" className="text-gray-600 hover:text-gray-900">
                Help
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Sign In</Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

          {/* Order Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {getFilteredOrders().length === 0 ? (
                <div className="text-center py-12">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="No orders"
                    width={200}
                    height={200}
                    className="mx-auto mb-6 opacity-50"
                  />
                  <h3 className="text-xl font-semibold mb-2">No orders found</h3>
                  <p className="text-gray-600 mb-6">
                    {activeTab === "all" ? "You haven't placed any orders yet." : `No ${activeTab} orders found.`}
                  </p>
                  <Link href="/restaurants">
                    <Button className="bg-red-600 hover:bg-red-700">Browse Restaurants</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {getFilteredOrders().map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
