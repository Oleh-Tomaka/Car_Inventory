import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Car } from '@/types/car';
import { useState } from 'react';

interface CarDetailsProps {
  car: Car;
}

const CarDetails = ({ car }: CarDetailsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncateText = car.Comments?.slice(0, 900) + '...';

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const specifications = [
    {
      label: 'Stock Type',
      value: car['New/Used'] === 'N' ? 'New' : 'Used',
      icon: '/images/stock-type.svg'
    },
    {
      label: 'VIN',
      value: car.VIN,
      icon: '/images/vin.svg'
    },
    {
      label: 'Stock',
      value: car['Stock #'],
      icon: '/images/vin.svg'
    },
    {
      label: 'Make & Model',
      value: `${car.Make} ${car.Model}`,
      icon: '/images/make.svg'
    },
    {
      label: 'Trim',
      value: car.Series,
      icon: '/images/vin.svg'
    },
    {
      label: 'Doors',
      value: `${car.Body.split('')[0]} Door`,
      icon: '/images/door.svg'
    },
    {
      label: 'MPG City',
      value: car['City MPG'],
      icon: '/images/piston.svg'
    },
    {
      label: 'MPG Highway',
      value: car['Highway MPG'],
      icon: '/images/piston.svg'
    },
    {
      label: 'Year',
      value: car.Year,
      icon: '/images/year.svg'
    },
    {
      label: 'Mileage',
      value: `${new Intl.NumberFormat().format(parseInt(car.Odometer))} miles`,
      icon: '/images/mileage.svg'
    },
    {
      label: 'Fuel Type',
      value: car.Fuel,
      icon: '/images/fuel.svg'
    },
    {
      label: 'Transmission',
      value: car.Transmission,
      icon: '/images/transmission.svg'
    },
    {
      label: 'Drive Type',
      value: car['Drivetrain Desc'],
      icon: '/images/drive-type.svg'
    },
    {
      label: 'Exterior Color',
      value: car.Colour,
      icon: '/images/fill.svg'
    },
    {
      label: 'Interior Color',
      value: car['Interior Color'],
      icon: '/images/fill.svg'
    }
  ];

  return (
    <div className="w-full">
      <div className="mt-8 hidden md:block">
        <h2 className="text-xl font-bold mb-4">Details</h2>
        <div className="flex flex-wrap justify-between gap-1">
          <div className="space-y-4 mb-4">
            {specifications.slice(0, 8).map((spec, index) => (
              <div key={index} className="flex items-center gap-6">
                <div className="flex items-center gap-2 w-[210px]">
                  <Image src={spec.icon} alt={spec.label} width={16} height={16} />
                  <p className="text-sm text-muted-foreground">{spec.label}</p>
                </div>
                <p className="text-sm">{spec.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {specifications.slice(8).map((spec, index) => (
              <div key={index} className="flex items-center gap-6">
                <div className="flex items-center gap-2 w-[210px]">
                  <Image src={spec.icon} alt={spec.label} width={16} height={16} />
                  <p className="text-sm text-muted-foreground">{spec.label}</p>
                </div>
                <p className="text-sm">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Description</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isExpanded ? car.Comments : truncateText}
        </p>
        <Button 
          variant="link" 
          className="mt-2 ml-auto p-0 h-auto text-md flex border-none font-medium" 
          onClick={toggleExpanded}
        >
          {isExpanded ? '- Show Less' : '+ Show More'}
        </Button>
      </div>

      <div className="mt-8">
        <Button 
          variant="outline" 
          className="px-8 py-6 border-none rounded-[12px] text-base bg-[#FFE9F3] flex items-center gap-2"
        >
          <Image src="/images/drive-type.svg" alt="Schedule Test Drive" width={22} height={22} />
          Schedule Test Drive
        </Button>
      </div>
    </div>
  );
};

export default CarDetails; 