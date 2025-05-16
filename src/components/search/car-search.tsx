'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Car } from '@/types/car'
import debounce from 'lodash/debounce'

interface CarSearchProps {
  className?: string;
  placeholder?: string;
}

export default function CarSearch({ className = '', placeholder = 'Search Cars eg. Audi Q7' }: CarSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchData, setSearchData] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [displayedCars, setDisplayedCars] = useState<Car[]>([])
  const [searchPage, setSearchPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const ITEMS_PER_PAGE = 10

  // Fetch search data only once when component mounts
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await fetch('/api/cars?limit=1000')
        const data = await response.json()
        if (data.success) {
          setSearchData(data.data)
        }
      } catch (error) {
        console.error('Error fetching search data:', error)
      }
    }
    fetchSearchData()
  }, [])

  // Optimized search handler
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim() === '') {
        setFilteredCars([])
        setDisplayedCars([])
        setSearchPage(1)
        setHasMore(true)
        return
      }

      const searchTerm = query.toLowerCase()
      const filtered = searchData.filter(car => 
        car.Vehicle.toLowerCase().includes(searchTerm)
      )
      setFilteredCars(filtered)
      setDisplayedCars(filtered.slice(0, ITEMS_PER_PAGE))
      setSearchPage(1)
      setHasMore(filtered.length > ITEMS_PER_PAGE)
    }, 100), // Even faster response time
    [searchData]
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    debouncedSearch(value)
  }

  const loadMoreCars = () => {
    if (!hasMore || isSearchLoading) return
    
    setIsSearchLoading(true)
    const nextPage = searchPage + 1
    const start = (nextPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    const newCars = filteredCars.slice(start, end)
    
    setDisplayedCars(prev => [...prev, ...newCars])
    setSearchPage(nextPage)
    setHasMore(end < filteredCars.length)
    setIsSearchLoading(false)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      loadMoreCars()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />
      <Input 
        className="pl-10 pr-4 w-full rounded-[17px] border bg-white focus-visible:border-0.5 focus-visible:border-blue-500 
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0" 
        placeholder={placeholder}
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
          {isSearchLoading && (
            <div className="text-center py-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 