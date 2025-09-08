"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

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

interface BudgetAnalyticsProps {
  budgetData: BudgetData
}

export function BudgetAnalytics({ budgetData }: BudgetAnalyticsProps) {
  const categoryData = Object.entries(budgetData.categories).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    budget: value.budget,
    spent: value.spent,
    remaining: value.budget - value.spent,
    percentage: (value.spent / value.budget) * 100,
  }))

  const pieData = categoryData.map((item) => ({
    name: item.name,
    value: item.spent,
  }))

  const dailySpending = [
    { day: "Day 1", amount: 8500 },
    { day: "Day 2", amount: 12000 },
    { day: "Day 3", amount: 6500 },
    { day: "Day 4", amount: 9200 },
    { day: "Day 5", amount: 5800 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: ₹{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Budget vs Spent Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Budget vs Actual Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="budget" fill="#e2e8f0" name="Budget" />
              <Bar dataKey="spent" fill="#0ea5e9" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Spending Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Spending Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [`₹${value.toLocaleString()}`, "Amount"]} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Daily Spending Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Spending Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailySpending}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="amount" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      ₹{category.spent.toLocaleString()} / ₹{category.budget.toLocaleString()}
                    </span>
                    <Badge
                      variant={
                        category.percentage < 50 ? "default" : category.percentage < 80 ? "secondary" : "destructive"
                      }
                    >
                      {category.percentage.toFixed(0)}%
                    </Badge>
                  </div>
                </div>
                <Progress value={category.percentage} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {category.percentage < 50 ? "Under budget" : category.percentage < 80 ? "On track" : "Over budget"}
                  </span>
                  <span>₹{category.remaining.toLocaleString()} remaining</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
