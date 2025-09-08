import { DashboardOverview } from "@/components/dashboard-overview"
import { TripSummary } from "@/components/trip-summary"
import { BudgetSummary } from "@/components/budget-summary"
import { SafetySummary } from "@/components/safety-summary"
import { RecentRecommendations } from "@/components/recent-recommendations"
import { QuickActions } from "@/components/quick-actions"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, Traveler!</h1>
          <p className="text-xl text-gray-600">Your personalized travel command center</p>
        </div>

        <div className="grid gap-8">
          {/* Overview Cards */}
          <DashboardOverview />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Trip & Budget */}
            <div className="lg:col-span-2 space-y-8">
              <TripSummary />
              <BudgetSummary />
            </div>

            {/* Right Column - Safety & Actions */}
            <div className="space-y-8">
              <SafetySummary />
              <QuickActions />
            </div>
          </div>

          {/* Recent Recommendations */}
          <RecentRecommendations />
        </div>
      </div>
    </div>
  )
}
