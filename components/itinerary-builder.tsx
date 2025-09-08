"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, MapPin, Camera, Utensils, Car, Plus, Edit, Trash2 } from "lucide-react"

interface Activity {
  id: string
  name: string
  type: "attraction" | "meal" | "transport" | "accommodation"
  duration: string
  cost: number
  description: string
  isLocal?: boolean
}

interface DayPlan {
  day: number
  date: string
  activities: Activity[]
  totalCost: number
}

export function ItineraryBuilder() {
  const [itinerary, setItinerary] = useState<DayPlan[]>([
    {
      day: 1,
      date: "March 15, 2024",
      activities: [
        {
          id: "1",
          name: "Arrival in Shillong",
          type: "transport",
          duration: "3 hours",
          cost: 2500,
          description: "Flight from Delhi to Shillong via Guwahati",
        },
        {
          id: "2",
          name: "Check-in at Homestay",
          type: "accommodation",
          duration: "1 hour",
          cost: 0,
          description: "Traditional Khasi homestay in Laitumkhrah",
        },
        {
          id: "3",
          name: "Local Market Visit",
          type: "attraction",
          duration: "2 hours",
          cost: 500,
          description: "Explore Bara Bazaar and try local street food",
          isLocal: true,
        },
        {
          id: "4",
          name: "Traditional Khasi Dinner",
          type: "meal",
          duration: "1.5 hours",
          cost: 800,
          description: "Authentic Khasi cuisine at local family restaurant",
          isLocal: true,
        },
      ],
      totalCost: 3800,
    },
    {
      day: 2,
      date: "March 16, 2024",
      activities: [
        {
          id: "5",
          name: "Mawlynnong Village",
          type: "attraction",
          duration: "6 hours",
          cost: 1200,
          description: "Visit Asia's cleanest village and living root bridges",
          isLocal: true,
        },
        {
          id: "6",
          name: "Village Lunch",
          type: "meal",
          duration: "1 hour",
          cost: 300,
          description: "Home-cooked meal with local family",
        },
        {
          id: "7",
          name: "Dawki River",
          type: "attraction",
          duration: "3 hours",
          cost: 600,
          description: "Crystal clear waters and boating experience",
          isLocal: true,
        },
      ],
      totalCost: 2100,
    },
  ])

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "attraction":
        return Camera
      case "meal":
        return Utensils
      case "transport":
        return Car
      case "accommodation":
        return MapPin
      default:
        return MapPin
    }
  }

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "attraction":
        return "bg-blue-100 text-blue-800"
      case "meal":
        return "bg-green-100 text-green-800"
      case "transport":
        return "bg-purple-100 text-purple-800"
      case "accommodation":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Personalized Itinerary</h2>
          <p className="text-muted-foreground">Meghalaya Adventure • 7 Days</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Budget</p>
          <p className="text-2xl font-bold text-primary">
            ₹{itinerary.reduce((sum, day) => sum + day.totalCost, 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {itinerary.map((day) => (
          <Card key={day.day} className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {day.day}
                  </span>
                  <span>Day {day.day}</span>
                  <span className="text-sm font-normal text-muted-foreground">• {day.date}</span>
                </CardTitle>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Day Budget</p>
                  <p className="font-semibold">₹{day.totalCost.toLocaleString()}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {day.activities.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type)
                  return (
                    <div key={activity.id}>
                      <div className="p-4 hover:bg-muted/30 transition-colors">
                        <div className="flex items-start space-x-4">
                          <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium">{activity.name}</h4>
                              {activity.isLocal && (
                                <Badge variant="secondary" className="text-xs">
                                  Local Gem
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{activity.duration}</span>
                              </div>
                              <span>₹{activity.cost.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      {index < day.activities.length - 1 && <Separator />}
                    </div>
                  )
                })}
                <div className="p-4 border-t border-dashed">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Activity
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Day
        </Button>
        <Button>Save Itinerary</Button>
        <Button variant="outline">Share</Button>
      </div>
    </div>
  )
}
