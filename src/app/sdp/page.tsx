import Link from "next/link"
import { Search, ChevronDown, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CarListing from "@/components/car-listing"
import FilterSidebar from "@/components/filter-sidebar"
import Pagination from "@/components/pagination"

export default function SearchDetailPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between py-4">
        <div className="text-2xl font-bold">LOGO</div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="font-medium">
            Home
          </Link>
          <Link href="/inventory" className="font-medium">
            Inventory
          </Link>
          <Link href="/blog" className="font-medium">
            Blog
          </Link>
          <Link href="/shop" className="font-medium">
            Shop
          </Link>
          <div className="relative group">
            <button className="flex items-center font-medium">
              Pages <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
          <Link href="/contact" className="font-medium">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input className="pl-10 pr-4 rounded-full" placeholder="Search Cars eg. Audi Q7" />
          </div>
          <Button variant="outline" className="rounded-full">
            Call Us
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold">
              We Want to
              <br />
              Buy Your Car!
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">View My Offer</Button>
            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-2">
                <Phone className="h-4 w-4 text-blue-700" />
              </div>
              <div className="text-sm">
                <p>Request Our</p>
                <p className="font-bold">Instant Cash Offer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Cars in Portland</h2>
          <div className="flex items-center">
            <span className="mr-2 text-sm">Sort by:</span>
            <button className="flex items-center text-sm font-medium">
              Best Match <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-6">Showing 1 to 10 of 124 vehicles</div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <FilterSidebar />

          {/* Car Listings */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input className="pl-10 pr-4 w-full" placeholder="Search Cars eg. Audi Q7" />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium mr-2">Trending Searches</span>
                  <button className="text-blue-600 text-sm">
                    <span>+</span>
                  </button>
                </div>
                <div className="flex space-x-2 text-xs">
                  <button className="px-2 py-1 border rounded">SUV</button>
                  <button className="px-2 py-1 border rounded">Electric</button>
                  <button className="px-2 py-1 border rounded">Truck</button>
                  <button className="px-2 py-1 border rounded">FWD</button>
                  <button className="px-2 py-1 border rounded">2023 Models</button>
                  <button className="px-2 py-1 border rounded">Hybrid</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Car Listings */}
              {[...Array(9)].map((_, index) => (
                <CarListing
                  key={index}
                  discount={index % 3 === 0 ? "$1,000" : "51% off MSRP"}
                  discountType={index % 3 === 0 ? "amount" : "percent"}
                  isNew={index % 2 === 0}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-4">
        <div className="container mx-auto">
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-2">Dealer Name</h3>
            <p className="text-gray-400 text-sm">Receive pricing updates, shopping tips & more!</p>

            <div className="flex mt-4">
              <Input className="rounded-r-none bg-gray-800 border-gray-700" placeholder="Your email address" />
              <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">Sign Up</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#">About Us</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Blog</Link></li>
                <li><Link href="#">FAQs</Link></li>
                <li><Link href="#">Finance</Link></li>
                <li><Link href="#">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#">Get in Touch</Link></li>
                <li><Link href="#">Help Center</Link></li>
                <li><Link href="#">Live Chat</Link></li>
                <li><Link href="#">How it works</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Our Brands</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#">Aston Martin</Link></li>
                <li><Link href="#">Audi</Link></li>
                <li><Link href="#">Bentley</Link></li>
                <li><Link href="#">BMW</Link></li>
                <li><Link href="#">Bugatti</Link></li>
                <li><Link href="#">Ferrari</Link></li>
                <li><Link href="#">Jaguar</Link></li>
                <li><Link href="#">Lamborghini</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Vehicles Type</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#">Pickup</Link></li>
                <li><Link href="#">Coupe</Link></li>
                <li><Link href="#">Family MPV</Link></li>
                <li><Link href="#">Sedan</Link></li>
                <li><Link href="#">SUV</Link></li>
                <li><Link href="#">Sport Coupe</Link></li>
                <li><Link href="#">Convertible</Link></li>
                <li><Link href="#">Wagon</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 