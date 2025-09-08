import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Star } from "lucide-react"

export function DestinationsShowcase() {
  const destinations = [
    {
      name: "Mawlynnong Village",
      location: "Meghalaya",
      type: "Hidden Gem",
      rating: 4.8,
      duration: "2-3 days",
      image: "/clean-village-mawlynnong-meghalaya-with-bamboo-hou.jpg",
      description: "Asia's cleanest village with living root bridges and stunning views",
      nearbyPopular: "Near Cherrapunji",
    },
    {
      name: "Dawki River",
      location: "Meghalaya",
      type: "Local Favorite",
      rating: 4.9,
      duration: "1 day",
      image: "/crystal-clear-dawki-river-meghalaya-with-boats.jpg",
      description: "Crystal clear waters where boats appear to float on air",
      nearbyPopular: "Alternative to crowded Umngot",
    },
    {
      name: "Nongriat Village",
      location: "Meghalaya",
      type: "Adventure",
      rating: 4.7,
      duration: "2 days",
      image: "/double-decker-living-root-bridge-nongriat.jpg",
      description: "Home to the famous double-decker living root bridge",
      nearbyPopular: "Less crowded than Elephant Falls",
    },
    {
      name: "Krang Suri Falls",
      location: "Meghalaya",
      type: "Hidden Gem",
      rating: 4.6,
      duration: "Half day",
      image: "/krang-suri-waterfall-blue-pool-meghalaya.jpg",
      description: "Turquoise blue pools perfect for swimming and relaxation",
      nearbyPopular: "Quieter alternative to Elephant Falls",
    },
  ]

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Meghalaya's Hidden Treasures</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond the popular spots lie incredible destinations waiting to be explored. Support local communities while
            experiencing authentic beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {destinations.map((destination, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-foreground">
                    {destination.type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{destination.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold">{destination.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {destination.duration}
                  </div>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  {destination.location}
                </div>

                <p className="text-muted-foreground mb-3">{destination.description}</p>

                <div className="bg-muted/50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Local Tip:</span> {destination.nearbyPopular}
                  </p>
                </div>

                <Button className="w-full">Add to Itinerary</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            Explore More Hidden Gems
          </Button>
        </div>
      </div>
    </section>
  )
}
