"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, ArrowRight, Compass } from "lucide-react"

export function RecentRecommendations() {
  const recommendations = [
    {
      id: "1",
      name: "Mawphlang Sacred Forest",
      type: "Nature & Culture",
      rating: 4.8,
      distance: "25 km from Shillong",
      description: "Ancient sacred grove with 700-year-old trees and Khasi traditions",
      image: "/sacred-forest-mawphlang-meghalaya-ancient-trees.jpg",
      isNew: true,
    },
    {
      id: "2",
      name: "Krang Suri Falls",
      type: "Hidden Waterfall",
      rating: 4.9,
      distance: "120 km from Shillong",
      description: "Pristine blue-green pools perfect for swimming and photography",
      image: "/hidden-waterfall-in-meghalaya.jpg",
      isNew: true,
    },
    {
      id: "3",
      name: "Mawlynnong Village",
      type: "Cultural Heritage",
      rating: 4.7,
      distance: "90 km from Shillong",
      description: "Asia's cleanest village with living root bridges and tree houses",
      image: "/clean-village-with-bamboo-houses.jpg",
      isNew: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-green-600" />
            Recent Discoveries
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          {recommendations.map((place) => (
            <div key={place.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                  src={place.image || "/placeholder.svg"}
                  alt={place.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {place.isNew && <Badge className="absolute top-2 left-2 bg-green-600">New</Badge>}
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {place.rating}
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{place.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {place.distance}
                  </p>
                </div>

                <Badge variant="secondary" className="text-xs">
                  {place.type}
                </Badge>

                <p className="text-sm text-gray-700 line-clamp-2">{place.description}</p>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between group-hover:bg-primary group-hover:text-white transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
