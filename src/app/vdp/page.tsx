"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Share2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import CarFeatures from "@/components/vdp/details/car-features"
import FinancingCalculator from "@/components/vdp/details/financing-calculator"
import Specifications from "@/components/vdp/details/specifications"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Car } from '@/types/car'

export default function VehicleDetailPage() {
  const searchParams = useSearchParams()
  const vin = searchParams.get('vin')
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!vin) {
        setError('No VIN provided')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/cars/${vin}`)
        if (!response.ok) {
          throw new Error('Failed to fetch car details')
        }
        const data = await response.json()
        setCar(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch car details')
      } finally {
        setLoading(false)
      }
    }

    fetchCarDetails()
  }, [vin])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Image src="/images/loading.gif" alt="Loading" width={80} height={80} />
      </div>
    )
  }

  if (error || !car) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error || 'Car not found'}</div>
  }

  const images = car['Photo Url List']?.split('|') || []
  const mainImage = images[selectedImageIndex] || '/placeholder-car.png'
  
  const price = car.Price || car['Other Price'] || '0'
  const otherPrice = car['Other Price'] || car.Price || '0'
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(parseInt(price))

  const formattedOtherPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(parseInt(otherPrice))

  const priceDiff = parseInt(otherPrice) - parseInt(price)
  const showDiscount = priceDiff > 0
  const formattedDiscount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(priceDiff)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <span>Sedan FWD</span>
          </div>

          {/* Car Title */}
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold">2025 Nissan Versa 1.6 SR</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          {/* Key Features */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Badge variant="outline" className="rounded-full px-4 py-1 flex items-center gap-2">
              <span className="bg-gray-100 p-1 rounded-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 4.5L14.5 9.5L20 10.5L16 14.5L17 20L12 17.5L7 20L8 14.5L4 10.5L9.5 9.5L12 4.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              32 MPG
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1 flex items-center gap-2">
              <span className="bg-gray-100 p-1 rounded-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 4.5V19.5M12 4.5L7 9.5M12 4.5L17 9.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              900 miles
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1 flex items-center gap-2">
              <span className="bg-gray-100 p-1 rounded-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 16L19 19M18 12H22M16 8L19 5M12 6V2M8 8L5 5M6 12H2M8 16L5 19M12 18V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Automatic
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1 flex items-center gap-2">
              <span className="bg-gray-100 p-1 rounded-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 20C18 16.6863 15.3137 14 12 14C8.68629 14 6 16.6863 6 20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Dealer
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="space-y-4">
              <div className="relative aspect-video">
                <Image
                  src={mainImage}
                  alt={`${car.Year} ${car.Make} ${car.Model}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                  <Heart className="h-6 w-6" />
                </button>
              </div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-video rounded-lg overflow-hidden ${
                      selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {`${car.Year} ${car.Make} ${car.Model} ${car.Series}`}
                </h1>
                <p className="text-gray-600">
                  {`${car['Dealer Name']} - ${car['Dealer City']}`}
                </p>
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">MSRP</p>
                    <p className="text-2xl font-bold">{formattedOtherPrice}</p>
                  </div>
                  {showDiscount && (
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Dealership Discount</p>
                      <p className="text-2xl font-bold text-green-600">-{formattedDiscount}</p>
                    </div>
                  )}
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">Sale Price</p>
                  <p className="text-3xl font-bold">{formattedPrice}</p>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">VIN</p>
                  <p className="font-medium">{car.VIN}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Condition</p>
                  <p className="font-medium">{car['New/Used'] === 'N' ? 'New' : 'Used'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Body Style</p>
                  <p className="font-medium">{car.Body}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Drivetrain</p>
                  <p className="font-medium">{car['Drivetrain Desc']}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Transmission</p>
                  <p className="font-medium">{car.Transmission}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Engine</p>
                  <p className="font-medium">{car.Engine}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Fuel Type</p>
                  <p className="font-medium">{car.Fuel}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Mileage</p>
                  <p className="font-medium">{new Intl.NumberFormat().format(parseInt(car.Odometer))} miles</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button className="w-full py-6 text-lg">Check Availability</Button>
                <Button variant="outline" className="w-full py-6 text-lg">Calculate Payment</Button>
              </div>

              {/* Dealer Info */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-4">Dealer Information</h2>
                <div className="space-y-2">
                  <p className="font-medium">{car['Dealer Name']}</p>
                  <p className="text-gray-600">{car['Dealer Address']}</p>
                  <p className="text-gray-600">{car['Dealer City']}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 p-1 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Stock Type</p>
                    <p className="text-sm">New</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 p-1 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">VIN</p>
                    <p className="text-sm">3N1CN8EV5NL458902</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 p-1 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Make & Model</p>
                    <p className="text-sm">Nissan Versa</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 p-1 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Trim</p>
                    <p className="text-sm">1.6 SR</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 p-1 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Doors</p>
                    <p className="text-sm">4-door</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 p-1 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">MPG City</p>
                    <p className="text-sm">32</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 p-1 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">MPG Highway</p>
                    <p className="text-sm">40</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 p-1 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Year</p>
                    <p className="text-sm">2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 p-1 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Mileage</p>
                    <p className="text-sm">900 miles</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 p-1 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Fuel Type</p>
                    <p className="text-sm">Petrol</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 p-1 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Transmission</p>
                    <p className="text-sm">CVT</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 p-1 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Drive Type</p>
                    <p className="text-sm">Front Wheel Drive</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 p-1 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Exterior Color</p>
                    <p className="text-sm">Scarlet Ember Tintcoat</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 p-1 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Interior Color</p>
                    <p className="text-sm">Sport</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {car.Comments}
            </p>
            <Button variant="link" className="mt-2 p-0 h-auto text-sm font-medium">
              + Show More
            </Button>
          </div>

          <div className="mt-8">
            <Button variant="outline" className="w-full py-6 text-base">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Test Drive
            </Button>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Reason to love this Nissan 1.6 SR</h2>
            <CarFeatures />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Financing Calculator</h2>
            <FinancingCalculator />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Specifications</h2>
            <Specifications />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
