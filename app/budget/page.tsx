import { Navigation } from "@/components/navigation"
import { BudgetDashboard } from "@/components/budget-dashboard"

export default function BudgetPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Budget Tracker</h1>
            <p className="text-lg text-muted-foreground">
              Monitor your travel expenses and stay within budget with smart insights and recommendations
            </p>
          </div>
          <BudgetDashboard />
        </div>
      </main>
    </div>
  )
}
