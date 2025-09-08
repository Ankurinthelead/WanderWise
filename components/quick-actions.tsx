"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, DollarSign, Shield, Compass, Phone } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      icon: Calendar,
      label: "Plan Trip",
      description: "Create new itinerary",
      href: "/plan",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: Compass,
      label: "Discover",
      description: "Find hidden gems",
      href: "/discover",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: DollarSign,
      label: "Add Expense",
      description: "Track spending",
      href: "/budget",
      color: "bg-amber-500 hover:bg-amber-600",
    },
    {
      icon: Shield,
      label: "Safety Check",
      description: "Update status",
      href: "/safety",
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      icon: MapPin,
      label: "Share Location",
      description: "Send to contacts",
      href: "/safety",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      icon: Phone,
      label: "Emergency",
      description: "Quick access",
      href: "/safety",
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                variant="outline"
                className={`h-20 flex flex-col items-center justify-center p-3 ${action.color} text-white border-0 hover:scale-105 transition-transform`}
                onClick={() => (window.location.href = action.href)}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-xs font-medium">{action.label}</span>
                <span className="text-xs opacity-90">{action.description}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
