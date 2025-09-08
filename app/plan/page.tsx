import { Navigation } from "@/components/navigation"
import { TripPlanningWizard } from "@/components/trip-planning-wizard"

export default function PlanTripPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container px-4 py-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Plan Your Perfect Trip</h1>
            <p className="text-lg text-muted-foreground">
              Tell us your preferences and we'll create a personalized itinerary with hidden gems and local experiences
            </p>
          </div>
          <TripPlanningWizard />
        </div>
      </main>
    </div>
  )
}
