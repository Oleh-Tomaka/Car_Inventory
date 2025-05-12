"use client"

import { ChevronDown, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import Image from "next/image"

interface FilterChip {
  id: string
  label: string
  category: string
}

export default function FilterSidebar() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    year: true,
    make: true,
    model: true,
    bodystyle: true,
    fuelType: true,
    exteriorColor: true,
    interiorColor: true,
    drivetrain: true,
    transmission: true,
    engine: true,
    dealer: true,
    mileage: true,
    keyFeatures: true
  });

  const [selectedFilters, setSelectedFilters] = useState<FilterChip[]>([]);
  const [checkedFilters, setCheckedFilters] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (id: string, label: string, category: string, checked: boolean) => {
    setCheckedFilters(prev => ({
      ...prev,
      [id]: checked
    }));

    if (checked) {
      setSelectedFilters(prev => [...prev, { id, label, category }]);
    } else {
      setSelectedFilters(prev => prev.filter(filter => filter.id !== id));
    }
  };

  const removeFilter = (id: string) => {
    setSelectedFilters(prev => prev.filter(filter => filter.id !== id));
    setCheckedFilters(prev => ({
      ...prev,
      [id]: false
    }));
  };

  const getSelectedCount = (category: string) => {
    return selectedFilters.filter(filter => filter.category === category).length;
  };

  return (
    <div className="w-full lg:w-64 space-y-6 border rounded-lg border-gray-200 p-4">
      <div className="text-sm text-gray-500 mb-6">Showing 1 to 10 of 124 vehicles</div>
      
      {/* Active Filters Chips */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedFilters.map((filter) => (
            <div
              key={filter.id}
              className="flex items-center gap-1 px-4 py-1 bg-gray-200 rounded-full text-sm"
            >
              <span className="pr-2">{filter.label}</span>
              <button
                onClick={() => removeFilter(filter.id)}
                className="hover:text-gray-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Condition</h3>
          {getSelectedCount('condition') > 0 && (
            <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
              {getSelectedCount('condition')}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="new" 
              checked={checkedFilters['new']}
              onCheckedChange={(checked) => 
                handleFilterChange('new', 'New', 'condition', checked as boolean)
              }
            />
            <Label htmlFor="new" className="text-sm">
              New (105)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="pre-owned" 
              checked={checkedFilters['pre-owned']}
              onCheckedChange={(checked) => 
                handleFilterChange('pre-owned', 'Pre-Owned', 'condition', checked as boolean)
              }
            />
            <Label htmlFor="pre-owned" className="text-sm">
              Pre-Owned (19)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="certified" 
              checked={checkedFilters['certified']}
              onCheckedChange={(checked) => 
                handleFilterChange('certified', 'Certified', 'condition', checked as boolean)
              }
            />
            <Label htmlFor="certified" className="text-sm">
              Certified (1)
            </Label>
          </div>
        </div>
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Show In Transit</h3>
          <Switch 
            id="transit" 
            checked={checkedFilters['transit']}
            onCheckedChange={(checked) => 
              handleFilterChange('transit', 'In Transit', 'status', checked as boolean)
            }
          />
        </div>
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('year')}
        >
          <h3 className="font-medium">Year</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.year ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.year && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="2025" 
                checked={checkedFilters['2025']}
                onCheckedChange={(checked) => 
                  handleFilterChange('2025', '2025', 'year', checked as boolean)
                }
              />
              <Label htmlFor="2025" className="text-sm">
                2025 (9)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="2024" 
                checked={checkedFilters['2024']}
                onCheckedChange={(checked) => 
                  handleFilterChange('2024', '2024', 'year', checked as boolean)
                }
              />
              <Label htmlFor="2024" className="text-sm">
                2024 (71)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="2023" 
                checked={checkedFilters['2023']}
                onCheckedChange={(checked) => 
                  handleFilterChange('2023', '2023', 'year', checked as boolean)
                }
              />
              <Label htmlFor="2023" className="text-sm">
                2023 (5)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="2022" 
                checked={checkedFilters['2022']}
                onCheckedChange={(checked) => 
                  handleFilterChange('2022', '2022', 'year', checked as boolean)
                }
              />
              <Label htmlFor="2022" className="text-sm">
                2022 (1)
              </Label>
            </div>
          </div>
        )}
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('make')}
        >
          <h3 className="font-medium">Make</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.make ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.make && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="nissan" />
              <Label htmlFor="nissan" className="text-sm">
                Nissan (20)
              </Label>
            </div>
          </div>
        )}
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('model')}
        >
          <h3 className="font-medium">Model</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.model ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.model && (
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
        )}
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('bodystyle')}
        >
          <h3 className="font-medium">Bodystyle</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.bodystyle ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.bodystyle && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 py-2">
              <Image src="/images/coupe.svg" alt="Coupe" 
              width={66} height={24}
               />
              <Label htmlFor="coupe" className="text-sm">
                Coupe (31)
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-2">
            <Image src="/images/hatchback.svg" alt="Hatchback" 
              width={57} height={24}
               />
              <Label htmlFor="hatchback" className="text-sm">
                Hatchback (21)
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-2">
            <Image src="/images/suv.svg" alt="SUV" 
              width={56} height={24}
               />
              <Label htmlFor="suv" className="text-sm">
                SUV (1)
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-2">
            <Image src="/images/sedan.svg" alt="Sedan" 
              width={56} height={24}
               />
              <Label htmlFor="sedan" className="text-sm">
                Sedan (1)
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-2">
            <Image src="/images/truck.svg" alt="Truck" 
              width={56} height={24}
               />
              <Label htmlFor="truck" className="text-sm">
                Truck (1)
              </Label>
            </div>
          </div>
        )}
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('fuelType')}
        >
          <h3 className="font-medium">Fuel Type</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.fuelType ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.fuelType && (
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
        )}
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('exteriorColor')}
        >
          <h3 className="font-medium">Exterior Color</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.exteriorColor ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.exteriorColor && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleFilterChange('white', 'White', 'exteriorColor', !checkedFilters['white'])}
                className={`w-4 h-4 rounded-full border-2 ${checkedFilters['white'] ? 'border-black' : 'border-gray-200'}`}
                style={{ backgroundColor: '#FFFFFF' }}
              />
              <Label htmlFor="white" className="text-sm">
                White (20)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleFilterChange('black', 'Black', 'exteriorColor', !checkedFilters['black'])}
                className={`w-4 h-4 rounded-full border-2 ${checkedFilters['black'] ? 'border-black' : 'border-gray-200'}`}
                style={{ backgroundColor: '#000000' }}
              />
              <Label htmlFor="black" className="text-sm">
                Black (22)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleFilterChange('red', 'Red', 'exteriorColor', !checkedFilters['red'])}
                className={`w-4 h-4 rounded-full border-2 ${checkedFilters['red'] ? 'border-black' : 'border-gray-200'}`}
                style={{ backgroundColor: '#FF0000' }}
              />
              <Label htmlFor="red" className="text-sm">
                Red (10)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleFilterChange('yellow', 'Yellow', 'exteriorColor', !checkedFilters['yellow'])}
                className={`w-4 h-4 rounded-full border-2 ${checkedFilters['yellow'] ? 'border-black' : 'border-gray-200'}`}
                style={{ backgroundColor: '#FFD700' }}
              />
              <Label htmlFor="yellow" className="text-sm">
                Yellow (5)
              </Label>
            </div>
          </div>
        )}
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('interiorColor')}
        >
          <h3 className="font-medium">Interior Color</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.interiorColor ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.interiorColor && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleFilterChange('int-white', 'White', 'interiorColor', !checkedFilters['int-white'])}
                className={`w-4 h-4 rounded-full border-2 ${checkedFilters['int-white'] ? 'border-black' : 'border-gray-200'}`}
                style={{ backgroundColor: '#FFFFFF' }}
              />
              <Label htmlFor="int-white" className="text-sm">
                White (20)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleFilterChange('int-black', 'Black', 'interiorColor', !checkedFilters['int-black'])}
                className={`w-4 h-4 rounded-full border-2 ${checkedFilters['int-black'] ? 'border-black' : 'border-gray-200'}`}
                style={{ backgroundColor: '#000000' }}
              />
              <Label htmlFor="int-black" className="text-sm">
                Black (22)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleFilterChange('int-red', 'Red', 'interiorColor', !checkedFilters['int-red'])}
                className={`w-4 h-4 rounded-full border-2 ${checkedFilters['int-red'] ? 'border-black' : 'border-gray-200'}`}
                style={{ backgroundColor: '#FF0000' }}
              />
              <Label htmlFor="int-red" className="text-sm">
                Red (10)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleFilterChange('int-yellow', 'Yellow', 'interiorColor', !checkedFilters['int-yellow'])}
                className={`w-4 h-4 rounded-full border-2 ${checkedFilters['int-yellow'] ? 'border-black' : 'border-gray-200'}`}
                style={{ backgroundColor: '#FFD700' }}
              />
              <Label htmlFor="int-yellow" className="text-sm">
                Yellow (5)
              </Label>
            </div>
          </div>
        )}
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('drivetrain')}
        >
          <h3 className="font-medium">Drivetrain</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.drivetrain ? 'rotate-180' : ''}`} />
        </div>
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('transmission')}
        >
          <h3 className="font-medium">Transmission</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.transmission ? 'rotate-180' : ''}`} />
        </div>
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('engine')}
        >
          <h3 className="font-medium">Engine</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.engine ? 'rotate-180' : ''}`} />
        </div>
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('dealer')}
        >
          <h3 className="font-medium">Dealer</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.dealer ? 'rotate-180' : ''}`} />
        </div>
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('mileage')}
        >
          <h3 className="font-medium">Mileage</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.mileage ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.mileage && (
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
        )}
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('keyFeatures')}
        >
          <h3 className="font-medium">Key Features</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.keyFeatures ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.keyFeatures && (
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
        )}
      </div>
    </div>
  )
}
