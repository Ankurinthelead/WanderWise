"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, DollarSign, Users, Compass, Heart, Plus } from "lucide-react"
import Image from "next/image"

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

interface LocalGemCardProps {
  gem: LocalGem
}

export function LocalGemCard({ gem }: LocalGemCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800"
      case "Challenging":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCostColor = (cost: string) => {
    switch (cost) {
      case "Free":
        return "bg-green-100 text-green-800"
      case "Low":
        return "bg-blue-100 text-blue-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
      <div className="relative">
        <Image
          src={gem.image || "/placeholder.svg"}
          alt={gem.name}
          width={400}
          height={192}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=192&width=400&text=" + encodeURIComponent(gem.name)
          }}
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {gem.communitySupported && (
            <Badge className="bg-green-600 hover:bg-green-700 text-white">
              <Users className="h-3 w-3 mr-1" />
              Community
            </Badge>
          )}
          {gem.localGuide && (
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
              <Compass className="h-3 w-3 mr-1" />
              Local Guide
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{gem.rating}</span>
          <span className="text-xs text-muted-foreground">({gem.reviews})</span>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div>
          <h3 className="font-semibold text-lg leading-tight mb-1">{gem.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            <span>
              {gem.location}, {gem.state}
            </span>
          </div>
        </div>

        {/* Category and Difficulty */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {gem.category}
          </Badge>
          <Badge className={`text-xs ${getDifficultyColor(gem.difficulty)}`}>{gem.difficulty}</Badge>
          <Badge className={`text-xs ${getCostColor(gem.cost)}`}>
            <DollarSign className="h-3 w-3 mr-1" />
            {gem.cost}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">{gem.description}</p>

        {/* Highlights */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {gem.highlights.slice(0, 3).map((highlight, index) => (
              <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                {highlight}
              </span>
            ))}
            {gem.highlights.length > 3 && (
              <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                +{gem.highlights.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Local Tip */}
        <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
          <p className="text-xs font-medium text-primary mb-1">Local Tip</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{gem.localTip}</p>
        </div>

        {/* Alternative Info */}
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-xs font-medium mb-1">Alternative to Popular Spots</p>
          <p className="text-xs text-muted-foreground">{gem.nearbyPopular}</p>
        </div>

        {/* Best Time */}
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>Best time: {gem.bestTime}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1">
            <Plus className="h-3 w-3 mr-1" />
            Add to Trip
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
