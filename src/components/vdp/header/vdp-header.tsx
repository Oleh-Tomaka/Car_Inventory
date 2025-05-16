import Image from 'next/image';
import { Car } from '@/types/car';

interface VDPHeaderProps {
  car: Car;
}

export function VDPHeader({ car }: VDPHeaderProps) {
  return (
    <div>
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
              <h3 className="text-3xl font-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(parseInt(car.Price || '0'))}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-1.5xl">MSRP</p>
              <p className="text-1.5xl line-through">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(parseInt(car['Other Price'] || '0'))}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg">See Pricing Details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 