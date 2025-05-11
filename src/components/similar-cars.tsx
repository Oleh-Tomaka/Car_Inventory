import Image from "next/image"
import { Heart, Share2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function SimilarCars() {
  const cars = [
    {
      id: 1,
      title: "2025 Nissan Versa 1.6 SR",
      image: "/placeholder.svg?height=200&width=300",
      price: "$43,650",
      dealer: "Sedan FWD",
      mileage: "900 miles",
      location: "Miami",
    },
    {
      id: 2,
      title: "2025 Nissan Versa 1.6 SR",
      image: "/placeholder.svg?height=200&width=300",
      price: "$43,650",
      dealer: "Sedan FWD",
      mileage: "900 miles",
      location: "Miami",
    },
    {
      id: 3,
      title: "2025 Nissan Versa 1.6 SR",
      image: "/placeholder.svg?height=200&width=300",
      price: "$43,650",
      dealer: "Sedan FWD",
      mileage: "900 miles",
      location: "Miami",
    },
    {
      id: 4,
      title: "2025 Nissan Versa 1.6 SR",
      image: "/placeholder.svg?height=200&width=300",
      price: "$43,650",
      dealer: "Sedan FWD",
      mileage: "900 miles",
      location: "Miami",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cars.map((car) => (
        <div key={car.id} className="border rounded-lg overflow-hidden group">
          <div className="relative">
            <Badge className="absolute top-2 left-2 bg-primary text-white">LOW MILEAGE</Badge>
            <div className="absolute top-2 right-2 flex gap-1">
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={car.image || "/placeholder.svg"}
              alt={car.title}
              width={300}
              height={200}
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <Badge variant="outline">{car.dealer}</Badge>
              <Badge variant="outline">{car.location}</Badge>
            </div>
            <h3 className="font-bold mb-2">{car.title}</h3>
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">{car.price}</p>
              <Button variant="link" className="p-0 h-auto text-sm">
                More Details
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
