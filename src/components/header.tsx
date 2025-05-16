"use client"

import Link from "next/link"
import { Search, ChevronDown, Menu, X } from "lucide-react" // Added X icon for close button
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Car } from '@/types/car'

export default function Header() {
  // State to manage dropdown open/close
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // State for mobile menu toggle
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false) // State for search modal
  const [searchQuery, setSearchQuery] = useState("") // Search query state
  const [allCars, setAllCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [displayedCars, setDisplayedCars] = useState<Car[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    fetchAllCars();
  }, []);

  const fetchAllCars = async () => {
    try {
      const response = await fetch('/api/cars?limit=1000');
      const data = await response.json();
      if (data.success) {
        setAllCars(data.data);
      }
    } catch (error) {
      console.error('Error fetching all cars:', error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCars([]);
      setDisplayedCars([]);
      setPage(1);
      setHasMore(true);
      return;
    }

    const filtered = allCars.filter(car => 
      car.Vehicle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCars(filtered);
    setDisplayedCars(filtered.slice(0, ITEMS_PER_PAGE));
    setPage(1);
    setHasMore(filtered.length > ITEMS_PER_PAGE);
  }, [searchQuery, allCars]);

  const loadMoreCars = () => {
    if (!hasMore || isLoading) return;
    
    setIsLoading(true);
    const nextPage = page + 1;
    const start = (nextPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const newCars = filteredCars.slice(start, end);
    
    setDisplayedCars(prev => [...prev, ...newCars]);
    setPage(nextPage);
    setHasMore(end < filteredCars.length);
    setIsLoading(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      loadMoreCars();
    }
  };

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
    setSearchQuery(e.target.value);
  }

  return (
    <header className="container mx-auto flex items-center justify-evenly py-4">
      {/* Logo */}
      <div className="text-3xl font-bold hidden md:block w-1/3">LOGO</div>

      {/* Desktop View */}
      <div className="hidden my-2 md:flex md:flex-wrap lg:flex-nowrap items-center justify-evenly space-x-8">
        <nav className="flex items-center space-x-6 gap-2 z-30">
          {/* Home Dropdown */}
          <div className="relative group">
            <button className="flex items-center font-medium text-sm hover:text-blue-600 active:text-blue-800">
              Home <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/" className="block px-4 py-2 text-sm hover:bg-gray-100">
                About Us
              </Link>
              <Link href="/" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Our Team
              </Link>
              <Link href="/" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Testimonials
              </Link>
            </div>
          </div>

          {/* Inventory Dropdown */}
          <div className="relative group">
            <button className="flex items-center font-medium text-sm hover:text-blue-600 active:text-blue-800">
              Inventory <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/srp" className="block px-4 py-2 text-sm hover:bg-gray-100">
                All Vehicles
              </Link>
              <Link href="/srp" className="block px-4 py-2 text-sm hover:bg-gray-100">
                New Arrivals
              </Link>
              <Link href="/srp" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Used Cars
              </Link>
              <Link href="/srp" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Certified Pre-Owned
              </Link>
            </div>
          </div>

          {/* Blog Dropdown */}
          <div className="relative group">
            <button className="flex items-center font-medium text-sm hover:text-blue-600 active:text-blue-800">
              Blog <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Latest News
              </Link>
              <Link href="/#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Car Reviews
              </Link>
              <Link href="/#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Buying Tips
              </Link>
            </div>
          </div>

          {/* Shop Dropdown */}
          <div className="relative group">
            <button className="flex items-center font-medium text-sm hover:text-blue-600 active:text-blue-800">
              Shop <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Auto Parts
              </Link>
              <Link href="/#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Accessories
              </Link>
              <Link href="/#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Services
              </Link>
            </div>
          </div>

          {/* Pages Dropdown */}
          <div className="relative group">
            <button className="flex items-center font-medium text-sm hover:text-blue-600 active:text-blue-800">
              Pages <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                FAQ
              </Link>
              <Link href="/#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Privacy Policy
              </Link>
              <Link href="/#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Contact Link */}
          <Link href="/#" className="font-medium text-sm hover:text-blue-600 active:text-blue-800">
            Contact
          </Link>
        </nav>

        {/* Desktop Search */}
        <div className="my-2 flex items-center space-x-2">
          <div className="relative w-[240px]">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input 
              className="pl-10 pr-4 w-full rounded-[17px] border border-gray-200 bg-gray-100 
              focus-visible:border-1 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0" 
              placeholder="Search Cars eg. Audi Q7"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && displayedCars.length > 0 && (
              <div 
                className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-80 overflow-y-auto"
                onScroll={handleScroll}
              >
                {displayedCars.map((car) => (
                  <Link 
                    href={`/vdp/${car.VIN}`} 
                    key={car.VIN} 
                    className="block p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Image 
                        src={car['Photo Url List']?.split('|')[0] || '/placeholder-car.png'} 
                        alt={car.Vehicle} 
                        width={100} 
                        height={100}
                        className="object-cover rounded"
                      />
                      <p>{car.Vehicle}</p>
                    </div>
                  </Link>
                ))}
                {isLoading && (
                  <div className="text-center py-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        <Button variant="outline" className="rounded-full border-black px-6">
          Call Us
        </Button>
        </div>
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
            <Link href="/" className="font-medium py-3 text-center text-sm w-full hover:bg-gray-100 active:text-blue-800">Home</Link>
            <Link href="/srp" className="font-medium py-3 text-center text-sm w-full hover:bg-gray-100 active:text-blue-800">Inventory</Link>
            <Link href="/#" className="font-medium py-3 text-center text-sm w-full hover:bg-gray-100 active:text-blue-800">Blog</Link>
            <Link href="/#" className="font-medium py-3 text-center text-sm w-full hover:bg-gray-100 active:text-blue-800">Shop</Link>
            <Link href="/#" className="font-medium py-3 text-center text-sm w-full hover:bg-gray-100 active:text-blue-800">Pages</Link>
            <Link href="/#" className="font-medium py-3 text-center text-sm w-full hover:bg-gray-100 active:text-blue-800">Contact</Link>
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
            {searchQuery && displayedCars.length > 0 && (
              <div 
                className="mt-4 max-h-[300px] overflow-y-auto"
                onScroll={handleScroll}
              >
                {displayedCars.map((car) => (
                  <Link 
                    href={`/vdp/${car.VIN}`} 
                    key={car.VIN} 
                    className="block p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Image 
                        src={car['Photo Url List']?.split('|')[0] || '/placeholder-car.png'} 
                        alt={car.Vehicle} 
                        width={100} 
                        height={100}
                        className="object-cover rounded"
                      />
                      <p>{car.Vehicle}</p>
                    </div>
                  </Link>
                ))}
                {isLoading && (
                  <div className="text-center py-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                  </div>
                )}
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
