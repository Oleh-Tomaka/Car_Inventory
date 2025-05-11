import Link from "next/link"
import { Search, ChevronDown, Phone, Car } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between py-4">
        <div className="text-2xl font-bold">LOGO</div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="font-medium">
            Home
          </Link>
          <Link href="/sdp" className="font-medium">
            Inventory
          </Link>
          <Link href="/blog" className="font-medium">
            Blog
          </Link>
          <Link href="/shop" className="font-medium">
            Shop
          </Link>
          <Link href="/contact" className="font-medium">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="rounded-full">
            Call Us
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Car
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse through our extensive collection of premium vehicles and find the perfect match for your lifestyle.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/sdp">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                Browse Inventory
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Sell Your Car
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Car className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Choose from thousands of vehicles across all makes and models.</p>
            </div>
            <div className="text-center p-6">
              <Phone className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our team is always ready to assist you with any questions.</p>
            </div>
            <div className="text-center p-6">
              <Search className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-gray-600">Find your perfect car with our advanced search features.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Car?</h2>
          <p className="text-xl mb-8">Start browsing our inventory today!</p>
          <Link href="/sdp">
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black">
              View Inventory
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">© 2024 Your Car Dealership. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
