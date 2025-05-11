"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ImageGallery() {
  const [activeImage, setActiveImage] = useState(0)

  const images = [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
  ]

  return (
    <div className="space-y-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <Image src={images[activeImage] || "/placeholder.svg"} alt="Nissan Versa" fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-between p-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full opacity-80"
            onClick={() => setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full opacity-80"
            onClick={() => setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {images.slice(1).map((image, index) => (
          <div
            key={index}
            className={`aspect-[4/3] overflow-hidden rounded-lg cursor-pointer ${activeImage === index + 1 ? "ring-2 ring-primary" : ""}`}
            onClick={() => setActiveImage(index + 1)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Nissan Versa thumbnail ${index + 1}`}
              width={150}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted flex items-center justify-center cursor-pointer">
          <span className="text-xs font-medium">All Images</span>
        </div>
      </div>
    </div>
  )
}
