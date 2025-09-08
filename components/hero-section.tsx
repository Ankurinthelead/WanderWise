import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Shield, Compass } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/beautiful-landscape-of-meghalaya-with-waterfalls-a.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Discover India's Hidden Gems</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-pretty">
          Plan personalized trips, discover local treasures, and explore beyond the crowds. From Meghalaya's secret
          waterfalls to heritage sites across India.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="text-lg px-8 bg-primary text-primary-foreground hover:bg-primary/90">
            Start Planning
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 bg-white border-white text-gray-900 hover:bg-gray-100"
          >
            Explore Destinations
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: Calendar, title: "Smart Planning", desc: "AI-powered itineraries" },
            { icon: MapPin, title: "Local Gems", desc: "Hidden destinations" },
            { icon: Shield, title: "Safe Travel", desc: "Emergency support" },
            { icon: Compass, title: "Cultural Tours", desc: "Heritage experiences" },
          ].map((feature, index) => (
            <Card key={index} className="bg-black/60 border-white/30 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <feature.icon className="h-8 w-8 mx-auto mb-2 text-amber-400" />
                <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-200">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
