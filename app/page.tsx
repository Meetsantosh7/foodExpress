import { Search, MapPin, Clock, Star, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredRestaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "25-30 min",
    deliveryFee: "$2.99",
    image: "/images/restaurant-pizza-palace.svg",
    offer: "20% OFF",
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
  },
]

const cuisineTypes = [
  { name: "Pizza", image: "/images/cuisine-pizza.svg", count: "120+ restaurants" },
  { name: "Burgers", image: "/images/cuisine-burger.svg", count: "85+ restaurants" },
  { name: "Chinese", image: "/images/cuisine-chinese.svg", count: "95+ restaurants" },
  { name: "Indian", image: "/images/cuisine-indian.svg", count: "110+ restaurants" },
  { name: "Italian", image: "/images/cuisine-italian.svg", count: "75+ restaurants" },
  { name: "Mexican", image: "/images/cuisine-mexican.svg", count: "60+ restaurants" },
]

export default function HomePage() {
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
              <Link href="/restaurants" className="text-gray-600 hover:text-gray-900">
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Delicious food, delivered fast</h1>
          <p className="text-xl mb-8 opacity-90">
            Order from your favorite restaurants and get it delivered in minutes
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg p-2 flex items-center shadow-lg">
            <MapPin className="h-5 w-5 text-gray-400 ml-3" />
            <Input
              placeholder="Enter your delivery address"
              className="border-0 flex-1 text-gray-900 focus-visible:ring-0"
            />
            <div className="w-px h-8 bg-gray-300 mx-2" />
            <Search className="h-5 w-5 text-gray-400 ml-3" />
            <Input
              placeholder="Search for restaurants or food"
              className="border-0 flex-1 text-gray-900 focus-visible:ring-0"
            />
            <Button className="bg-red-600 hover:bg-red-700 px-8">Search</Button>
          </div>
        </div>
      </section>

      {/* Cuisine Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What's on your mind?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {cuisineTypes.map((cuisine) => (
              <Link key={cuisine.name} href={`/restaurants?cuisine=${cuisine.name.toLowerCase()}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center p-6">
                  <CardContent className="p-0">
                    <Image
                      src={cuisine.image || "/placeholder.svg"}
                      alt={cuisine.name}
                      width={80}
                      height={80}
                      className="mx-auto mb-3 rounded-full object-cover"
                    />
                    <h3 className="font-semibold text-lg">{cuisine.name}</h3>
                    <p className="text-sm text-gray-500">{cuisine.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Popular restaurants</h2>
            <Link href="/restaurants">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
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
                    <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Truck className="h-4 w-4 mr-1" />
                        <span>{restaurant.deliveryFee}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why choose FoodieExpress?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your food delivered in 30 minutes or less</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
              <p className="text-gray-600">Only the best restaurants and highest quality ingredients</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Tracking</h3>
              <p className="text-gray-600">Track your order in real-time from kitchen to doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-red-400">FoodieExpress</h3>
              <p className="text-gray-400">
                Your favorite food delivery service, bringing delicious meals to your doorstep.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Restaurants</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/partner" className="hover:text-white">
                    Partner with us
                  </Link>
                </li>
                <li>
                  <Link href="/restaurant-app" className="hover:text-white">
                    Restaurant App
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FoodieExpress. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
