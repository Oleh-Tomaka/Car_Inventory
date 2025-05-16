"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ChevronLeft, ChevronRight, DivideCircleIcon, TriangleRight, TriangleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Car {
  Make: string;
  Model: string;
  Year: string;
  Series: string;
  Price: string;
  Vehicle: string;
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
  Colour: string;
  'Interior Color': string;
}

interface CarListingProps {
  discount: string;
  discountType: "amount" | "percent";
  isNew: boolean;
  carData: Car;
}

const getBasicColor = (colorName: string): string => {
  const color = colorName.toLowerCase();
  if (color.includes('white') || color.includes('pearl')) return '#FFFFFF';
  if (color.includes('black')) return '#000000';
  if (color.includes('red')) return '#FF0000';
  if (color.includes('blue')) return '#0000FF';
  if (color.includes('yellow')) return '#FFFF00';
  if (color.includes('gray') || color.includes('grey')) return '#808080';
  if (color.includes('silver')) return '#C0C0C0';
  if (color.includes('green')) return '#008000';
  if (color.includes('brown')) return '#8B4513';
  return '#808080'; // default gray for unknown colors
};

const getGradientStyle = (colorName: string): React.CSSProperties => {
  const color = colorName.toLowerCase();
  if (color.includes('mix') || color.includes('tricoat')) {
    return {
      background: 'linear-gradient(45deg, #FFFFFF 0%, #808080 50%, #000000 100%)',
      border: '1px solid #E5E7EB'
    };
  }
  return { backgroundColor: getBasicColor(colorName) };
};

export default function CarListing({ discount, discountType, isNew, carData }: CarListingProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mainImage = carData['Photo Url List']?.split('|')[0] || '/placeholder-car.png';

  // Handle empty or invalid price values
  const price = carData.Price || carData['Other Price'] || '0';
  const otherPrice = carData['Other Price'] || carData.Price || '0';

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

  // Calculate discount
  const priceDiff = parseInt(otherPrice) - parseInt(price);
  const showDiscount = priceDiff > 0;
  const formattedDiscount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(priceDiff);

  const shortenNumber = (value: number) => {
    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    } else {
      return value.toString();
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const exteriorStyle = getGradientStyle(carData.Colour || '');
  const interiorStyle = getGradientStyle(carData['Interior Color'] || '');

  return (
    <div className="relative mb-4">
      {showDiscount && carData['New/Used'] === 'N' && (
        <div className="z-10 absolute bg-[#F0344B] top-4 left-[-16px] rounded-full px-4 py-1 text-white text-sm font-bold flex items-center gap-1 pointer-events-auto">
          - {formattedDiscount}
        </div>
      )}
      <div className="border bg-white overflow-hidden" style={{ borderRadius: "18px" }}>
        <div className="relative">

          <Link href={`/vdp/${carData.VIN}`}>
            <div className="relative">
              <Image
                src={mainImage}
                alt={`${carData.Year} ${carData.Make} ${carData.Model}`}
                width={400}
                height={300}
                className="w-full h-[220px] relative object-cover cursor-pointer hover:opacity-90 transition-opacity"
              />
              <div className="absolute top-[204px] left-1/2 transform -translate-x-1/2">
                <Image src="/images/Bullet.svg" alt="Bullet" width={134} height={4} />
              </div>
              {showDiscount && carData['New/Used'] === 'U' && (
                <div className="absolute bg-[#F0344B] left-0 bottom-0 w-full px-2 py-2 text-white text-sm font-bold flex justify-center items-center gap-1">
                  <Image src="/images/fire.svg" alt="Fire" width={18} height={18} />
                  {`${shortenNumber(priceDiff)} Off MSRP OR 0% for 72 mos`}
                </div>
              )}
            </div>
          </Link>

          <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full">
            <Heart className="h-4 w-4" />
          </button>

          <div className="px-4 py-4">
            <div className="flex items-start justify-between pl-2 mb-1 h-[64px]">
              <Link href={`/vdp/${carData.VIN}`} className="hover:underline">
                <h3 className="font-bold text-lg line-clamp-2 pr-2">{`${carData.Vehicle}`}</h3>
              </Link>
              <div className="flex justify-center items-center mt-1">
                <div className="w-5 h-5 rounded-full border border-gray-200 z-20" style={exteriorStyle} />
                <div className="w-5 h-5 rounded-full border border-gray-200 z-10 mx-[-6px]" style={interiorStyle} />
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-500 mx-2 mb-2">
              <span>{`${carData.Body} ${carData['Drivetrain Desc']}`}</span>
              <span>{`${shortenNumber(parseInt(carData.Odometer))} miles`}</span>
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
                    {carData['New/Used'] === 'N' ? 'New' : 'Used'}
                  </div>
                  <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                    #{carData.VIN}
                  </div>
                  <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                    {carData.Series}
                  </div>
                  <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                    {carData.Body}
                  </div>
                  <div className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-sm shadow-md">
                    {carData['Drivetrain Desc']}
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

            <div className="flex justify-between items-center border-b p-2 mx-0 mb-1">
              <div className="flex justify-between w-full mr-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="cursor-pointer">
                        <div className="text-xs">Off MSRP</div>
                        <div className="relative font-bold text-2xl w-fit">
                          {formattedOtherPrice}
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
                        <span className="text-sm font-medium line-through">{formattedOtherPrice}</span>
                      </div>
                      {showDiscount && (
                        <div className="flex text-gray-500 justify-between items-center space-x-10">
                          <span className="text-sm">Dealership Discount</span>
                          <span className="text-sm font-medium">{formattedDiscount}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center space-x-10">
                        <span className="text-md font-bold">Sale Price</span>
                        <span className="text-lg font-bold">{formattedPrice}</span>
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
                          {formattedPrice}
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
                      <div className="flex justify-between items-center gap-8">
                        <span className="text-sm">MSRP</span>
                        <span className="text-sm font-medium line-through">{formattedOtherPrice}</span>
                      </div>
                      {showDiscount && (
                        <div className="flex text-gray-500 justify-between items-center space-x-10">
                          <span className="text-sm">Dealership Discount</span>
                          <span className="text-sm font-medium">{formattedDiscount}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center space-x-10">
                        <span className="text-md font-bold">Sale Price</span>
                        <span className="text-lg font-bold">{formattedPrice}</span>
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
                    sideOffset={16}
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

            <Link href={`/vdp/${carData.VIN}`}>
              <Button variant="outline" size="sm" className="w-full mb-2 rounded-full">
                Confirm Availability
              </Button>
            </Link>

            <Button variant="outline" size="sm" className="w-full mb-2 border-none underline">
              Estimate My Payment
            </Button>

            <div className="text-xs text-gray-500 text-center underline">{`${carData['Dealer Address']}, ${carData['Dealer City']}`}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
