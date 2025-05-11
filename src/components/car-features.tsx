import { Check } from "lucide-react"

export default function CarFeatures() {
  const features = {
    interior: ["Air Conditioner", "Digital Odometer", "Leather Seats", "Heater", "Tachometer"],
    exterior: ["Fog Light Front", "Rain Sensing Wiper", "Rear Spoiler", "Sun Roof"],
    safety: ["Brake Assist", "Child Safety Locks", "Traction Control", "Power Door Locks", "Driver Air Bag"],
    comfort: ["Power Steering", "Vanity Mirror", "Trunk Light"],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div>
        <h3 className="font-medium mb-4">Interior</h3>
        <ul className="space-y-3">
          {features.interior.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-medium mb-4">Exterior</h3>
        <ul className="space-y-3">
          {features.exterior.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-medium mb-4">Safety</h3>
        <ul className="space-y-3">
          {features.safety.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-medium mb-4">Comfort & Convenience</h3>
        <ul className="space-y-3">
          {features.comfort.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
