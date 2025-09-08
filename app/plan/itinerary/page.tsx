import { Navigation } from "@/components/navigation"
import { ItineraryBuilder } from "@/components/itinerary-builder"

export default function ItineraryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ItineraryBuilder />
        </div>
      </main>
    </div>
  )
}
