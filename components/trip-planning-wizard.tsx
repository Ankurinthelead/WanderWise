"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, MapPin, DollarSign, Heart, Camera, Mountain, Building } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface TripPreferences {
  destination: string
  startDate: Date | undefined
  endDate: Date | undefined
  travelers: number
  budget: number[]
  interests: string[]
  travelStyle: string
  accommodation: string
  specialRequests: string
}

export function TripPlanningWizard() {
  const [step, setStep] = useState(1)
  const [preferences, setPreferences] = useState<TripPreferences>({
    destination: "",
    startDate: undefined,
    endDate: undefined,
    travelers: 2,
    budget: [50000],
    interests: [],
    travelStyle: "",
    accommodation: "",
    specialRequests: "",
  })

  const interests = [
    { id: "culture", label: "Culture & Heritage", icon: Building },
    { id: "nature", label: "Nature & Wildlife", icon: Mountain },
    { id: "adventure", label: "Adventure Sports", icon: Mountain },
    { id: "photography", label: "Photography", icon: Camera },
    { id: "food", label: "Local Cuisine", icon: Heart },
    { id: "spiritual", label: "Spiritual Sites", icon: Building },
  ]

  const handleInterestToggle = (interestId: string) => {
    setPreferences((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }))
  }

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span>Where do you want to go?</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="destination">Destination</Label>
          <Select
            value={preferences.destination}
            onValueChange={(value) => setPreferences((prev) => ({ ...prev, destination: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="meghalaya">Meghalaya</SelectItem>
              <SelectItem value="kerala">Kerala</SelectItem>
              <SelectItem value="rajasthan">Rajasthan</SelectItem>
              <SelectItem value="himachal">Himachal Pradesh</SelectItem>
              <SelectItem value="goa">Goa</SelectItem>
              <SelectItem value="karnataka">Karnataka</SelectItem>
              <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !preferences.startDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {preferences.startDate ? format(preferences.startDate, "PPP") : "Pick start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={preferences.startDate}
                  onSelect={(date) => setPreferences((prev) => ({ ...prev, startDate: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !preferences.endDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {preferences.endDate ? format(preferences.endDate, "PPP") : "Pick end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={preferences.endDate}
                  onSelect={(date) => setPreferences((prev) => ({ ...prev, endDate: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <Label htmlFor="travelers">Number of Travelers</Label>
          <Select
            value={preferences.travelers.toString()}
            onValueChange={(value) => setPreferences((prev) => ({ ...prev, travelers: Number.parseInt(value) }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "Traveler" : "Travelers"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-primary" />
          <span>What interests you?</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base font-medium mb-4 block">Select your interests</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {interests.map((interest) => {
              const Icon = interest.icon
              const isSelected = preferences.interests.includes(interest.id)
              return (
                <div
                  key={interest.id}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all",
                    isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                  )}
                  onClick={() => handleInterestToggle(interest.id)}
                >
                  <Checkbox checked={isSelected} onChange={() => {}} />
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{interest.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <Label htmlFor="travel-style">Travel Style</Label>
          <Select
            value={preferences.travelStyle}
            onValueChange={(value) => setPreferences((prev) => ({ ...prev, travelStyle: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your travel style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="luxury">Luxury & Comfort</SelectItem>
              <SelectItem value="mid-range">Mid-range</SelectItem>
              <SelectItem value="budget">Budget Friendly</SelectItem>
              <SelectItem value="backpacker">Backpacker</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="accommodation">Preferred Accommodation</Label>
          <Select
            value={preferences.accommodation}
            onValueChange={(value) => setPreferences((prev) => ({ ...prev, accommodation: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select accommodation type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hotel">Hotels</SelectItem>
              <SelectItem value="resort">Resorts</SelectItem>
              <SelectItem value="homestay">Homestays</SelectItem>
              <SelectItem value="guesthouse">Guesthouses</SelectItem>
              <SelectItem value="hostel">Hostels</SelectItem>
              <SelectItem value="camping">Camping</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <span>Budget & Final Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base font-medium mb-4 block">
            Budget per person: ₹{preferences.budget[0].toLocaleString()}
          </Label>
          <Slider
            value={preferences.budget}
            onValueChange={(value) => setPreferences((prev) => ({ ...prev, budget: value }))}
            max={200000}
            min={10000}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>₹10,000</span>
            <span>₹2,00,000</span>
          </div>
        </div>

        <div>
          <Label htmlFor="special-requests">Special Requests or Requirements</Label>
          <Textarea
            id="special-requests"
            placeholder="Any dietary restrictions, accessibility needs, or special interests..."
            value={preferences.specialRequests}
            onChange={(e) => setPreferences((prev) => ({ ...prev, specialRequests: e.target.value }))}
            className="min-h-[100px]"
          />
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium mb-2">Trip Summary</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              <strong>Destination:</strong> {preferences.destination || "Not selected"}
            </p>
            <p>
              <strong>Duration:</strong>{" "}
              {preferences.startDate && preferences.endDate
                ? `${format(preferences.startDate, "MMM dd")} - ${format(preferences.endDate, "MMM dd, yyyy")}`
                : "Dates not selected"}
            </p>
            <p>
              <strong>Travelers:</strong> {preferences.travelers}
            </p>
            <p>
              <strong>Budget:</strong> ₹{preferences.budget[0].toLocaleString()} per person
            </p>
            <p>
              <strong>Interests:</strong>{" "}
              {preferences.interests.length > 0
                ? preferences.interests.map((id) => interests.find((i) => i.id === id)?.label).join(", ")
                : "None selected"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const canProceed = () => {
    switch (step) {
      case 1:
        return preferences.destination && preferences.startDate && preferences.endDate
      case 2:
        return preferences.interests.length > 0 && preferences.travelStyle && preferences.accommodation
      case 3:
        return true
      default:
        return false
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                step >= stepNum ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              {stepNum}
            </div>
            {stepNum < 3 && <div className={cn("w-12 h-0.5 mx-2", step > stepNum ? "bg-primary" : "bg-muted")} />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
          Previous
        </Button>

        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
            Next
          </Button>
        ) : (
          <Button
            onClick={() => {
              // Handle trip creation
              console.log("Creating trip with preferences:", preferences)
            }}
            disabled={!canProceed()}
          >
            Create My Itinerary
          </Button>
        )}
      </div>
    </div>
  )
}
