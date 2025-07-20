"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, CreditCard, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

// Mock cart data - in a real app, this would come from state management
const cartItems = [
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

interface DeliveryAddress {
  street: string
  apartment: string
  city: string
  zipCode: string
  instructions: string
}

interface PaymentMethod {
  type: "card" | "paypal" | "cash"
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardholderName?: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    street: "123 Main Street",
    apartment: "Apt 4B",
    city: "Downtown",
    zipCode: "12345",
    instructions: "",
  })

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  const [selectedPaymentType, setSelectedPaymentType] = useState("card")
  const [deliveryInstructions, setDeliveryInstructions] = useState("")

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = 2.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + deliveryFee + tax

  const handleAddressChange = (field: keyof DeliveryAddress, value: string) => {
    setDeliveryAddress((prev) => ({ ...prev, [field]: value }))
  }

  const handlePaymentChange = (field: keyof PaymentMethod, value: string) => {
    setPaymentMethod((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.zipCode) {
      return false
    }

    if (selectedPaymentType === "card") {
      if (
        !paymentMethod.cardNumber ||
        !paymentMethod.expiryDate ||
        !paymentMethod.cvv ||
        !paymentMethod.cardholderName
      ) {
        return false
      }
    }

    return true
  }

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields")
      return
    }

    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate order number
    const orderNumber = `ORD-${Date.now()}`

    // Redirect to order confirmation
    router.push(`/order-confirmation?orderNumber=${orderNumber}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/cart" className="mr-4">
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="street">Street Address *</Label>
                      <Input
                        id="street"
                        value={deliveryAddress.street}
                        onChange={(e) => handleAddressChange("street", e.target.value)}
                        placeholder="Enter street address"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="apartment">Apartment/Suite</Label>
                      <Input
                        id="apartment"
                        value={deliveryAddress.apartment}
                        onChange={(e) => handleAddressChange("apartment", e.target.value)}
                        placeholder="Apt, suite, etc."
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={deliveryAddress.city}
                        onChange={(e) => handleAddressChange("city", e.target.value)}
                        placeholder="Enter city"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={deliveryAddress.zipCode}
                        onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                        placeholder="Enter ZIP code"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="instructions">Delivery Instructions</Label>
                    <Textarea
                      id="instructions"
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      placeholder="Any special instructions for delivery..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedPaymentType} onValueChange={setSelectedPaymentType}>
                    <div className="space-y-4">
                      {/* Credit Card */}
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center cursor-pointer">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Credit/Debit Card
                        </Label>
                      </div>

                      {selectedPaymentType === "card" && (
                        <div className="ml-6 space-y-4 p-4 border rounded-lg bg-gray-50">
                          <div>
                            <Label htmlFor="cardholderName">Cardholder Name *</Label>
                            <Input
                              id="cardholderName"
                              value={paymentMethod.cardholderName}
                              onChange={(e) => handlePaymentChange("cardholderName", e.target.value)}
                              placeholder="Enter cardholder name"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input
                              id="cardNumber"
                              value={paymentMethod.cardNumber}
                              onChange={(e) => handlePaymentChange("cardNumber", e.target.value)}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate">Expiry Date *</Label>
                              <Input
                                id="expiryDate"
                                value={paymentMethod.expiryDate}
                                onChange={(e) => handlePaymentChange("expiryDate", e.target.value)}
                                placeholder="MM/YY"
                                maxLength={5}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV *</Label>
                              <Input
                                id="cvv"
                                value={paymentMethod.cvv}
                                onChange={(e) => handlePaymentChange("cvv", e.target.value)}
                                placeholder="123"
                                maxLength={4}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PayPal */}
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                          <div className="w-4 h-4 mr-2 bg-blue-600 rounded-sm flex items-center justify-center">
                            <span className="text-white text-xs font-bold">P</span>
                          </div>
                          PayPal
                        </Label>
                      </div>

                      {/* Cash on Delivery */}
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex items-center cursor-pointer">
                          <div className="w-4 h-4 mr-2 bg-green-600 rounded-sm flex items-center justify-center">
                            <span className="text-white text-xs">$</span>
                          </div>
                          Cash on Delivery
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Delivery Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Delivery Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Estimated delivery: 25-30 minutes</p>
                      <p className="text-sm text-green-600">Your order will be delivered as soon as possible</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Items */}
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-600">{item.restaurant}</p>
                          <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* Price Breakdown */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      `Place Order • $${total.toFixed(2)}`
                    )}
                  </Button>

                  {/* Security Notice */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div className="text-xs text-gray-600">
                        <p className="font-medium mb-1">Secure Checkout</p>
                        <p>Your payment information is encrypted and secure. We never store your card details.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
