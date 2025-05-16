import { Car } from '@/types/car';
import Image from 'next/image';
import { CarCard } from '@/components/car/car-card';

interface CarGridProps {
  cars: Car[];
  loading: boolean;
}

export function CarGrid({ cars, loading }: CarGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Image src="/images/loading.gif" alt="Loading" width={80} height={80} />
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No cars found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
      {cars.map((car) => {
        const price = car.Price || car['Other Price'] || '0';
        const otherPrice = car['Other Price'] || car.Price || '0';
        const priceDiff = parseInt(otherPrice) - parseInt(price);
        const showDiscount = priceDiff > 0;
        
        return (
          <CarCard
            key={car.VIN}
            car={car}
            discount={showDiscount ? priceDiff.toString() : undefined}
            discountType={car['New/Used'] === 'N' ? 'amount' : 'percent'}
            isNew={car['New/Used'] === 'N'}
          />
        );
      })}
    </div>
  );
} 