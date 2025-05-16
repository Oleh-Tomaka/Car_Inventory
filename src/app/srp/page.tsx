'use client'

import Image from "next/image"
import { ChevronDown, X } from "lucide-react"
import { useState, useEffect } from 'react'

import { Button } from "@/components/ui/button"
import FilterSidebar from "@/components/filter-sidebar"
import Pagination from "@/components/pagination"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Car } from '@/types/car'
import { CarGrid } from '@/components/car-listing/car-grid'
import CarSearch from '@/components/search/car-search'

interface Filters {
  make: string;
  priceMin: string;
  priceMax: string;
  conditions: string[];
  years: string[];
  models: string[];
  bodyStyles: string[];
  fuelTypes: string[];
  mileageMin: number;
  mileageMax: number;
}

export default function SearchResultsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    make: '',
    priceMin: '',
    priceMax: '',
    conditions: [],
    years: [],
    models: [],
    bodyStyles: [],
    fuelTypes: [],
    mileageMin: 0,
    mileageMax: 100000,
  });

  const ITEMS_PER_PAGE = 9;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch cars with optimized query
  const fetchCars = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      // Add basic filters
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => {
            queryParams.append(key, v);
          });
        } else if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
      
      queryParams.append('page', currentPage.toString());
      queryParams.append('limit', ITEMS_PER_PAGE.toString());
      // Add fields parameter to only fetch necessary data
      queryParams.append('fields', 'VIN,Vehicle,Photo Url List,Price,Year,Make,Model');

      const response = await fetch(`/api/cars?${queryParams.toString()}`);
      const data = await response.json();

      if (data.success) {
        setCars(data.data);
        setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
      } else {
        console.error('Failed to fetch cars:', data.error);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cars when page or filters change
  useEffect(() => {
    fetchCars();
  }, [filters, currentPage]);

  // Reset to first page when filters change
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Toggle the sidebar for mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="min-h-screen bg-gray-50 z-10 md:rounded-[80px]">
        <section className="bg-[#2B5297] text-white py-8">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-evenly">
            <div className="mb-2 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold">
                We Want to
                <br />
                Buy Your Car!
              </h1>
            </div>
            <Button className="bg-yellow-500 px-10 my-6 hover:bg-yellow-400 text-black font-bold">View My Offer</Button>
            <Image src="/images/offer-logo.svg" alt="Offer Logo" width={270} height={60} />
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto p-10">
          <div className="flex flex-col lg:flex-row gap-8 py-0 px-0 md:px-[40px]">
            

            {/* Sidebar Filters */}
            <div className="hidden md:block">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>

            {/* Car Listings */}
            <div className="flex-1 p-2 rounded-lg">
              <div className="hidden md:flex justify-between items-end mb-6">
                <h2 className="text-4xl font-bold">New Cars in Portland</h2>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-500">Sort by:</span>
                  <button className="flex items-center text-sm font-medium">
                    Best Match <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <div className="relative mb-2">
                  <CarSearch />
                </div>

                <div className="flex flex-wrap items-center md:justify-between justify-evenly gap-4 mt-4">
                  <div className="md:hidden">
                    <button onClick={toggleSidebar} className="font-medium text-lg flex items-center gap-2 rounded-lg py-3">
                      <Image src="/images/filter.svg" alt="Filter Icon" width={32} height={32} />
                      Filter
                    </button>
                  </div>
                  <div className="rounded-full bg-gray-100 p-1">
                    <Image src="/images/Trending.svg" alt="Trending Searches" width={200} height={35} />
                  </div>
                  <div className="flex flex-wrap items-center bg-[#FBFBFB] rounded-full gap-2 text-sm text-gray-500">
                    <button className="px-7 py-1.5 border rounded-full">SUV</button>
                    <button className="px-7 py-1.5 border rounded-full">Electric</button>
                    <button className="px-7 py-1.5 border rounded-full">Truck</button>
                    <button className="px-7 py-1.5 border rounded-full">FWD</button>
                    <button className="px-7 py-1.5 border rounded-full">2025 Models</button>
                    <button className="px-7 py-1.5 border rounded-full">Hybrid</button>
                  </div>
                </div>
              </div>

              <CarGrid cars={cars} loading={loading} />

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Sidebar (Filter) */}
      <div 
        className={`fixed inset-0 bg-white z-50 w-[280px] md:hidden transition-transform duration-300 ${isSidebarOpen ? 'transform-none' : 'transform -translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 bg-white border-b">
            <div className="text-xl font-bold">Filters</div>
            <button onClick={toggleSidebar} className="text-xl">
              <X />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Prevent main content scrolling when sidebar is open */}
      <div className={`${isSidebarOpen ? 'overflow-hidden' : ''}`}>
        <Footer />
      </div>
    </div>
  );
}
