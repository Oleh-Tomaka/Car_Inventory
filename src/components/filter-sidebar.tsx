"use client"

import { ChevronDown, EyeIcon, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useState, useEffect, useRef } from "react"
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
  const [isVisible, setIsVisible] = useState(true);
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
    exteriorColors: [] as string[],
    interiorColors: [] as string[],
    mileageMin: 0,
    mileageMax: 200000,
  });

  const [mileageRange, setMileageRange] = useState([0, 200000]);

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

  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

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
      case 'exteriorColor':
        if (checked) {
          updatedFilters.exteriorColors = [...(updatedFilters.exteriorColors || []), value];
        } else {
          updatedFilters.exteriorColors = (updatedFilters.exteriorColors || []).filter(c => c !== value);
        }
        break;
      case 'interiorColor':
        if (checked) {
          updatedFilters.interiorColors = [...(updatedFilters.interiorColors || []), value];
        } else {
          updatedFilters.interiorColors = (updatedFilters.interiorColors || []).filter(c => c !== value);
        }
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

  const handleColorFilter = (type: 'exterior' | 'interior', color: string) => {
    const colorType = type === 'exterior' ? 'exteriorColor' : 'interiorColor';
    const isChecked = type === 'exterior' 
      ? !filters.exteriorColors.includes(color)
      : !filters.interiorColors.includes(color);
    
    handleFilterChange(color, color, colorType, isChecked);
  };

  const handleMileageChange = (values: number[]) => {
    setMileageRange(values);
    const updatedFilters = {
      ...filters,
      mileageMin: values[0],
      mileageMax: values[1],
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const formatMileage = (value: number) => {
    if (value >= 2000000) {
      return `${(value / 2000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toString();
  };

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const position = Math.max(0, Math.min(1, (e.clientX - sliderRect.left) / sliderRect.width));
    const value = Math.round(position * 200000 / 1000) * 1000; // Round to nearest 1000

    if (isDragging === 'min') {
      const newMin = Math.min(value, mileageRange[1] - 1000);
      handleMileageChange([newMin, mileageRange[1]]);
    } else {
      const newMax = Math.max(value, mileageRange[0] + 1000);
      handleMileageChange([mileageRange[0], newMax]);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, mileageRange]);

  return (
    <div className="w-full lg:w-64 md:border rounded-[16px] border-gray-200 p-2">
      <div className="flex justify-evenly items-center my-1 gap-3">
          <button className="text-sm flex items-center gap-3"
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
                exteriorColors: [],
                interiorColors: [],
                mileageMin: 0,
                mileageMax: 200000,
              });
              // Reset all checked filters
              setCheckedFilters({
                new: false,
                'pre-owned': false,
                certified: false,
                ...Object.fromEntries(
                  Object.keys(checkedFilters)
                    .filter(key => !['new', 'pre-owned', 'certified'].includes(key))
                    .map(key => [key, false])
                )
              });
              // Reset mileage range
              setMileageRange([0, 200000]);
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
                exteriorColors: [],
                interiorColors: [],
                mileageMin: 0,
                mileageMax: 200000,
              });
            }}
          >
            <Image src="/images/refresh.svg" alt="Refresh Filter" width={16} height={16} />
            Reset Filter
          </button>
          {isVisible ? (
            <button className="text-sm flex items-center gap-3"
              onClick={() => setIsVisible(false)} >
              <Image src="/images/hidden.svg" alt="Hide Filter" width={16} height={16} />
              Hide Filter
            </button>
          ) : (
            <button className="text-sm flex items-center gap-3"
              onClick={() => setIsVisible(true)} >
              <EyeIcon width={20} height={20} strokeWidth={1} />
              Show Filter
            </button>
          )}
      </div>
      
      {isVisible && (
        <div className="p-2">
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
            <div className="flex items-center justify-between mb-2 mt-4">
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

          <div className="relative -mx-4 mt-4 px-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
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

          <div className="relative -mx-4 mt-4 px-4 pt-4 border-t border-gray-200">
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

          <div className="relative -mx-4 mt-4 px-4 pt-4 border-t border-gray-200">
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

          <div className="relative -mx-4 mt-4 px-4 pt-4 border-t border-gray-200">
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

          <div className="relative -mx-4 mt-4 px-4 pt-4 border-t border-gray-200">
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
                      <div 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleFilterChange(style, style, 'bodystyle', !checkedFilters[style])}
                      >
                        <Image 
                          src={`/images/${style.toLowerCase().includes('coupe') ? 'Coupe.svg' : 
                            style.toLowerCase().includes('sedan') ? 'Sedan.svg' :
                            style.toLowerCase().includes('suv') ? 'SUV.svg' :
                            style.toLowerCase().includes('hatchback') ? 'Hatchback.svg' :
                            style.toLowerCase().includes('convertible') ? 'Convertible.png' :
                            style.toLowerCase().includes('van') ? 'Van.png' :
                            style.toLowerCase().includes('truck') ? 'Truck.svg' :
                            style.toLowerCase().includes('pickup') ? 'Pickup.svg' :
                            style.toLowerCase().includes('minivan') ? 'Minivan.svg' :
                            style.toLowerCase().includes('cab') ? 'Cab.png' :
                            style.toLowerCase().includes('sport') ? 'Sport.png' :
                            'Coupe.svg'}`}
                          alt={style}
                          width={58}
                          height={20}
                          className={`${checkedFilters[style] ? 'opacity-100' : 'opacity-70'}`}
                        />
                        <Label htmlFor={`bodystyle-${style}`} className="text-sm">
                          {style} ({count})
                        </Label>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="relative -mx-4 mt-4 px-4 pt-4 border-t border-gray-200">
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

          <div className="relative -mx-4 mt-4 px-4 pt-4 border-t border-gray-200">
            <div 
              className="flex items-center justify-between mb-2 cursor-pointer"
              onClick={() => toggleSection('exteriorColor')}
            >
              <h3 className="font-medium">Exterior Color</h3>
              <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.exteriorColor ? 'rotate-180' : ''}`} />
            </div>
            {expandedSections.exteriorColor && (
              <div className="grid grid-cols-4 gap-2">
                {['White', 'Black', 'Red', 'Blue', 'Silver', 'Gray', 'Pearl White Tricoat', 'Deep Blue Pearl'].map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorFilter('exterior', color)}
                    className={`flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 ${
                      filters.exteriorColors?.includes(color) ? 'bg-gray-100' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full border border-gray-200 mb-1" style={getGradientStyle(color)} />
                    <span className="text-xs text-center">{color}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative -mx-4 mt-4 px-4 pt-4 border-t border-gray-200">
            <div 
              className="flex items-center justify-between mb-2 cursor-pointer"
              onClick={() => toggleSection('interiorColor')}
            >
              <h3 className="font-medium">Interior Color</h3>
              <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.interiorColor ? 'rotate-180' : ''}`} />
            </div>
            {expandedSections.interiorColor && (
              <div className="grid grid-cols-4 gap-2">
                {['Black', 'Gray', 'Beige', 'Brown', 'Red', 'White', 'Tan', 'Cream'].map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorFilter('interior', color)}
                    className={`flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 ${
                      filters.interiorColors?.includes(color) ? 'bg-gray-100' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full border border-gray-200 mb-1" style={getGradientStyle(color)} />
                    <span className="text-xs text-center">{color}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative -mx-4 mt-4 px-4 pt-4 border-t border-gray-200">
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

          <div className="relative -mx-4 mt-4 px-4 pt-4 border-t border-gray-200">
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

          <div className="relative -mx-4 mt-4 px-4 pt-4 border-t border-gray-200">
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

          <div className="relative -mx-4 mt-4 px-4 pt-4 border-t border-gray-200">
            <div 
              className="flex items-center justify-between mb-2 cursor-pointer"
              onClick={() => toggleSection('dealer')}
            >
              <h3 className="font-medium">Dealer</h3>
              <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.dealer ? 'rotate-180' : ''}`} />
            </div>
          </div>

          <div className="relative -mx-4 mt-4 px-4 pt-4 border-t border-gray-200">
            <div 
              className="flex items-center justify-between mb-2 cursor-pointer"
              onClick={() => toggleSection('mileage')}
            >
              <h3 className="font-medium">Mileage</h3>
              <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.mileage ? 'rotate-180' : ''}`} />
            </div>
            {expandedSections.mileage && (
              <div className="px-0 py-4">
                <div className="flex justify-between gap-2 mb-6">
                  <div className="flex flex-col text-sm rounded-[12px] w-1/2 border border-gray-200 px-2 py-1">
                    <span className="text-gray-400">Min</span>
                    <span>{formatMileage(mileageRange[0])}</span>
                  </div>
                  <div className="flex flex-col text-sm rounded-[12px] w-1/2 border border-gray-200 px-2 py-1">
                    <span className="text-gray-400">Max</span>
                    <span>{formatMileage(mileageRange[1])}</span>
                  </div>
                </div>
                <div className="relative px-4 max-w-[90%] mx-auto" ref={sliderRef}>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full">
                    <div 
                      className="absolute h-1 bg-black rounded-full"
                      style={{
                        left: `${(mileageRange[0] / 200000) * 100}%`,
                        right: `${100 - (mileageRange[1] / 200000) * 100}%`
                      }}
                    />
                  </div>
                  <div 
                    className="absolute top-[4px] -translate-y-1/2 w-6 h-6 cursor-pointer z-20"
                    style={{ left: `calc(${(mileageRange[0] / 200000) * 100}% - 12px)` }}
                    onMouseDown={handleMouseDown('min')}
                  >
                    <Image src="/images/scrollhead.svg" alt="Min" width={24} height={24} className="no-drag" draggable="false" />
                  </div>
                  <div 
                    className="absolute top-[4px] -translate-y-1/2 w-6 h-6 cursor-pointer z-20"
                    style={{ left: `calc(${(mileageRange[1] / 200000) * 100}% - 12px)` }}
                    onMouseDown={handleMouseDown('max')}
                  >
                    <Image src="/images/scrollhead.svg" alt="Max" width={24} height={24} className="no-drag" draggable="false" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative -mx-4 px-4 pt-4 mt-4 border-t border-gray-200">
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
              </div>
            )}
          </div>
          <button className="flex justify-self-end text-sm text-blue-600">+ Show More</button>
        </div>
      )}
    </div>
  )
}
