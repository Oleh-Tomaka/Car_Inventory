"use client"

import { ChevronDown, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FilterChip {
  id: string
  label: string
  category: string
}

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    condition: true,
    make: true,
    model: true,
    year: true,
    price: true,
  });

  const [selectedFilters, setSelectedFilters] = useState<FilterChip[]>([]);
  const [checkedFilters, setCheckedFilters] = useState<Record<string, boolean>>({
    new: false,
    'pre-owned': false,
    certified: false,
  });

  const [filters, setFilters] = useState({
    make: '',
    priceMin: '',
    priceMax: '',
    conditions: [] as string[],
    years: [] as string[],
    models: [] as string[],
    bodyStyles: [] as string[],
    fuelTypes: [] as string[],
    drivetrains: [] as string[],
    transmissions: [] as string[],
    engines: [] as string[],
    showInTransit: false,
  });

  const [filterCounts, setFilterCounts] = useState({
    condition: { new: 0, preOwned: 0, certified: 0 },
    year: {} as Record<string, number>,
    make: {} as Record<string, number>,
    model: {} as Record<string, number>,
    bodyStyle: {} as Record<string, number>,
    fuelType: {} as Record<string, number>,
    drivetrain: {} as Record<string, number>,
    transmission: {} as Record<string, number>,
    engine: {} as Record<string, number>,
  });

  useEffect(() => {
    fetchFilterCounts();
  }, []);

  const fetchFilterCounts = async () => {
    try {
      const response = await fetch('/api/cars');
      const data = await response.json();
      if (data.success) {
        setFilterCounts(data.filterCounts);
      }
    } catch (error) {
      console.error('Error fetching filter counts:', error);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (id: string, value: string, type: string, checked: boolean) => {
    const newCheckedFilters = { ...checkedFilters, [id]: checked };
    setCheckedFilters(newCheckedFilters);

    // Update filters based on the type
    const updatedFilters = { ...filters };
    
    switch (type) {
      case 'condition':
        updatedFilters.conditions = Object.entries(newCheckedFilters)
          .filter(([key, isChecked]) => isChecked && ['new', 'pre-owned', 'certified'].includes(key))
          .map(([key]) => key);
        break;
      case 'year':
        updatedFilters.years = Object.entries(newCheckedFilters)
          .filter(([key, isChecked]) => isChecked && /^\d{4}$/.test(key))
          .map(([key]) => key);
        break;
      case 'make':
        updatedFilters.make = Object.entries(newCheckedFilters)
          .filter(([key, isChecked]) => isChecked)
          .map(([key]) => key)[0] || '';
        break;
      case 'model':
        updatedFilters.models = Object.entries(newCheckedFilters)
          .filter(([key, isChecked]) => isChecked)
          .map(([key]) => key);
        break;
      case 'bodystyle':
        updatedFilters.bodyStyles = Object.entries(newCheckedFilters)
          .filter(([key, isChecked]) => isChecked)
          .map(([key]) => key);
        break;
      case 'fuelType':
        updatedFilters.fuelTypes = Object.entries(newCheckedFilters)
          .filter(([key, isChecked]) => isChecked)
          .map(([key]) => key);
        break;
      case 'drivetrain':
        updatedFilters.drivetrains = Object.entries(newCheckedFilters)
          .filter(([key, isChecked]) => isChecked)
          .map(([key]) => key);
        break;
      case 'transmission':
        updatedFilters.transmissions = Object.entries(newCheckedFilters)
          .filter(([key, isChecked]) => isChecked)
          .map(([key]) => key);
        break;
      case 'engine':
        updatedFilters.engines = Object.entries(newCheckedFilters)
          .filter(([key, isChecked]) => isChecked)
          .map(([key]) => key);
        break;
      case 'transit':
        updatedFilters.showInTransit = checked;
        break;
    }

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
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

  const handleFilterChangeFromInput = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
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
              New ({filterCounts.condition.new})
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
              Pre-Owned ({filterCounts.condition.preOwned})
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
              Certified ({filterCounts.condition.certified})
            </Label>
          </div>
        </div>
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Show In Transit</h3>
          <Switch 
            id="transit" 
            checked={filters.showInTransit}
            onCheckedChange={(checked) => 
              handleFilterChange('transit', 'In Transit', 'transit', checked as boolean)
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
            {Object.entries(filterCounts.year)
              .sort(([a], [b]) => parseInt(b) - parseInt(a))
              .map(([year, count]) => (
                <div key={year} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`year-${year}`}
                    checked={checkedFilters[year]}
                    onCheckedChange={(checked) => 
                      handleFilterChange(year, year, 'year', checked as boolean)
                    }
                  />
                  <Label htmlFor={`year-${year}`} className="text-sm">
                    {year} ({count})
                  </Label>
                </div>
              ))}
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
            {Object.entries(filterCounts.make)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([make, count]) => (
                <div key={make} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`make-${make}`}
                    checked={checkedFilters[make]}
                    onCheckedChange={(checked) => 
                      handleFilterChange(make, make, 'make', checked as boolean)
                    }
                  />
                  <Label htmlFor={`make-${make}`} className="text-sm">
                    {make} ({count})
                  </Label>
                </div>
              ))}
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
            {Object.entries(filterCounts.model)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([model, count]) => (
                <div key={model} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`model-${model}`}
                    checked={checkedFilters[model]}
                    onCheckedChange={(checked) => 
                      handleFilterChange(model, model, 'model', checked as boolean)
                    }
                  />
                  <Label htmlFor={`model-${model}`} className="text-sm">
                    {model} ({count})
                  </Label>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('bodystyle')}
        >
          <h3 className="font-medium">Body Style</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.bodystyle ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.bodystyle && (
          <div className="space-y-2">
            {Object.entries(filterCounts.bodyStyle)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([style, count]) => (
                <div key={style} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`bodystyle-${style}`}
                    checked={checkedFilters[style]}
                    onCheckedChange={(checked) => 
                      handleFilterChange(style, style, 'bodystyle', checked as boolean)
                    }
                  />
                  <Label htmlFor={`bodystyle-${style}`} className="text-sm">
                    {style} ({count})
                  </Label>
                </div>
              ))}
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
            {Object.entries(filterCounts.fuelType)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([type, count]) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`fueltype-${type}`}
                    checked={checkedFilters[type]}
                    onCheckedChange={(checked) => 
                      handleFilterChange(type, type, 'fuelType', checked as boolean)
                    }
                  />
                  <Label htmlFor={`fueltype-${type}`} className="text-sm">
                    {type} ({count})
                  </Label>
                </div>
              ))}
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
        {expandedSections.drivetrain && (
          <div className="space-y-2">
            {Object.entries(filterCounts.drivetrain)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([type, count]) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`drivetrain-${type}`}
                    checked={checkedFilters[type]}
                    onCheckedChange={(checked) => 
                      handleFilterChange(type, type, 'drivetrain', checked as boolean)
                    }
                  />
                  <Label htmlFor={`drivetrain-${type}`} className="text-sm">
                    {type} ({count})
                  </Label>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('transmission')}
        >
          <h3 className="font-medium">Transmission</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.transmission ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.transmission && (
          <div className="space-y-2">
            {Object.entries(filterCounts.transmission)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([type, count]) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`transmission-${type}`}
                    checked={checkedFilters[type]}
                    onCheckedChange={(checked) => 
                      handleFilterChange(type, type, 'transmission', checked as boolean)
                    }
                  />
                  <Label htmlFor={`transmission-${type}`} className="text-sm">
                    {type} ({count})
                  </Label>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="relative -mx-4 px-4 pt-4 border-t border-gray-200">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('engine')}
        >
          <h3 className="font-medium">Engine</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.engine ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.engine && (
          <div className="space-y-2">
            {Object.entries(filterCounts.engine)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([type, count]) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`engine-${type}`}
                    checked={checkedFilters[type]}
                    onCheckedChange={(checked) => 
                      handleFilterChange(type, type, 'engine', checked as boolean)
                    }
                  />
                  <Label htmlFor={`engine-${type}`} className="text-sm">
                    {type} ({count})
                  </Label>
                </div>
              ))}
          </div>
        )}
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

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
          <Input
            placeholder="Enter make"
            value={filters.make}
            onChange={(e) => handleFilterChangeFromInput('make', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <div className="flex gap-2">
            <Input
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => handleFilterChangeFromInput('priceMin', e.target.value)}
            />
            <Input
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => handleFilterChangeFromInput('priceMax', e.target.value)}
            />
          </div>
        </div>

        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            setFilters({
              make: '',
              priceMin: '',
              priceMax: '',
              conditions: [],
              years: [],
              models: [],
              bodyStyles: [],
              fuelTypes: [],
              drivetrains: [],
              transmissions: [],
              engines: [],
              showInTransit: false,
            });
            setCheckedFilters({
              new: false,
              'pre-owned': false,
              certified: false,
            });
            onFilterChange({
              make: '',
              priceMin: '',
              priceMax: '',
              conditions: [],
              years: [],
              models: [],
              bodyStyles: [],
              fuelTypes: [],
              drivetrains: [],
              transmissions: [],
              engines: [],
              showInTransit: false,
            });
          }}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  )
}
