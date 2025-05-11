import { ChevronDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

export default function FilterSidebar() {
  return (
    <div className="w-full lg:w-64 space-y-6">
      <div>
        <h3 className="font-medium mb-2">New</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="new" />
            <Label htmlFor="new" className="text-sm">
              New (105)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="pre-owned" />
            <Label htmlFor="pre-owned" className="text-sm">
              Pre-Owned (19)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="certified" />
            <Label htmlFor="certified" className="text-sm">
              Certified (1)
            </Label>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Show In Transit</h3>
          <Switch id="transit" />
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Year</h3>
          <ChevronDown className="h-4 w-4" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="2025" />
            <Label htmlFor="2025" className="text-sm">
              2025 (9)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="2024" />
            <Label htmlFor="2024" className="text-sm">
              2024 (71)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="2023" />
            <Label htmlFor="2023" className="text-sm">
              2023 (5)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="2022" />
            <Label htmlFor="2022" className="text-sm">
              2022 (1)
            </Label>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Make</h3>
          <ChevronDown className="h-4 w-4" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="nissan" />
            <Label htmlFor="nissan" className="text-sm">
              Nissan (20)
            </Label>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Model</h3>
          <ChevronDown className="h-4 w-4" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="altima" />
            <Label htmlFor="altima" className="text-sm">
              Altima (4)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="ariya" />
            <Label htmlFor="ariya" className="text-sm">
              Ariya (2)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="armada" />
            <Label htmlFor="armada" className="text-sm">
              Armada (3)
            </Label>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Bodystyle</h3>
          <ChevronDown className="h-4 w-4" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="coupe" />
            <Label htmlFor="coupe" className="text-sm">
              Coupe (31)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="hatchback" />
            <Label htmlFor="hatchback" className="text-sm">
              Hatchback (21)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="suv" />
            <Label htmlFor="suv" className="text-sm">
              SUV (1)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sedan" />
            <Label htmlFor="sedan" className="text-sm">
              Sedan (1)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="truck" />
            <Label htmlFor="truck" className="text-sm">
              Truck (1)
            </Label>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Fuel Type</h3>
          <ChevronDown className="h-4 w-4" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="gasoline" />
            <Label htmlFor="gasoline" className="text-sm">
              Gasoline (20)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="hybrid" />
            <Label htmlFor="hybrid" className="text-sm">
              Hybrid (10)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="electric" />
            <Label htmlFor="electric" className="text-sm">
              Electric (40)
            </Label>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Exterior Color</h3>
          <ChevronDown className="h-4 w-4" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="white" />
            <Label htmlFor="white" className="text-sm">
              White (20)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="black" />
            <Label htmlFor="black" className="text-sm">
              Black (22)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="red" />
            <Label htmlFor="red" className="text-sm">
              Red (10)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="yellow" />
            <Label htmlFor="yellow" className="text-sm">
              Yellow (5)
            </Label>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Interior Color</h3>
          <ChevronDown className="h-4 w-4" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="int-white" />
            <Label htmlFor="int-white" className="text-sm">
              White (20)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="int-black" />
            <Label htmlFor="int-black" className="text-sm">
              Black (22)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="int-red" />
            <Label htmlFor="int-red" className="text-sm">
              Red (10)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="int-yellow" />
            <Label htmlFor="int-yellow" className="text-sm">
              Yellow (5)
            </Label>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Drivetrain</h3>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Transmission</h3>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Engine</h3>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Dealer</h3>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Mileage</h3>
          <ChevronDown className="h-4 w-4" />
        </div>
        <div className="px-2 py-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Min</span>
            <span>Max</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span>0</span>
            <span>17,500</span>
          </div>
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Key Features</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="bluetooth" />
            <Label htmlFor="bluetooth" className="text-sm">
              Bluetooth (3494)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="keyless" />
            <Label htmlFor="keyless" className="text-sm">
              Keyless Start (1440)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="navigation" />
            <Label htmlFor="navigation" className="text-sm">
              Navigation System (5456)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="active-head" />
            <Label htmlFor="active-head" className="text-sm">
              Active Head Restraints (1340)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="brake-assist" />
            <Label htmlFor="brake-assist" className="text-sm">
              Brake Assist (1566)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="parking-assist" />
            <Label htmlFor="parking-assist" className="text-sm">
              Parking Assist Systems (1340)
            </Label>
          </div>
          <button className="text-sm text-blue-600 mt-2">+ Show More</button>
        </div>
      </div>
    </div>
  )
}
