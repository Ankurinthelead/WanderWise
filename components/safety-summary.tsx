"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, MapPin, Clock, AlertTriangle, CheckCircle } from "lucide-react"

export function SafetySummary() {
  const safetyStatus = {
    overall: "safe",
    lastCheckIn: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    locationSharing: true,
    emergencyContacts: 3,
    recentAlerts: [
      {
        type: "weather",
        message: "Heavy rainfall expected in Cherrapunji",
        time: "2 hours ago",
      },
      {
        type: "info",
        message: "Road closure on NH-6 cleared",
        time: "5 hours ago",
      },
    ],
  }

  const getStatusColor = () => {
    switch (safetyStatus.overall) {
      case "safe":
        return "text-green-600"
      case "caution":
        return "text-yellow-600"
      case "emergency":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = () => {
    switch (safetyStatus.overall) {
      case "safe":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "caution":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "emergency":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <Shield className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-red-600" />
          Safety Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Status */}
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <div>
                <p className={`font-medium ${getStatusColor()}`}>
                  {safetyStatus.overall === "safe" ? "All Safe" : "Caution Required"}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last check-in: {safetyStatus.lastCheckIn.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Check In
            </Button>
          </div>

          {/* Safety Features */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Location Sharing</span>
              </div>
              <Badge variant={safetyStatus.locationSharing ? "default" : "secondary"}>
                {safetyStatus.locationSharing ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm">Emergency Contacts</span>
              </div>
              <Badge variant="outline">{safetyStatus.emergencyContacts} contacts</Badge>
            </div>
          </div>

          {/* Recent Alerts */}
          <div>
            <h4 className="font-medium mb-2 text-sm">Recent Alerts</h4>
            <div className="space-y-2">
              {safetyStatus.recentAlerts.map((alert, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-3 w-3 text-orange-500" />
                    <span className="font-medium">{alert.type}</span>
                    <span className="text-gray-500">{alert.time}</span>
                  </div>
                  <p className="text-gray-700">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-2 border-t">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              View Safety Center
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
