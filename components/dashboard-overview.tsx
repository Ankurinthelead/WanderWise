"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, DollarSign, Shield, TrendingUp, Users } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      title: "Active Trips",
      value: "2",
      subtitle: "Meghalaya Adventure",
      icon: MapPin,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Days Until Next Trip",
      value: "12",
      subtitle: "Cherrapunji Expedition",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Budget",
      value: "₹45,000",
      subtitle: "₹12,500 remaining",
      icon: DollarSign,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Safety Status",
      value: "Secure",
      subtitle: "All systems active",
      icon: Shield,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Places Discovered",
      value: "28",
      subtitle: "+5 this week",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Travel Companions",
      value: "4",
      subtitle: "Connected contacts",
      icon: Users,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs font-medium text-gray-600">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
