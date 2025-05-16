import Image from "next/image"
import { Heart, Share2, Eye, ChevronRight, ChevronLeft, Bookmark, TriangleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"

interface Car {
  VIN: string
  Year: string
  Make: string
  Model: string
  Body: string
  'Drivetrain Desc': string
  'New/Used': 'N' | 'U'
  Vehicle: string
  MSRP: string
  'After Rebates': string
  'Photo Url List': string
  Price: string
  'Other Price': string
  'Price Diff': number
}

interface SimilarCarsProps {
  vins: string[]  // Array of VINs for similar cars (already filtered by year and excluding current car)
  currentVIN: string
  itemsPerPage?: number
}

export default function SimilarCars({ vins, currentVIN, itemsPerPage = 4 }: SimilarCarsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch car details for the current page of VINs
  const fetchCars = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Calculate which VINs to fetch for current page
      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const vinsToFetch = vins.slice(startIndex, endIndex)

      if (vinsToFetch.length === 0) {
        setCars([])
        return
      }

      // Fetch details for each car in parallel
      const carPromises = vinsToFetch.map(async (vin) => {
        try {
          const response = await fetch(`/api/cars/${vin}`)
          if (!response.ok) {
            throw new Error(`Failed to fetch car ${vin}`)
          }
          return response.json()
        } catch (err) {
          console.error(`Error fetching car ${vin}:`, err)
          return null
        }
      })

      const carData = await Promise.all(carPromises)
      const validCars = carData.filter((car): car is Car => car !== null)
      setCars(validCars)
    } catch (err) {
      console.error('Error fetching similar cars:', err)
      setError('Failed to load similar cars. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [vins, currentPage, itemsPerPage])

  // Fetch cars when page changes or VINs update
  useEffect(() => {
    fetchCars()
  }, [fetchCars])

  // Calculate total pages based on number of VINs
  const totalPages = Math.ceil(vins.length / itemsPerPage)

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const shortenNumber = (num: number) => {
    return num.toLocaleString()
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchCars} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  if (loading) {
    return (
      // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">  
        {[...Array(itemsPerPage)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-[220px] rounded-t-lg"></div>
            <div className="bg-white p-4 rounded-b-lg">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No similar cars found</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">  
        {cars.map((car) => {
          const price = car.Price || car['Other Price'] || '0';
          const otherPrice = car['Other Price'] || car.Price || '0';
          
          const formattedPrice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(parseInt(price));

          const formattedOtherPrice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(parseInt(otherPrice));

          const mainImage = car['Photo Url List']?.split('|')[0] || '/placeholder-car.png';

          return (
            <div className="relative mb-4" key={car.VIN}>
              {car['New/Used'] === 'N' && car['Price Diff'] > 0 && (
                <div className="z-10 absolute bg-[#F0344B] top-4 left-[-16px] rounded-full px-4 py-1 text-white text-sm font-bold flex items-center gap-1 pointer-events-auto">
                  - ${shortenNumber(car['Price Diff'])}
                </div>
              )}
              <div className="border bg-white overflow-hidden" style={{ borderRadius: "18px" }}>
                <div className="relative">
                  <Link href={`/vdp/${car.VIN}`}>
                    <Image
                      src={mainImage}
                      alt={`${car.Year} ${car.Make} ${car.Model}`}
                      width={400}
                      height={300}
                      className="w-full h-[220px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    />
                  </Link>

                  <div className="absolute top-4 left-3">
                    <div className="rounded-full px-3 py-1 text-sm font-bold bg-gray-800 text-white">
                      Low Mileage
                    </div>
                  </div>
                  <div className="absolute top-4 right-3 bg-white rounded-full p-3">
                    <Image src="/images/bookmark.svg" alt="Save" width={12} height={12} />
                  </div>
                  {/* <div className="absolute top-3 right-3 bg-white rounded-full p-3">
                    <Bookmark className="w-4 h-4" />
                  </div> */}
          
                  {car['New/Used'] === 'U' && car['Price Diff'] > 0 && (
                    <div className="absolute bg-[#F0344B] top-0 left-[-2px] px-2 py-2 text-white text-sm font-bold flex items-center gap-1">
                      <Image src="/images/fire.svg" alt="Fire" width={18} height={18} />
                      {`${shortenNumber(car['Price Diff'])} Off MSRP OR 0% for 72 mos`}
                    </div>
                  )}
          
                  <div className="px-4 py-4">
                    <div className="flex items-start justify-between pl-2 mb-1 h-[64px]">
                      <Link href={`/vdp/${car.VIN}`} className="hover:underline">
                        <h3 className="font-bold text-lg line-clamp-2 pr-2">{car.Vehicle}</h3>
                      </Link>
                    </div>
          
                    <div className="flex justify-between text-sm text-gray-500 mx-2 mb-2">
                      <span>{`${car.Body} ${car['Drivetrain Desc']}`}</span>
                    </div>
          
                    <div className="flex justify-between items-center border-t border-b p-2 mx-2 mb-1">
                      <div className="flex justify-around w-full">
                        <button>
                          <Image src="/images/android.svg" alt="Android" width={26} height={26} />
                        </button>
                        <button>
                          <Image src="/images/vector.svg" alt="Apple" width={20} height={20} />
                        </button>
                        <button>
                          <Image src="/images/group.svg" alt="Wheel" width={26} height={26} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-center p-2 mx-2 mb-2">
                      <div className="flex justify-between w-full mr-4">
                        <p>MSRP</p>
                        <p className="line-through">{formattedOtherPrice}</p>
                      </div>
                      <div className="flex justify-between items-end w-full mr-4">
                        <p className="font-bold">After all rebates</p>
                        <p className="font-bold text-lg">{formattedPrice}</p>
                      </div>
                    </div>
                    <Link href={`/vdp/${car.VIN}`}>
                      <Button variant="outline" size="sm" className="w-full mb-1 rounded-full">
                        More Details
                        <Image src="/images/right-up.svg" alt="Right up" width={14} height={14} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {totalPages > 1 && (
        <div className="flex md:justify-start justify-center items-center mt-8 mb-8">
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-6 py-2 mr-6 border border-gray-400 hover:bg-gray-400 hover:text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <p>{currentPage} of {totalPages}</p>
            
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-6 py-2 border rounded-full border-gray-400 hover:bg-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                marginLeft: '1.5rem'
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
