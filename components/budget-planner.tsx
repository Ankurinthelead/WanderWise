"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calculator, PiggyBank, TrendingUp, AlertCircle } from "lucide-react"

export function BudgetPlanner() {
  const [totalBudget, setTotalBudget] = useState([75000])
  const [tripDuration, setTripDuration] = useState(7)
  const [travelers, setTravelers] = useState(2)
  const [travelStyle, setTravelStyle] = useState("")

  const budgetBreakdown = {
    accommodation: 35,
    transport: 20,
    food: 20,
    activities: 20,
    miscellaneous: 5,
  }

  const calculateCategoryBudget = (percentage: number) => {
    return Math.round((totalBudget[0] * percentage) / 100)
  }

  const dailyBudget = Math.round(totalBudget[0] / tripDuration)
  const perPersonBudget = Math.round(totalBudget[0] / travelers)

  const travelStyleMultipliers = {
    luxury: { multiplier: 1.5, description: "Premium accommodations and experiences" },
    "mid-range": { multiplier: 1.0, description: "Comfortable balance of cost and quality" },
    budget: { multiplier: 0.7, description: "Cost-effective options without compromising experience" },
    backpacker: { multiplier: 0.5, description: "Minimal cost, maximum adventure" },
  }

  const getRecommendations = () => {
    const recommendations = []

    if (dailyBudget > 15000) {
      recommendations.push({
        type: "luxury",
        message: "Consider luxury homestays and private tours for a premium experience",
      })
    } else if (dailyBudget > 8000) {
      recommendations.push({
        type: "comfort",
        message: "Perfect budget for comfortable mid-range accommodations and guided tours",
      })
    } else if (dailyBudget > 4000) {
      recommendations.push({
        type: "budget",
        message: "Great for budget-friendly options with local experiences",
      })
    } else {
      recommendations.push({
        type: "backpacker",
        message: "Focus on hostels, local transport, and free attractions",
      })
    }

    return recommendations
  }

  return (
    <div className="space-y-6">
      {/* Budget Planning Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-primary" />
            <span>Plan Your Budget</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-base font-medium mb-4 block">
                Total Budget: ₹{totalBudget[0].toLocaleString()}
              </Label>
              <Slider
                value={totalBudget}
                onValueChange={setTotalBudget}
                max={200000}
                min={20000}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>₹20,000</span>
                <span>₹2,00,000</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="duration">Trip Duration (days)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={tripDuration}
                  onChange={(e) => setTripDuration(Number.parseInt(e.target.value) || 1)}
                  min="1"
                  max="30"
                />
              </div>

              <div>
                <Label htmlFor="travelers">Number of Travelers</Label>
                <Input
                  id="travelers"
                  type="number"
                  value={travelers}
                  onChange={(e) => setTravelers(Number.parseInt(e.target.value) || 1)}
                  min="1"
                  max="10"
                />
              </div>

              <div>
                <Label htmlFor="travel-style">Travel Style</Label>
                <Select value={travelStyle} onValueChange={setTravelStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your travel style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="mid-range">Mid-range</SelectItem>
                    <SelectItem value="budget">Budget</SelectItem>
                    <SelectItem value="backpacker">Backpacker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PiggyBank className="h-5 w-5 text-primary" />
              <span>Budget Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(budgetBreakdown).map(([category, percentage]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span className="capitalize font-medium">{category}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{calculateCategoryBudget(percentage).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{percentage}%</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Budget Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Daily Budget</p>
                <p className="text-lg font-bold">₹{dailyBudget.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Per Person</p>
                <p className="text-lg font-bold">₹{perPersonBudget.toLocaleString()}</p>
              </div>
            </div>

            {travelStyle && (
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline">{travelStyle.charAt(0).toUpperCase() + travelStyle.slice(1)}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {travelStyleMultipliers[travelStyle as keyof typeof travelStyleMultipliers]?.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            <span>Budget Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getRecommendations().map((rec, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium capitalize mb-2">{rec.type} Travel Style</p>
                <p className="text-sm text-muted-foreground">{rec.message}</p>
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">Money-Saving Tips</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Book accommodations in advance</li>
                  <li>• Use local transport instead of taxis</li>
                  <li>• Eat at local restaurants</li>
                  <li>• Look for group discounts on activities</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Local Experiences</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Stay in homestays for authentic culture</li>
                  <li>• Join community-based tourism</li>
                  <li>• Visit local markets and festivals</li>
                  <li>• Hire local guides for hidden gems</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
