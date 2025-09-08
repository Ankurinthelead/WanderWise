"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Users, MapPin, TrendingUp, Heart } from "lucide-react"

interface Comparison {
  id: string
  popular: {
    name: string
    image: string
    rating: number
    reviews: number
    crowdLevel: "High" | "Medium" | "Low"
    cost: string
    description: string
  }
  local: {
    name: string
    image: string
    rating: number
    reviews: number
    crowdLevel: "High" | "Medium" | "Low"
    cost: string
    description: string
    localBenefit: string
  }
  category: string
  location: string
}

export function PopularVsLocalComparison() {
  const comparisons: Comparison[] = [
    {
      id: "1",
      category: "Waterfalls",
      location: "Meghalaya",
      popular: {
        name: "Elephant Falls",
        image: "https://www.emeghalaya.com/uploads/articles/2021/09/elephant-falls.jpg",
        rating: 4.2,
        reviews: 2847,
        crowdLevel: "High",
        cost: "₹50 entry",
        description: "Famous three-tiered waterfall with developed infrastructure and parking",
      },
      local: {
        name: "Krang Suri Falls",
        image: "/krang-suri-waterfall-blue-pool-meghalaya.jpg",
        rating: 4.6,
        reviews: 112,
        crowdLevel: "Low",
        cost: "Free",
        description: "Stunning turquoise pools perfect for swimming in pristine natural setting",
        localBenefit: "Support local village guides and enjoy peaceful swimming experience",
      },
    },
    {
      id: "2",
      category: "Living Root Bridges",
      location: "Meghalaya",
      popular: {
        name: "Double Decker Bridge, Nongriat",
        image: "/double-decker-living-root-bridge-nongriat.jpg",
        rating: 4.5,
        reviews: 1923,
        crowdLevel: "High",
        cost: "₹100 guide fee",
        description: "Famous double-decker living root bridge with challenging trek",
      },
      local: {
        name: "Riwai Living Root Bridge",
        image: "https://i0.wp.com/thelandofwanderlust.com/wp-content/uploads/2014/10/IMG_2023-11-10-201555.jpeg?fit=1080%2C720&ssl=1",
        rating: 4.6,
        reviews: 94,
        crowdLevel: "Low",
        cost: "₹50 village fee",
        description: "Equally beautiful single-tier bridge with authentic village experience",
        localBenefit: "Direct support to Riwai village community and traditional crafts",
      },
    },
    {
      id: "3",
      category: "Cultural Villages",
      location: "Meghalaya",
      popular: {
        name: "Shillong City Tour",
        image: "https://travenjo.com/wp-content/uploads/2019/11/Shillong-city-nightlife.jpg?x58748",
        rating: 4.0,
        reviews: 3456,
        crowdLevel: "High",
        cost: "₹500-1000",
        description: "Commercial city tour with markets, viewpoints, and tourist attractions",
      },
      local: {
        name: "Kongthong Whistling Village",
        image: "https://curlytales.com/wp-content/uploads/2021/07/72547413_2553531591403781_6092729341574349714_n-1.jpg",
        rating: 4.9,
        reviews: 89,
        crowdLevel: "Low",
        cost: "₹300 homestay",
        description: "Unique village where people communicate through melodic whistles",
        localBenefit: "Preserve traditional whistling culture and support village families",
      },
    },
  ]

  const getCrowdColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Popular vs Local Alternatives</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover authentic alternatives to crowded tourist spots. Support local communities while enjoying unique
          experiences with fewer crowds.
        </p>
      </div>

      <div className="space-y-8">
        {comparisons.map((comparison) => (
          <Card key={comparison.id} className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{comparison.category}</span>
                    <Badge variant="outline">{comparison.location}</Badge>
                  </CardTitle>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Local Alternative Available
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Popular Destination */}
                <div className="p-6 border-r border-border">
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground">Popular Choice</span>
                  </div>

                  <div className="space-y-4">
                    <img
                      src={comparison.popular.image || "/placeholder.svg"}
                      alt={comparison.popular.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />

                    <div>
                      <h3 className="font-semibold text-lg mb-2">{comparison.popular.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{comparison.popular.description}</p>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{comparison.popular.rating}</span>
                        <span className="text-muted-foreground">({comparison.popular.reviews})</span>
                      </div>
                      <Badge className={getCrowdColor(comparison.popular.crowdLevel)}>
                        {comparison.popular.crowdLevel} Crowds
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium">{comparison.popular.cost}</span>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Local Alternative */}
                <div className="p-6 bg-green-50/50">
                  <div className="flex items-center space-x-2 mb-4">
                    <Heart className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-700">Local Alternative</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Recommended</Badge>
                  </div>

                  <div className="space-y-4">
                    <img
                      src={comparison.local.image || "/placeholder.svg"}
                      alt={comparison.local.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />

                    <div>
                      <h3 className="font-semibold text-lg mb-2">{comparison.local.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{comparison.local.description}</p>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{comparison.local.rating}</span>
                        <span className="text-muted-foreground">({comparison.local.reviews})</span>
                      </div>
                      <Badge className={getCrowdColor(comparison.local.crowdLevel)}>
                        {comparison.local.crowdLevel} Crowds
                      </Badge>
                    </div>

                    <div className="bg-green-100 rounded-lg p-3 border border-green-200">
                      <p className="text-xs font-medium text-green-800 mb-1">Community Impact</p>
                      <p className="text-xs text-green-700">{comparison.local.localBenefit}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium text-green-700">{comparison.local.cost}</span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Choose Local
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-2">Why Choose Local Alternatives?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <Users className="h-6 w-6 text-primary mx-auto" />
              <p className="text-sm font-medium">Support Communities</p>
              <p className="text-xs text-muted-foreground">Direct economic benefit to local families and villages</p>
            </div>
            <div className="space-y-2">
              <Heart className="h-6 w-6 text-primary mx-auto" />
              <p className="text-sm font-medium">Authentic Experiences</p>
              <p className="text-xs text-muted-foreground">Genuine cultural interactions and traditional practices</p>
            </div>
            <div className="space-y-2">
              <MapPin className="h-6 w-6 text-primary mx-auto" />
              <p className="text-sm font-medium">Less Crowded</p>
              <p className="text-xs text-muted-foreground">Peaceful exploration without tourist crowds</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
