"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, ChevronLeft, ChevronRight, DivideCircleIcon, TriangleRight, TriangleIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar } from "@/components/ui/calendar"
import { Share2, MapPin, Phone, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import CarFeatures from "@/components/car-features"
// import ImageGallery from "@/components/image-gallery"
import ImageGallery from "@/components/gallery"
import SimilarCars from "@/components/similar-cars"
import FinancingCalculator from "@/components/financing-calculator"
import Specifications from "@/components/specifications"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ImageModalGallery from "@/components/ImageModalGallery"

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
  'Fuel': string;
  'Transmission': string;
  'Engine': string;
  'Certified': string;
  'Stock #': string;
  'City MPG': string;
  'Highway MPG': string;
  'Colour': string;
  'Interior Color': string;
  'Comments': string;
}

export default function VehicleDetailPage() {
  const params = useParams()
  const vin = params.vin as string
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false);
  const [similarVins, setSimilarVins] = useState<string[]>([])

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const truncateText = car?.Comments.slice(0, 900) + '...';

  const shortenNumber = (value: number) => {
    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    } else {
      return value.toString();
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchCarDetails = async () => {
      if (!vin) {
        if (mounted) {
          setError('No VIN provided')
          setLoading(false)
        }
        return
      }

      try {
        if (mounted) {
          setLoading(true)
        }

        const response = await fetch(`/api/cars/${vin}`)
        if (!response.ok) {
          throw new Error(response.status === 404 ? 'Car not found' : 'Failed to fetch car details')
        }
        const data = await response.json()

        if (!mounted) return;

        setCar(data)

        // Only fetch similar cars if we have the car data
        if (data && data.Year) {
          const similarResponse = await fetch(`/api/cars/similar?year=${data.Year}&vin=${vin}`)
          if (similarResponse.ok) {
            const similarData = await similarResponse.json()
            if (mounted) {
              setSimilarVins(similarData.vins || [])
            }
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch car details')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchCarDetails()

    return () => {
      mounted = false
    }
  }, [vin]) // Only depend on vin

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-white md:rounded-[80px] z-2">
          <div className="container mx-auto w-[80%]" style={{ padding: "100px 65px" }}>
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4 mb-8"></div>
              <div className="h-96 bg-gray-200 rounded mb-8"></div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
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
      <main className="flex-1 bg-white md:rounded-[80px] z-10">
        <div
          className="container mx-auto w-[80%] sm:p-0 md:px-[80px] md:py-[65px]"
        >

          {/* Car Title */}
          <p className="text-lg text-green-500">{car['New/Used'] === 'N' ? 'New' : ''}</p>
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{`${car.Year} ${car.Make} ${car.Model} ${car.Series}`}</h1>
              <div className="flex items-center text-sm pt-2">
                <span>{car.Body.split(" ").slice(1).join(" ")} {car['Drivetrain Desc']}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 my-2">
              <p className="text-sm">Share</p>
              <div className="flex items-center rounded-full border border-gray-200 p-3 space-x-2">
                <Image src="/images/upload.svg" alt="Share" width={12} height={12} />
              </div>
              <p className="text-sm ml-2">Save</p>
              <div className="flex items-center rounded-full border border-gray-200 p-3">
                <Image src="/images/bookmark.svg" alt="Save" width={12} height={12} />
              </div>
            </div>
          </div>

          <div>

            {/* Key Features */}
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
                  <Image src="/images/year.svg" alt="Year" width={16} height={16} />
                  <p className="text-sm">{car.Year}</p>
                </div>


                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
                  <Image src="/images/mileage.svg" alt="Mileage" width={16} height={16} />
                  <p className="text-sm">{new Intl.NumberFormat().format(parseInt(car.Odometer))} miles</p>
                </div>

                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
                  <Image src="/images/transmission.svg" alt="Transmission" width={16} height={16} />
                  <p className="text-sm">{car.Transmission}</p>
                </div>

                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
                  <Image src="/images/fuel.svg" alt="Fuel Type" width={16} height={16} />
                  <p className="text-sm">{car.Fuel}</p>
                </div>
              </div>
              <div className="hidden md:flex flex-col md:flex-row md:justify-between gap-4">
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-end gap-6 whitespace-nowrap">
                    <p className="text-2xl font-bold">Sale Price</p>
                    <h3 className="text-3xl font-bold">{formattedPrice}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-1.5xl">MSRP</p>
                    <p className="text-1.5xl line-through">{formattedOtherPrice}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg">See Pricing Details</p>
                  </div>
                </div>
              </div>
            </div>


            {/* Image Gallery */}
            <div className="mt-4">
              <ImageGallery images={images} />
            </div>

            {/* Price Section */}
            <div className="mt-4 md:hidden lg:hidden flex flex-col md:flex-row md:justify-between gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-8">
                  <p className="text-2xl font-bold">Sale Price</p>
                  <h3 className="text-3xl font-bold">{formattedPrice}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-1.5xl">MSRP</p>
                  <p className="text-1.5xl line-through">{formattedOtherPrice}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-lg">See Pricing Details</p>
                </div>
              </div>
              <div className="flex justify-evenly items-center gap-2">
                <Image src="/images/brand.svg" alt="Nissan Brand" width={175} height={47} />
                <Image src="/images/owner.svg" alt="Owner" width={86} height={47} />
              </div>
            </div>
          </div>



          <div className="flex flex-wrap lg:flex-nowrap gap-8">
            {/* Left Column - Details, Description, Features */}
            <div className="w-full lg:w-[73%]">
              <div className="mt-8 hidden md:block">
                <h2 className="text-xl font-bold mb-4">Details</h2>
                <div className="flex flex-wrap justify-between gap-1">
                  <div className="space-y-4 mb-4">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 w-[200px]">
                        <Image src="/images/stock-type.svg" alt="Stock Type" width={16} height={16} />
                        <p className="text-sm text-muted-foreground">Stock Type</p>
                      </div>
                      <p className="text-sm">{car['New/Used'] === 'N' ? 'New' : 'Used'}</p>
                    </div>

                    <div className="flex items-center gap-6 ">
                      <div className="flex items-center gap-2 w-[200px]">
                        <Image src="/images/vin.svg" alt="VIN" width={16} height={16} />
                        <p className="text-sm text-muted-foreground">VIN</p>
                      </div>
                      <p className="text-sm">{car.VIN}</p>
                    </div>

                    <div className="flex items-center gap-6 ">
                      <div className="flex items-center gap-2 w-[200px]">
                        <Image src="/images/vin.svg" alt="Stock" width={16} height={16} />
                        <p className="text-sm text-muted-foreground">Stock</p>
                      </div>
                      <p className="text-sm">{car['Stock #']}</p>
                    </div>

                    <div className="flex items-center gap-6 ">
                      <div className="flex items-center gap-2 w-[200px]">
                        <Image src="/images/make.svg" alt="Make & Model" width={16} height={16} />
                        <p className="text-sm text-muted-foreground">Make & Model</p>
                      </div>
                      <p className="text-sm">{`${car.Make} ${car.Model}`}</p>
                    </div>

                    <div className="flex items-center gap-6 ">
                      <div className="flex items-center gap-2 w-[200px]">
                        <Image src="/images/vin.svg" alt="Trim" width={16} height={16} />
                        <p className="text-sm text-muted-foreground">Trim</p>
                      </div>
                      <p className="text-sm">{`${car.Series}`}</p>
                    </div>

                    <div className="flex items-center gap-6 ">
                      <div className="flex items-center gap-2 w-[200px]">
                        <Image src="/images/door.svg" alt="Doors" width={16} height={16} />
                        <p className="text-sm text-muted-foreground">Doors</p>
                      </div>
                      <p className="text-sm">{`${car.Body.split('')[0]} Door`}</p>
                    </div>

                    <div className="flex items-center gap-6 ">
                      <div className="flex items-center gap-2 w-[200px]">
                        <Image src="/images/piston.svg" alt="City MPG" width={16} height={16} />
                        <p className="text-sm text-muted-foreground">MPG City</p>
                      </div>
                      <p className="text-sm">{car['City MPG']}</p>
                    </div>

                    <div className="flex items-center gap-6 ">
                      <div className="flex items-center gap-2 w-[200px]">
                        <Image src="/images/piston.svg" alt="Highway MPG" width={16} height={16} />
                        <p className="text-sm text-muted-foreground">MPG Highway</p>
                      </div>
                      <p className="text-sm">{car['Highway MPG']}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-6 ">
                      <div className="flex items-center gap-2 w-[200px]">
                        <Image src="/images/year.svg" alt="Year" width={16} height={16} />
                        <p className="text-sm text-muted-foreground">Year</p>
                      </div>
                      <p className="text-sm">{car.Year}</p>
                    </div>

                    <div className="flex items-center gap-6 ">
                      <div className="flex items-center gap-2 w-[200px]">
                        <Image src="/images/mileage.svg" alt="Mileage" width={16} height={16} />
                        <p className="text-sm text-muted-foreground">Mileage</p>
                      </div>
                      <p className="text-sm">{new Intl.NumberFormat().format(parseInt(car.Odometer))} miles</p>
                    </div>

                    <div className="flex items-center gap-6 ">
                      <div className="flex items-center gap-2 w-[200px]">
                        <Image src="/images/fuel.svg" alt="Fuel Type" width={16} height={16} />
                        <p className="text-sm text-muted-foreground">Fuel Type</p>
                      </div>
                      <p className="text-sm">{car.Fuel}</p>
                    </div>

                    <div className="flex items-center gap-6 ">
                      <div className="flex items-center gap-2 w-[200px]">
                        <Image src="/images/transmission.svg" alt="Transmission" width={16} height={16} />
                        <p className="text-sm text-muted-foreground">Transmission</p>
                      </div>
                      <p className="text-sm">{car.Transmission}</p>
                    </div>

                    <div className="flex items-center gap-6 ">
                      <div className="flex items-center gap-2 w-[200px]">
                        <Image src="/images/drive-type.svg" alt="Drive Type" width={16} height={16} />
                        <p className="text-sm text-muted-foreground">Drive Type</p>
                      </div>
                      <p className="text-sm">{car['Drivetrain Desc']}</p>
                    </div>
                    <div className="flex items-center gap-6 ">
                      <div className="flex items-center gap-2 w-[200px]">
                        <Image src="/images/fill.svg" alt="Exterior Color" width={16} height={16} />
                        <p className="text-sm text-muted-foreground">Exterior Color</p>
                      </div>
                      <p className="text-sm">{car['Colour']}</p>
                    </div>

                    <div className="flex items-center gap-6 ">
                      <div className="flex items-center gap-2 w-[200px]">
                        <Image src="/images/fill.svg" alt="Interior Color" width={16} height={16} />
                        <p className="text-sm text-muted-foreground">Interior Color</p>
                      </div>
                      <p className="text-sm">{car['Interior Color']}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Description</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isExpanded ? car.Comments : truncateText}
                </p>
                <Button variant="link" className="mt-2 ml-auto p-0 h-auto text-md flex border-none font-medium" onClick={toggleExpanded}>
                  {isExpanded ? '- Show Less' : '+ Show More'}
                </Button>
              </div>

              <div className="mt-8">
                <Button variant="outline" className="px-8 py-6 border-none rounded-[12px] text-base bg-[#FFE9F3] flex items-center gap-2">
                  <Image src="/images/drive-type.svg" alt="Schedule Test Drive" width={22} height={22} />
                  Schedule Test Drive
                </Button>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 border-t border-gray-200 pt-8">Reason to love this {car.Make} {car.Series}</h2>
                <CarFeatures />
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 border-t border-gray-200 pt-4">Financing Calculator</h2>
                <FinancingCalculator />
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 border-t border-gray-200 pt-4">Specifications</h2>
                <Specifications />
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="mt-8 order-first mx-auto lg:order-last">
              <div className="w-full px-8 py-6 border sticky top-0 rounded-[16px]">
                <div className="absolute bg-[#F0344B] top-[-18px] right-1/2 transform translate-x-1/2 md:top-0 rounded-[14px] px-6 py-2 text-white text-sm font-bold whitespace-nowrap inline-flex justify-center items-center gap-1">
                  <Image src="/images/fire.svg" alt="Fire" width={18} height={18} />
                  {`$ ${shortenNumber(priceDiff)} Off MSRP OR 0% for 72 mos`}
                </div>
                <div>
                  <p className="text-2xl font-bold mb-2 mt-8 pt-4 text-gray-700">
                    {`${car['Dealer Name']}`}
                  </p>
                  <p className="text-gray-600 py-2">
                    {`${car['Dealer Address']}, ${car['Dealer City']}`}
                  </p>
                </div>
                <div className="flex justify-evenly items-center flex-wrap gap-4 mt-2 mb-6">
                  <div className="flex items-center mt-2 gap-2">
                    <Image src="/images/direction.svg" alt="Direction" width={40} height={40} />
                    <p>
                      Get Directions
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src="/images/phone.svg" alt="Phone" width={40} height={40} />
                    <p>
                      503-222-2277
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 mt-4">
                  <Button className="w-full py-6 text-lg bg-primary text-white rounded-full flex items-center justify-center gap-2">
                    Check Availability
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <g clipPath="url(#clip0_215_9)">
                        <path d="M17.4669 0.552368H6.93459C6.66997 0.552368 6.45583 0.7665 6.45583 1.03112C6.45583 1.29575 6.66997 1.50988 6.93459 1.50988H16.3112L0.851205 16.9698C0.664182 17.1568 0.664182 17.4598 0.851205 17.6468C0.944694 17.7403 1.06722 17.787 1.1897 17.787C1.31219 17.787 1.43467 17.7403 1.5282 17.6468L16.9881 2.18683V11.5634C16.9881 11.8281 17.2023 12.0422 17.4669 12.0422C17.7315 12.0422 17.9457 11.8281 17.9457 11.5634V1.03112C17.9456 0.7665 17.7315 0.552368 17.4669 0.552368Z" fill="white" />
                      </g>
                      <defs>
                        <clipPath id="clip0_215_9">
                          <rect width="17.2347" height="17.2347" fill="white" transform="translate(0.711426 0.552368)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </Button>
                  <Button variant="outline" className="w-full py-6 text-lg border-black rounded-full mb-4 flex items-center justify-center gap-2 ">
                    Estimate My Payment
                    <Image src="/images/right-up.svg" alt="Arrow Right" width={18} height={18} />
                  </Button>
                </div>

                {/* Dealer Info */}
                <div className="mt-4 md:mt-8 pt-4 md:pt-8 flex items-center justify-center gap-2">
                  <p className="font-medium">View all stock at this dealer
                  </p>
                  <Image src="/images/right-up.svg" alt="Arrow Right" width={14} height={14} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4 pt-4">You May Also Like</h2>
              <Link href="/srp">
                <Button variant="link" className="text-sm flex items-center gap-2">
                  View All
                  <Image src="/images/right-up.svg" alt="Arrow Right" width={14} height={14} />
                </Button>
              </Link>
            </div>
            <SimilarCars vins={similarVins} currentVIN={vin} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 