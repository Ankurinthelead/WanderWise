"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocalGemCard } from "@/components/local-gem-card"
import { PopularVsLocalComparison } from "@/components/popular-vs-local-comparison"
import { InteractiveMap } from "@/components/interactive-map"
import { Search, Filter, MapPin, Users, Compass } from "lucide-react"

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

export function LocalRecommendationsEngine() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCost, setSelectedCost] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")

  const localGems: LocalGem[] = [
    {
      id: "1",
      name: "Mawphlang Sacred Forest",
      location: "Mawphlang Village",
      state: "Meghalaya",
      category: "Nature & Spirituality",
      rating: 4.8,
      reviews: 127,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/0b/94/c9/sacred-forest.jpg?w=1200&h=-1&s=1",
      description: "Ancient sacred grove protected by Khasi traditions for over 800 years",
      highlights: ["Sacred Khasi rituals", "Rare medicinal plants", "Ancient trees", "Local guide stories"],
      localTip:
        "Visit with a local Khasi guide to understand the spiritual significance and traditional conservation practices",
      nearbyPopular: "Alternative to crowded Elephant Falls - more meaningful cultural experience",
      difficulty: "Easy",
      cost: "Low",
      bestTime: "October to March",
      localGuide: true,
      communitySupported: true,
    },
    {
      id: "2",
      name: "Kongthong Whistling Village",
      location: "Kongthong Village",
      state: "Meghalaya",
      category: "Culture & Heritage",
      rating: 4.9,
      reviews: 89,
      image: "/clean-village-mawlynnong-meghalaya-with-bamboo-hou.jpg",
      description: "Unique village where people communicate through melodic whistles instead of names",
      highlights: ["Whistling language", "Traditional Khasi culture", "Homestay experience", "Musical traditions"],
      localTip: "Stay overnight in a homestay to fully experience the whistling culture and learn basic tunes",
      nearbyPopular: "More authentic than Shillong's commercial attractions",
      difficulty: "Moderate",
      cost: "Medium",
      bestTime: "November to February",
      localGuide: true,
      communitySupported: true,
    },
    {
      id: "3",
      name: "Shnongpdeng River Camp",
      location: "Shnongpdeng Village",
      state: "Meghalaya",
      category: "Adventure & Nature",
      rating: 4.7,
      reviews: 156,
      image: "/crystal-clear-dawki-river-meghalaya-with-boats.jpg",
      description: "Crystal clear river with natural pools, kayaking, and riverside camping",
      highlights: ["River kayaking", "Natural swimming pools", "Riverside camping", "Local fishing"],
      localTip: "Book camping with local families for authentic meals and river stories",
      nearbyPopular: "Less crowded alternative to Dawki with better camping facilities",
      difficulty: "Moderate",
      cost: "Medium",
      bestTime: "October to April",
      localGuide: false,
      communitySupported: true,
    },
    {
      id: "4",
      name: "Riwai Living Root Bridge",
      location: "Riwai Village",
      state: "Meghalaya",
      category: "Nature & Adventure",
      rating: 4.6,
      reviews: 94,
      image: "/double-decker-living-root-bridge-nongriat.jpg",
      description: "Lesser-known living root bridge with fewer crowds and pristine surroundings",
      highlights: ["Living root bridge", "Village trek", "Local crafts", "Traditional architecture"],
      localTip: "Combine with village walk to see traditional Khasi houses and local crafts",
      nearbyPopular: "Quieter alternative to Nongriat's double-decker bridge",
      difficulty: "Challenging",
      cost: "Low",
      bestTime: "November to March",
      localGuide: true,
      communitySupported: true,
    },
    {
      id: "5",
      name: "Mawsynram Living Culture",
      location: "Mawsynram Village",
      state: "Meghalaya",
      category: "Culture & Nature",
      rating: 4.5,
      reviews: 73,
      image: "/clean-village-with-bamboo-houses.jpg",
      description: "Experience life in the wettest place on Earth with unique rain culture",
      highlights: ["Rain harvesting", "Traditional knup (rain shields)", "Monsoon culture", "Local cuisine"],
      localTip: "Visit during monsoon to experience the unique rain culture and traditional adaptations",
      nearbyPopular: "More authentic than Cherrapunji's tourist spots",
      difficulty: "Easy",
      cost: "Low",
      bestTime: "June to September (monsoon)",
      localGuide: true,
      communitySupported: true,
    },
    {
      id: "6",
      name: "Nohkalikai Falls Base",
      location: "Laitkynsew Village",
      state: "Meghalaya",
      category: "Adventure & Nature",
      rating: 4.8,
      reviews: 112,
      image: "/krang-suri-waterfall-blue-pool-meghalaya.jpg",
      description: "Trek to the base of India's tallest plunge waterfall through local villages",
      highlights: ["Waterfall base trek", "Village interactions", "Local legends", "Photography spots"],
      localTip: "Hire local guides from Laitkynsew village for safe trekking and cultural stories",
      nearbyPopular: "Adventure alternative to just viewing from the top viewpoint",
      difficulty: "Challenging",
      cost: "Medium",
      bestTime: "October to February",
      localGuide: true,
      communitySupported: true,
    },
    {
      id: "7",
      name: "Shillong City Heritage Walk",
      location: "Shillong City",
      state: "Meghalaya",
      category: "Culture & Heritage",
      rating: 4.4,
      reviews: 203,
      image: "/beautiful-landscape-of-meghalaya-with-waterfalls-a.jpg",
      description:
        "Explore Shillong's colonial heritage, local markets, and traditional Khasi culture with community guides",
      highlights: ["Colonial architecture", "Bara Bazaar experience", "Traditional music venues", "Local food trails"],
      localTip: "Join evening walks to experience Shillong's vibrant music scene and street food culture",
      nearbyPopular: "More authentic than standard tourist spots - includes local neighborhoods and hidden cafes",
      difficulty: "Easy",
      cost: "Low",
      bestTime: "October to March",
      localGuide: true,
      communitySupported: true,
    },
  ]

  const states = ["All States", "Meghalaya", "Kerala", "Rajasthan", "Himachal Pradesh", "Karnataka"]
  const categories = [
    "All Categories",
    "Nature & Adventure",
    "Culture & Heritage",
    "Nature & Spirituality",
    "Adventure & Nature",
    "Culture & Nature",
  ]
  const costs = ["All Costs", "Free", "Low", "Medium", "High"]

  const filteredGems = localGems.filter((gem) => {
    const matchesSearch =
      gem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gem.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gem.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesState = !selectedState || selectedState === "All States" || gem.state === selectedState
    const matchesCategory =
      !selectedCategory || selectedCategory === "All Categories" || gem.category === selectedCategory
    const matchesCost = !selectedCost || selectedCost === "All Costs" || gem.cost === selectedCost

    return matchesSearch && matchesState && matchesCategory && matchesCost
  })

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search destinations, activities, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCost} onValueChange={setSelectedCost}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Cost" />
                </SelectTrigger>
                <SelectContent>
                  {costs.map((cost) => (
                    <SelectItem key={cost} value={cost}>
                      {cost}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Filter className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("map")}
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchQuery && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchQuery("")}>
                Search: {searchQuery} ×
              </Badge>
            )}
            {selectedState && selectedState !== "All States" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedState("")}>
                {selectedState} ×
              </Badge>
            )}
            {selectedCategory && selectedCategory !== "All Categories" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory("")}>
                {selectedCategory} ×
              </Badge>
            )}
            {selectedCost && selectedCost !== "All Costs" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCost("")}>
                {selectedCost} ×
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">{filteredGems.length} Hidden Gems Found</h2>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Users className="h-3 w-3 mr-1" />
            Community Supported
          </Badge>
        </div>
        <Button variant="outline" size="sm">
          <Compass className="h-4 w-4 mr-2" />
          Suggest New Gem
        </Button>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="gems" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gems">Local Gems</TabsTrigger>
          <TabsTrigger value="comparison">Popular vs Local</TabsTrigger>
          <TabsTrigger value="map">Interactive Map</TabsTrigger>
        </TabsList>

        <TabsContent value="gems" className="space-y-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGems.map((gem) => (
                <LocalGemCard key={gem.id} gem={gem} />
              ))}
            </div>
          ) : (
            <div className="h-[600px] bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Interactive map view coming soon...</p>
            </div>
          )}

          {filteredGems.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No gems found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms to discover more hidden treasures
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedState("")
                    setSelectedCategory("")
                    setSelectedCost("")
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <PopularVsLocalComparison />
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <InteractiveMap gems={filteredGems} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
