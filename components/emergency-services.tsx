"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Clock } from "lucide-react"

interface EmergencyService {
  name: string
  number: string
  type: "police" | "medical" | "fire" | "tourist" | "embassy"
  available: string
  location?: string
}

export function EmergencyServices() {
  const emergencyServices: EmergencyService[] = [
    {
      name: "Police Emergency",
      number: "100",
      type: "police",
      available: "24/7",
    },
    {
      name: "Medical Emergency",
      number: "108",
      type: "medical",
      available: "24/7",
    },
    {
      name: "Fire Emergency",
      number: "101",
      type: "fire",
      available: "24/7",
    },
    {
      name: "Tourist Helpline",
      number: "1363",
      type: "tourist",
      available: "24/7",
    },
    {
      name: "Meghalaya Police Control Room",
      number: "0364-2222207",
      type: "police",
      available: "24/7",
      location: "Shillong",
    },
    {
      name: "Civil Hospital Shillong",
      number: "0364-2223988",
      type: "medical",
      available: "24/7",
      location: "Shillong",
    },
  ]

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "police":
        return "🚔"
      case "medical":
        return "🚑"
      case "fire":
        return "🚒"
      case "tourist":
        return "🏛️"
      case "embassy":
        return "🏢"
      default:
        return "📞"
    }
  }

  const getServiceColor = (type: string) => {
    switch (type) {
      case "police":
        return "bg-blue-500"
      case "medical":
        return "bg-red-500"
      case "fire":
        return "bg-orange-500"
      case "tourist":
        return "bg-green-500"
      case "embassy":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleCall = (number: string) => {
    window.open(`tel:${number}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-red-600" />
          Emergency Services
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Quick Emergency Numbers */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {emergencyServices.slice(0, 4).map((service, index) => (
              <Button
                key={index}
                onClick={() => handleCall(service.number)}
                className={`h-20 flex flex-col items-center justify-center ${getServiceColor(service.type)} hover:opacity-90`}
              >
                <span className="text-2xl mb-1">{getServiceIcon(service.type)}</span>
                <span className="text-xs font-medium">{service.name}</span>
                <span className="text-xs opacity-90">{service.number}</span>
              </Button>
            ))}
          </div>

          {/* Detailed Services List */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Local Emergency Services</h4>
            {emergencyServices.slice(4).map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{getServiceIcon(service.type)}</span>
                    <h5 className="font-medium">{service.name}</h5>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {service.number}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {service.available}
                    </span>
                    {service.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {service.location}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleCall(service.number)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Important Notice */}
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2">Emergency Guidelines</h4>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• Stay calm and speak clearly when calling emergency services</li>
              <li>• Provide your exact location and nature of emergency</li>
              <li>• Keep your phone charged and carry a power bank</li>
              <li>• Save important numbers in your phone contacts</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
