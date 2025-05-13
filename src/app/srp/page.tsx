'use client';

import Link from "next/link"
import Image from "next/image"
import { Search, ChevronDown, Phone } from "lucide-react"
import { useState, useEffect } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CarListing from "@/components/car-listing"
import FilterSidebar from "@/components/filter-sidebar"
import Pagination from "@/components/pagination"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface Car {
  Make: string;
  Model: string;
  Year: string;
  Series: string;
  Price: string;
  'Other Price': string;
  'Photo Url List': string;
  VIN: string;
  'Dealer Name': string;
  'Dealer City': string;
  'Dealer Address': string;
  Status: string;
  Body: string;
  'Drivetrain Desc': string;
  Odometer: string;
  'New/Used': string;
}

export default function SearchResultsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    make: '',
    priceMin: '',
    priceMax: '',
    conditions: [] as string[],
    years: [] as string[],
    models: [] as string[],
    bodyStyles: [] as string[],
    fuelTypes: [] as string[],
  });

  useEffect(() => {
    fetchCars();
  }, [filters, currentPage]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      // Add basic filters
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Handle array filters
          value.forEach(v => {
            queryParams.append(key, v);
          });
        } else if (value && typeof value === 'string') {
          queryParams.append(key, value);
        }
      });
      
      queryParams.append('page', currentPage.toString());
      queryParams.append('limit', '9');

      const response = await fetch(`/api/cars?${queryParams.toString()}`);
      const data = await response.json();

      if (data.success) {
        setCars(data.data);
        setTotalPages(Math.ceil(data.total / 9));
      } else {
        console.error('Failed to fetch cars:', data.error);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="min-h-screen bg-gray-50" style={{borderRadius: "80px"}}>
        <section className="bg-blue-700 text-white py-8">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-evenly">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold">
                We Want to
                <br />
                Buy Your Car!
              </h1>
            </div>
            <Button className="bg-yellow-400 px-10 hover:bg-yellow-500 text-black font-bold">View My Offer</Button>
            <div className="flex items-center space-x-4">
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
        <section className="container mx-auto p-10">
          <div className="flex flex-col lg:flex-row gap-8" style={{padding: "0 100px"}}>
            {/* Sidebar Filters */}
            <FilterSidebar onFilterChange={handleFilterChange} />

            {/* Car Listings */}
            <div className="flex-1 p-2 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-4xl font-bold">New Cars in Portland</h2>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-500">Sort by:</span>
                  <button className="flex items-center text-sm font-medium">
                    Best Match <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input className="pl-10 pr-4 w-full rounded-full bg-gray-100" placeholder="Search Cars eg. Audi Q7" />
                </div>

                <div className="flex flex-wrap items-center bg-[#FBFBFB] rounded-full gap-2 text-sm text-gray-500 mt-2">
                  <Image src="/images/Trending.png" alt="Trending Searches" width={275} height={35} />
                  <button className="px-7 py-1.5 border rounded-full">SUV</button>
                  <button className="px-7 py-1.5 border rounded-full">Electric</button>
                  <button className="px-7 py-1.5 border rounded-full">Truck</button>
                  <button className="px-7 py-1.5 border rounded-full">FWD</button>
                  <button className="px-7 py-1.5 border rounded-full">2025 Models</button>
                  <button className="px-7 py-1.5 border rounded-full">Hybrid</button>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {cars.map((car) => {
                      const price = car.Price || car['Other Price'] || '0';
                      const otherPrice = car['Other Price'] || car.Price || '0';
                      const priceDiff = parseInt(otherPrice) - parseInt(price);
                      const showDiscount = priceDiff > 0;
                      
                      return (
                        <CarListing
                          key={car.VIN}
                          discount={showDiscount ? priceDiff.toString() : "0"}
                          discountType={car['New/Used'] === 'N' ? "amount" : "percent"}
                          isNew={car['New/Used'] === 'N'}
                          carData={car}
                        />
                      );
                    })}
                  </div>
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 