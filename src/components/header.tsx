"use client"

import Link from "next/link"
import { Search, ChevronDown, Menu, X } from "lucide-react" // Added X icon for close button
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Header() {
  // State to manage dropdown open/close
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // State for mobile menu toggle
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false) // State for search modal
  const [searchQuery, setSearchQuery] = useState("") // Search query state
  const [searchResults, setSearchResults] = useState<string[]>([]) // Search results state

  // Toggle dropdown visibility
  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Open search modal
  const openSearchModal = () => {
    setIsSearchModalOpen(true)
  }

  // Close search modal
  const closeSearchModal = () => {
    setIsSearchModalOpen(false)
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    // Simulate search results (replace this with actual search logic)
    if (e.target.value) {
      setSearchResults(["Result 1", "Result 2", "Result 3"]) // Replace with actual results
    } else {
      setSearchResults([])
    }
  }

  return (
    <header className="container mx-auto flex items-center justify-between py-4">
      {/* Logo */}
      <div className="text-3xl font-bold hidden md:block w-1/3">LOGO</div>

      {/* Desktop View */}
      <div className="hidden my-2 md:flex md:flex-wrap lg:flex-nowrap items-center justify-evenly space-x-8">
        <nav className="flex items-center space-x-6 gap-2 z-30">
          {/* Home Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("home")}
              className="flex items-center font-medium text-sm hover:text-blue-600 active:text-blue-800"
            >
              Home <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {openDropdown === "home" && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
                <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Submenu 1
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Submenu 2
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Submenu 3
                </Link>
              </div>
            )}
          </div>

          {/* Inventory Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("inventory")}
              className="flex items-center font-medium text-sm hover:text-blue-600 active:text-blue-800"
            >
              Inventory <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {openDropdown === "inventory" && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
                <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Submenu 1
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Submenu 2
                </Link>
              </div>
            )}
          </div>

          {/* Blog Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("blog")}
              className="flex items-center font-medium text-sm hover:text-blue-600 active:text-blue-800"
            >
              Blog <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {openDropdown === "blog" && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
                <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Submenu 1
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Submenu 2
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Submenu 3
                </Link>
              </div>
            )}
          </div>

          {/* Shop Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("shop")}
              className="flex items-center font-medium text-sm hover:text-blue-600 active:text-blue-800"
            >
              Shop <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {openDropdown === "shop" && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
                <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Submenu 1
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Submenu 2
                </Link>
              </div>
            )}
          </div>

          {/* Pages Dropdown (example) */}
          <div className="relative group">
            <button className="flex items-center font-medium text-sm hover:text-blue-600 active:text-blue-800">
              Pages <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>

          {/* Contact Link */}
          <Link href="/contact" className="font-medium text-sm hover:text-blue-600 active:text-blue-800">
            Contact
          </Link>
        </nav>

        <div className="my-2 flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input 
              className="pl-10 pr-4 w-full rounded-[17px] border-none bg-gray-100 
              focus-visible:border-2 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0" 
              placeholder="Search Cars eg. Audi Q7" 
            />    
          </div>
        </div>
        <Button variant="outline" className="rounded-full border-black px-6">
          Call Us
        </Button>
      </div>

      {/* Mobile View */}
      <div className="md:hidden mx-6 flex items-center justify-between w-full">
        {/* Logo */}
        <div className="text-3xl font-bold">LOGO</div>
        <div className="flex items-center space-x-10">
        {/* Search Button */}
        <Search className="h-6 w-6" onClick={openSearchModal} />

        {/* Hamburger Menu */}
        <button onClick={toggleMobileMenu} className="text-3xl">
          <Menu />
        </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 right-0 bg-white shadow-lg z-20">
          <div className="flex justify-between items-center p-4 mx-2">
            <div className="text-3xl font-bold">LOGO</div>
            <button onClick={toggleMobileMenu}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col items-center py-0">
            <Link href="#" className="font-medium py-3 text-center text-sm w-full hover:bg-gray-100 active:text-blue-800">Home</Link>
            <Link href="#" className="font-medium py-3 text-center text-sm w-full hover:bg-gray-100 active:text-blue-800">Inventory</Link>
            <Link href="#" className="font-medium py-3 text-center text-sm w-full hover:bg-gray-100 active:text-blue-800">Blog</Link>
            <Link href="#" className="font-medium py-3 text-center text-sm w-full hover:bg-gray-100 active:text-blue-800">Shop</Link>
            <Link href="#" className="font-medium py-3 text-center text-sm w-full hover:bg-gray-100 active:text-blue-800">Pages</Link>
            <Link href="#" className="font-medium py-3 text-center text-sm w-full hover:bg-gray-100 active:text-blue-800">Contact</Link>
          </nav>
        </div>
      )}

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[400px] relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input 
                className="pl-10 pr-4 w-full rounded-lg border-none bg-gray-100 focus-visible:border-2 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0" 
                placeholder="Search Cars eg. Audi Q7" 
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
              />
            </div>
            <Button className="mt-4 w-full" onClick={() => console.log("Go clicked!")}>Go</Button>
            {searchResults.length > 0 && (
              <div className="mt-4 max-h-[300px] overflow-y-auto">
                <h3 className="font-medium text-lg">Search Results</h3>
                <ul className="space-y-2">
                  {searchResults.map((result, index) => (
                    <li key={index} className="text-sm">{result}</li>
                  ))}
                </ul>
              </div>
            )}
            <button 
              onClick={closeSearchModal} 
              className="fixed top-4 right-4 text-xl bg-white hover:bg-gray-100 active:bg-gray-200 rounded-lg px-1 py-1"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
