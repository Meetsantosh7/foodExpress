"use client"

import { useState } from "react"
import { Search, Filter, MapPin, Clock, Star, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "25-30 min",
    deliveryFee: "$2.99",
    image: "/images/restaurant-pizza-palace.svg",
    offer: "20% OFF",
    distance: "1.2 km",
    priceRange: "$$",
  },
  {
    id: 2,
    name: "Burger Barn",
    cuisine: "American",
    rating: 4.3,
    deliveryTime: "20-25 min",
    deliveryFee: "$1.99",
    image: "/images/restaurant-burger-barn.svg",
    offer: "Free Delivery",
    distance: "0.8 km",
    priceRange: "$",
  },
  {
    id: 3,
    name: "Sushi Zen",
    cuisine: "Japanese",
    rating: 4.7,
    deliveryTime: "30-35 min",
    deliveryFee: "$3.99",
    image: "/images/restaurant-sushi-zen.svg",
    offer: "15% OFF",
    distance: "2.1 km",
    priceRange: "$$$",
  },
  {
    id: 4,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.4,
    deliveryTime: "15-20 min",
    deliveryFee: "$2.49",
    image: "/images/restaurant-taco-fiesta.svg",
    offer: "Buy 1 Get 1",
    distance: "1.5 km",
    priceRange: "$",
  },
  {
    id: 5,
    name: "Dragon Palace",
    cuisine: "Chinese",
    rating: 4.2,
    deliveryTime: "25-30 min",
    deliveryFee: "$2.99",
    image: "/images/restaurant-dragon-palace.svg",
    offer: "10% OFF",
    distance: "1.8 km",
    priceRange: "$$",
  },
  {
    id: 6,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: "30-35 min",
    deliveryFee: "$3.49",
    image: "/images/restaurant-spice-garden.svg",
    offer: "Free Delivery",
    distance: "2.3 km",
    priceRange: "$$",
  },
]

export default function RestaurantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("rating")

  const cuisines = ["Italian", "American", "Japanese", "Mexican", "Chinese", "Indian"]

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCuisine = selectedCuisines.length === 0 || selectedCuisines.includes(restaurant.cuisine)
    return matchesSearch && matchesCuisine
  })

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "deliveryTime":
        return Number.parseInt(a.deliveryTime) - Number.parseInt(b.deliveryTime)
      case "distance":
        return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
      default:
        return 0
    }
  })

  const handleCuisineChange = (cuisine: string, checked: boolean) => {
    if (checked) {
      setSelectedCuisines([...selectedCuisines, cuisine])
    } else {
      setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-red-600">
              FoodieExpress
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/restaurants" className="text-red-600 font-medium">
                Restaurants
              </Link>
              <Link href="/orders" className="text-gray-600 hover:text-gray-900">
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search restaurants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="deliveryTime">Delivery Time</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cuisines */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Cuisines</label>
                <div className="space-y-2">
                  {cuisines.map((cuisine) => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox
                        id={cuisine}
                        checked={selectedCuisines.includes(cuisine)}
                        onCheckedChange={(checked) => handleCuisineChange(cuisine, checked as boolean)}
                      />
                      <label htmlFor={cuisine} className="text-sm">
                        {cuisine}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Restaurant Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Restaurants ({sortedRestaurants.length})</h1>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                Delivering to Downtown
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedRestaurants.map((restaurant) => (
                <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden h-full">
                    <div className="relative">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-green-600">{restaurant.offer}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{restaurant.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {restaurant.cuisine} • {restaurant.priceRange}
                      </p>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{restaurant.deliveryTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Truck className="h-4 w-4 mr-1" />
                          <span>{restaurant.deliveryFee}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{restaurant.distance}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {sortedRestaurants.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No restaurants found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCuisines([])
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
