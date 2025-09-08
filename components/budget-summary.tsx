"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"

export function BudgetSummary() {
  const budgetData = {
    totalBudget: 45000,
    totalSpent: 32500,
    remaining: 12500,
    categories: [
      { name: "Accommodation", budgeted: 15000, spent: 12000, color: "bg-blue-500" },
      { name: "Transportation", budgeted: 10000, spent: 8500, color: "bg-green-500" },
      { name: "Food & Dining", budgeted: 8000, spent: 6000, color: "bg-yellow-500" },
      { name: "Activities", budgeted: 7000, spent: 4000, color: "bg-purple-500" },
      { name: "Shopping", budgeted: 5000, spent: 2000, color: "bg-pink-500" },
    ],
  }

  const spentPercentage = (budgetData.totalSpent / budgetData.totalBudget) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          Budget Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall Budget */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Total Budget</h3>
              <Badge variant={spentPercentage > 80 ? "destructive" : "default"}>
                {spentPercentage.toFixed(0)}% used
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-lg font-bold">₹{budgetData.totalBudget.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Spent</p>
                <p className="text-lg font-bold text-red-600">₹{budgetData.totalSpent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-lg font-bold text-green-600">₹{budgetData.remaining.toLocaleString()}</p>
              </div>
            </div>
            <Progress value={spentPercentage} className="h-3" />
          </div>

          {/* Category Breakdown */}
          <div>
            <h4 className="font-medium mb-4">Spending by Category</h4>
            <div className="space-y-3">
              {budgetData.categories.map((category, index) => {
                const categoryPercentage = (category.spent / category.budgeted) * 100
                const isOverBudget = category.spent > category.budgeted

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                        <span className="text-sm font-medium">{category.name}</span>
                        {isOverBudget && <AlertCircle className="h-4 w-4 text-red-500" />}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">₹{category.spent.toLocaleString()}</span>
                        <span className="text-gray-500"> / ₹{category.budgeted.toLocaleString()}</span>
                      </div>
                    </div>
                    <Progress value={Math.min(categoryPercentage, 100)} className="h-2" />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm font-medium">Savings</span>
              </div>
              <p className="text-lg font-bold">₹8,500</p>
              <p className="text-xs text-gray-500">vs planned</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Daily Avg</span>
              </div>
              <p className="text-lg font-bold">₹2,150</p>
              <p className="text-xs text-gray-500">last 15 days</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
