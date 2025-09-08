"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Layers, Filter } from "lucide-react"

interface LocalGem {
  id: string
  name: string
  location: string
  state: string
  category: string
  rating: number
  reviews: number
  image: string
  description: string
  highlights: string[]
  localTip: string
  nearbyPopular: string
  difficulty: "Easy" | "Moderate" | "Challenging"
  cost: "Free" | "Low" | "Medium" | "High"
  bestTime: string
  localGuide: boolean
  communitySupported: boolean
}

interface InteractiveMapProps {
  gems: LocalGem[]
}

export function InteractiveMap({ gems }: InteractiveMapProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Controls */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Layers className="h-5 w-5 text-primary" />
              <span>Map Layers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Hidden Gems</span>
                <Badge className="bg-green-100 text-green-800">{gems.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Popular Spots</span>
                <Badge className="bg-blue-100 text-blue-800">12</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Local Guides</span>
                <Badge className="bg-purple-100 text-purple-800">8</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Homestays</span>
                <Badge className="bg-orange-100 text-orange-800">15</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filter by Category
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Map Placeholder */}
        <Card className="lg:col-span-3">
          <CardContent className="p-0">
            <div className="h-[500px] bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Map Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Sample Map Pins */}
              <div className="relative w-full h-full">
                {/* Meghalaya Region */}
                <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-green-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg p-2 min-w-[150px] opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-xs font-medium">Mawlynnong Village</p>
                    <p className="text-xs text-muted-foreground">Cleanest Village in Asia</p>
                  </div>
                </div>

                <div className="absolute top-1/3 left-2/5 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <MapPin className="h-4 w-4" />
                  </div>
                </div>

                <div className="absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-purple-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <MapPin className="h-4 w-4" />
                  </div>
                </div>

                <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-orange-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <MapPin className="h-4 w-4" />
                  </div>
                </div>

                {/* Center Message */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Explore {gems.length} hidden gems across Meghalaya
                    </p>
                    <Button size="sm">Enable Full Map</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Map Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <span className="text-sm">Hidden Gems</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <span className="text-sm">Popular Attractions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
              <span className="text-sm">Local Guides</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
              <span className="text-sm">Homestays</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
