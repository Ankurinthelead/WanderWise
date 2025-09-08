"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, Phone, Clock, CheckCircle } from "lucide-react"

export function SafetyDashboard() {
  const [safetyStatus, setSafetyStatus] = useState<"safe" | "caution" | "emergency">("safe")
  const [lastCheckIn, setLastCheckIn] = useState(new Date())

  const handleCheckIn = () => {
    setSafetyStatus("safe")
    setLastCheckIn(new Date())
  }

  const handleEmergency = () => {
    setSafetyStatus("emergency")
    // In a real app, this would trigger emergency protocols
    alert("Emergency alert sent to your emergency contacts!")
  }

  const getStatusColor = () => {
    switch (safetyStatus) {
      case "safe":
        return "bg-green-500"
      case "caution":
        return "bg-yellow-500"
      case "emergency":
        return "bg-red-500"
    }
  }

  const getStatusText = () => {
    switch (safetyStatus) {
      case "safe":
        return "All Safe"
      case "caution":
        return "Use Caution"
      case "emergency":
        return "Emergency"
    }
  }

  return (
    <Card className="border-2 border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-red-600" />
          Safety Status Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Current Status */}
          <div className="text-center">
            <div className={`w-20 h-20 rounded-full ${getStatusColor()} mx-auto mb-4 flex items-center justify-center`}>
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Current Status</h3>
            <Badge variant={safetyStatus === "safe" ? "default" : "destructive"}>{getStatusText()}</Badge>
          </div>

          {/* Last Check-in */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-blue-500 mx-auto mb-4 flex items-center justify-center">
              <Clock className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Last Check-in</h3>
            <p className="text-sm text-gray-600">{lastCheckIn.toLocaleTimeString()}</p>
          </div>

          {/* Quick Actions */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-orange-500 mx-auto mb-4 flex items-center justify-center">
              <Phone className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <Button onClick={handleCheckIn} className="w-full bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Check In Safe
              </Button>
              <Button onClick={handleEmergency} variant="destructive" className="w-full">
                <AlertTriangle className="h-4 w-4 mr-2" />
                SOS Emergency
              </Button>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Today's Safety Tip</h4>
          <p className="text-blue-800 text-sm">
            Always inform someone about your daily itinerary and expected return time. Regular check-ins help ensure
            your safety during solo travel.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
