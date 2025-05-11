import Image from "next/image"
import { Heart, Share2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarListingProps {
  discount: string
  discountType: "amount" | "percent"
  isNew: boolean
}

export default function CarListing({ discount, discountType, isNew }: CarListingProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="relative">
        <Image
          src="/placeholder.svg?height=200&width=300"
          alt="Nissan Versa"
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div
          className={`absolute top-2 left-2 ${discountType === "amount" ? "bg-red-500" : "bg-red-600"} text-white text-xs font-bold px-2 py-1 rounded`}
        >
          {discountType === "amount" ? discount : `${discount} on 0% for 72 mos`}
        </div>
        <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full">
          <Heart className="h-4 w-4 text-gray-500" />
        </button>
        <div className="absolute bottom-2 left-2 bg-white/80 text-xs px-1.5 py-0.5 rounded flex items-center">
          <span className={`w-2 h-2 rounded-full ${isNew ? "bg-green-500" : "bg-blue-500"} mr-1`}></span>
          {isNew ? "New" : "Used"}
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-sm">2023 Nissan Versa 1.6 SR</h3>
          <div className="flex">
            <span className="bg-gray-200 text-xs px-1 rounded mr-1">SR</span>
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Sedan FWD</span>
          <span>5.7k miles</span>
        </div>

        <div className="flex text-xs mb-3">
          <div className="flex items-center mr-4">
            <span className="mr-1">{isNew ? "New" : "Used"}</span>
            <span className="text-gray-400">|</span>
            <span className="mx-1">#1223013</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">Trim 4.6 R</span>
            <span className="text-gray-400">|</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex space-x-2">
            <button className="p-1.5 border rounded">
              <Share2 className="h-4 w-4 text-gray-500" />
            </button>
            <button className="p-1.5 border rounded">
              <Heart className="h-4 w-4 text-gray-500" />
            </button>
            <button className="p-1.5 border rounded">
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-xs text-gray-500">Off MSRP</div>
            <div className="font-bold">$23,190</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 text-right">Sale Price</div>
            <div className="font-bold">$23,190</div>
          </div>
        </div>

        <div className="text-center text-xs mb-2">Confirm Availability</div>

        <Button variant="outline" size="sm" className="w-full mb-2">
          Estimate My Payment
        </Button>

        <div className="text-xs text-gray-500 text-center">28700 SW 95th Ave, Wilsonville</div>
      </div>
    </div>
  )
}
