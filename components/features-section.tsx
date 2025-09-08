import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, MapPin, Shield, Users, Star } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Personalized Itinerary Planning",
      description:
        "Create day-wise travel plans tailored to your preferences for culture, heritage, and budget. Auto-updates based on real-time conditions.",
      image: "/travel-itinerary-planning-interface.jpg",
    },
    {
      icon: DollarSign,
      title: "Smart Budget Tracker",
      description:
        "Track expenses, set budgets, and get cost-effective recommendations. Never overspend on your adventures.",
      image: "/budget-tracking-dashboard.jpg",
    },
    {
      icon: MapPin,
      title: "Local Gems Discovery",
      description:
        "Find hidden treasures near popular destinations. Discover less crowded, equally beautiful places that locals love.",
      image: "/hidden-waterfall-in-meghalaya.jpg",
    },
    {
      icon: Shield,
      title: "Safety & Emergency Support",
      description:
        "24/7 emergency assistance, safety alerts, and local emergency contacts. Travel with confidence and peace of mind.",
      image: "/emergency-support-interface.jpg",
    },
    {
      icon: Users,
      title: "Community Insights",
      description:
        "Connect with fellow travelers, share experiences, and get recommendations from locals and verified travelers.",
      image: "/travel-community-sharing.jpg",
    },
    {
      icon: Star,
      title: "Cultural Heritage Focus",
      description:
        "Specialized tours and information about India's rich cultural heritage, traditional crafts, and local customs.",
      image: "/indian-cultural-heritage-site.jpg",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for Perfect Travel</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From planning to exploring, we've got you covered with smart tools and local insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
