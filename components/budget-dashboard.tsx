"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BudgetOverview } from "@/components/budget-overview"
import { ExpenseTracker } from "@/components/expense-tracker"
import { BudgetAnalytics } from "@/components/budget-analytics"
import { BudgetPlanner } from "@/components/budget-planner"
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

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

export function BudgetDashboard() {
  const [budgetData] = useState<BudgetData>({
    totalBudget: 75000,
    totalSpent: 42500,
    categories: {
      accommodation: { budget: 25000, spent: 18000 },
      transport: { budget: 15000, spent: 12000 },
      food: { budget: 12000, spent: 8500 },
      activities: { budget: 18000, spent: 3500 },
      shopping: { budget: 3000, spent: 500 },
      miscellaneous: { budget: 2000, spent: 0 },
    },
  })

  const spentPercentage = (budgetData.totalSpent / budgetData.totalBudget) * 100
  const remainingBudget = budgetData.totalBudget - budgetData.totalSpent

  const getBudgetStatus = () => {
    if (spentPercentage < 50) return { status: "good", color: "text-green-600", icon: CheckCircle }
    if (spentPercentage < 80) return { status: "warning", color: "text-yellow-600", icon: AlertTriangle }
    return { status: "danger", color: "text-red-600", icon: AlertTriangle }
  }

  const budgetStatus = getBudgetStatus()
  const StatusIcon = budgetStatus.icon

  return (
    <div className="space-y-6">
      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{budgetData.totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">For entire trip</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{budgetData.totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{spentPercentage.toFixed(1)}% of budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <StatusIcon className={`h-4 w-4 ${budgetStatus.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{remainingBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((remainingBudget / budgetData.totalBudget) * 100).toFixed(1)}% left
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
            <Badge
              variant={
                budgetStatus.status === "good"
                  ? "default"
                  : budgetStatus.status === "warning"
                    ? "secondary"
                    : "destructive"
              }
            >
              {budgetStatus.status === "good"
                ? "On Track"
                : budgetStatus.status === "warning"
                  ? "Watch Spending"
                  : "Over Budget"}
            </Badge>
          </CardHeader>
          <CardContent>
            <Progress value={spentPercentage} className="w-full" />
            <p className="text-xs text-muted-foreground mt-2">
              {spentPercentage < 80 ? "You're doing great!" : "Consider reducing expenses"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Track Expenses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="planner">Budget Planner</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <BudgetOverview budgetData={budgetData} />
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <ExpenseTracker />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <BudgetAnalytics budgetData={budgetData} />
        </TabsContent>

        <TabsContent value="planner" className="space-y-4">
          <BudgetPlanner />
        </TabsContent>
      </Tabs>
    </div>
  )
}
