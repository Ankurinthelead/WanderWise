"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, Car, Utensils, Camera, ShoppingBag, MoreHorizontal, AlertTriangle, TrendingDown } from "lucide-react"

interface BudgetData {
  totalBudget: number
  totalSpent: number
  categories: {
    accommodation: { budget: number; spent: number }
    transport: { budget: number; spent: number }
    food: { budget: number; spent: number }
    activities: { budget: number; spent: number }
    shopping: { budget: number; spent: number }
    miscellaneous: { budget: number; spent: number }
  }
}

interface BudgetOverviewProps {
  budgetData: BudgetData
}

export function BudgetOverview({ budgetData }: BudgetOverviewProps) {
  const categories = [
    { key: "accommodation", name: "Accommodation", icon: Home, color: "bg-blue-100 text-blue-800" },
    { key: "transport", name: "Transport", icon: Car, color: "bg-purple-100 text-purple-800" },
    { key: "food", name: "Food & Dining", icon: Utensils, color: "bg-green-100 text-green-800" },
    { key: "activities", name: "Activities", icon: Camera, color: "bg-orange-100 text-orange-800" },
    { key: "shopping", name: "Shopping", icon: ShoppingBag, color: "bg-pink-100 text-pink-800" },
    { key: "miscellaneous", name: "Miscellaneous", icon: MoreHorizontal, color: "bg-gray-100 text-gray-800" },
  ]

  const getCategoryStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100
    if (percentage < 50) return "good"
    if (percentage < 80) return "warning"
    return "danger"
  }

  const recommendations = [
    {
      type: "warning",
      message: "You're spending more on transport than planned. Consider local buses or shared rides.",
      category: "Transport",
    },
    {
      type: "tip",
      message: "Great job on accommodation! You're under budget. Consider upgrading your next stay.",
      category: "Accommodation",
    },
    {
      type: "opportunity",
      message: "You have ₹14,500 left for activities. Check out these local experiences.",
      category: "Activities",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Category Breakdown */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categories.map((category) => {
              const categoryData = budgetData.categories[category.key as keyof typeof budgetData.categories]
              const percentage = (categoryData.spent / categoryData.budget) * 100
              const status = getCategoryStatus(categoryData.spent, categoryData.budget)
              const Icon = category.icon

              return (
                <div key={category.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ₹{categoryData.spent.toLocaleString()} of ₹{categoryData.budget.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={status === "good" ? "default" : status === "warning" ? "secondary" : "destructive"}>
                      {percentage.toFixed(0)}%
                    </Badge>
                  </div>
                  <Progress value={percentage} className="w-full" />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations & Alerts */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <span>Smart Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-l-4 ${
                  rec.type === "warning"
                    ? "border-l-yellow-500 bg-yellow-50"
                    : rec.type === "tip"
                      ? "border-l-green-500 bg-green-50"
                      : "border-l-blue-500 bg-blue-50"
                }`}
              >
                <div className="flex items-start space-x-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{rec.category}</p>
                    <p className="text-sm text-gray-600 mt-1">{rec.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-primary" />
              <span>Money Saving Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">Local Food Markets</p>
              <p className="text-xs text-muted-foreground">
                Save 40-60% by eating at local markets instead of tourist restaurants
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Group Activities</p>
              <p className="text-xs text-muted-foreground">
                Join group tours for activities to reduce per-person costs
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Off-Peak Travel</p>
              <p className="text-xs text-muted-foreground">
                Visit attractions early morning or late afternoon for better rates
              </p>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
              View All Tips
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
