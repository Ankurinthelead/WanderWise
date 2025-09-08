import { Navigation } from "@/components/navigation"
import { LocalRecommendationsEngine } from "@/components/local-recommendations-engine"

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Hidden Gems</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore local treasures and authentic experiences beyond the tourist crowds. Support local communities
              while discovering India's best-kept secrets.
            </p>
          </div>
          <LocalRecommendationsEngine />
        </div>
      </main>
    </div>
  )
}
