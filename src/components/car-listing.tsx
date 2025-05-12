"use client"

import Image from "next/image"
import { Heart, ChevronLeft, ChevronRight, DivideCircleIcon, TriangleRight, TriangleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CarListingProps {
  discount: string
  discountType: "amount" | "percent"
  isNew: boolean
}

export default function CarListing({ discount, discountType, isNew }: CarListingProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust this value as needed
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mb-4">
      {discountType === "amount" && (
        <div className="z-10 absolute bg-[#F0344B] top-4 left-[-14px] rounded-full px-4 py-1 text-white text-sm font-bold flex items-center gap-1 pointer-events-auto">
          {discount}
        </div>
      )}
      <div className="border bg-white overflow-hidden" style={{ borderRadius: "18px" }}>
        <div className="relative">
        <Image
          src="/images/image.png"
          alt="Car Image"
          width={400}
          height={300}
          className="w-full h-[220px] object-cover"
        />

        {discountType !== "amount" && (
          <div className="absolute bg-[#F0344B] top-0 left-[-2px] px-2 py-2 text-white text-sm font-bold flex items-center gap-1">
            <Image src="/images/fire.svg" alt="Fire" width={18} height={18} />
            {`${discount} OR 0% for 72 mos`}
          </div>
        )}

        <div className="absolute top-[204px] left-1/2 transform -translate-x-1/2">
          <Image src="/images/Bullet.svg" alt="Bullet" width={134} height={4} />
        </div>

        <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full">
          <Heart className="h-4 w-4" />
        </button>

        <div className="px-4 py-4">
          <div className="flex items-center justify-between pl-2 mb-6">
            <h3 className="font-bold text-lg underline">2025 Nissan Versa 1.6 SR</h3>
            <Image src="/images/double_ellipse.png" alt="Double Ellipse" width={30} height={30} />
          </div>

          <div className="flex justify-between text-sm text-gray-500 mx-2 mb-2">
            <span>Sedan FWD</span>
            <span>5.7k miles</span>
          </div>

          <div className="relative bg-[#FBFBFB] rounded-full py-1 mb-2">
            <button
              onClick={() => scroll('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-transparent shadow-md hover:bg-gray-50"
            >
              <TriangleIcon
                className="h-2 w-2 rotate-[30deg] text-gray-500"
                fill="currentColor"
                stroke="currentColor"
              />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto mx-7 py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <div className="flex space-x-2">
                <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                  New
                </div>
                <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                  #1223013
                </div>
                <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                  Trim 4.6 R
                </div>
                <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                  Automatic
                </div>
                <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                  FWD
                </div>
                <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                  Gasoline
                </div>
                <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                  4 Cylinder
                </div>
                <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                  Black
                </div>
                <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                  Leather
                </div>
                <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                  Navigation
                </div>
                <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                  Sunroof
                </div>
                <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                  Backup Camera
                </div>
              </div>
            </div>

            <button
              onClick={() => scroll('right')}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-transparent p-1"
            >
              <TriangleIcon
                className="h-2 w-2 rotate-[-30deg] text-gray-500"
                fill="currentColor"
                stroke="currentColor"
              />
            </button>
          </div>

          <div className="flex justify-between items-center border-t border-b p-2 mx-2 mb-2">
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

          <div className="flex justify-between items-center border-b p-2 mx-2 mb-2">
            <div className="flex justify-between w-full mr-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-pointer">
                      <div className="text-xs">Off MSRP</div>
                      <div className="relative font-bold text-2xl w-fit">
                        $23,190
                        <Image
                          src="/images/info.svg"
                          alt="Info"
                          width={10}
                          height={10}
                          className="absolute -top-3 -right-0"
                        />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    align="start"
                    sideOffset={8}
                    className="px-6 py-4 space-y-1 bg-[#FBFBFB] shadow-lg border-none flex flex-col tooltiptext rounded-[18px]"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm">MSRP</span>
                      <span className="text-sm font-medium line-through">$23,690</span>
                    </div>
                    <div className="flex text-gray-500 justify-between items-center space-x-10">
                      <span className="text-sm">Dealership Discount</span>
                      <span className="text-sm font-medium">$23,690</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-md font-bold">Sale Price</span>
                      <span className="text-lg font-bold">$23,190</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-pointer">
                      <div className="text-xs">Sale Price</div>
                      <div className="relative font-bold text-2xl w-fit">
                        $23,190
                        <Image
                          src="/images/info.svg"
                          alt="Info"
                          width={10}
                          height={10}
                          className="absolute -top-3 -right-0"
                        />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    align="center"
                    sideOffset={8}
                    className="px-6 py-4 space-y-1 bg-[#FBFBFB] shadow-lg border-none flex flex-col tooltiptext rounded-[18px]"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm">MSRP</span>
                      <span className="text-sm font-medium">$23,690</span>
                    </div>
                    <div className="flex justify-between items-center space-x-10">
                      <span className="text-sm">Dealership Discount</span>
                      <span className="text-sm font-medium">$2,360</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sale Price</span>
                      <span className="text-sm font-medium">$23,190</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer">
                    <Image 
                      src="/images/pencil-dots.svg" 
                      alt="Pencil-dots" 
                      width={20} 
                      height={20} 
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  side="bottom" 
                  align="end"
                  sideOffset={12}
                  className="px-6 py-4 space-y-1 bg-[#FBFBFB] shadow-lg border-none flex flex-col tooltiptext rounded-[18px]"
                >
                  <div className="text-sm text-center">Click to edit details</div>
                  <div className="flex justify-between items-center text-gray-500 space-x-10">
                      <span className="text-sm">Nissan College Grad</span>
                      <span className="text-sm font-medium">$290</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-500 space-x-10">
                      <span className="text-sm">Nissan Millitary Cash</span>
                      <span className="text-sm font-medium">$590</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Button variant="outline" size="sm" className="w-full mb-2 rounded-full">
            Confirm Availability
          </Button>

          <Button variant="outline" size="sm" className="w-full mb-2 border-none underline">
            Estimate My Payment
          </Button>

          <div className="text-xs text-gray-500 text-center underline">28700 SW 95th Ave, Wilsonville</div>
        </div>
      </div>
      </div>
    </div>
  )
}
