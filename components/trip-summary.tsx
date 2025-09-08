"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react"

export function TripSummary() {
  const currentTrips = [
    {
      id: "1",
      title: "Meghalaya Adventure",
      destination: "Shillong, Cherrapunji",
      startDate: "2024-12-15",
      endDate: "2024-12-22",
      status: "upcoming",
      progress: 75,
      companions: 3,
      daysLeft: 12,
    },
    {
      id: "2",
      title: "Heritage Trail",
      destination: "Mawlynnong, Dawki",
      startDate: "2025-01-10",
      endDate: "2025-01-15",
      status: "planning",
      progress: 45,
      companions: 2,
      daysLeft: 45,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-green-500"
      case "planning":
        return "bg-blue-500"
      case "active":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Your Trips
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentTrips.map((trip) => (
            <div key={trip.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{trip.title}</h3>
                  <p className="text-gray-600 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {trip.destination}
                  </p>
                </div>
                <Badge className={getStatusColor(trip.status)}>{trip.status}</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{new Date(trip.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{trip.companions + 1} travelers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{trip.daysLeft} days left</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Progress:</span>
                  <span className="font-medium">{trip.progress}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Planning Progress</span>
                  <span>{trip.progress}%</span>
                </div>
                <Progress value={trip.progress} className="h-2" />
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">
                  <span>Continue Planning</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full border-dashed bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Plan New Trip
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
