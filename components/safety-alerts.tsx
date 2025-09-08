"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Info, CheckCircle, X } from "lucide-react"

interface SafetyAlert {
  id: string
  type: "warning" | "info" | "emergency"
  title: string
  message: string
  location: string
  timestamp: Date
  isRead: boolean
}

export function SafetyAlerts() {
  const [alerts, setAlerts] = useState<SafetyAlert[]>([
    {
      id: "1",
      type: "warning",
      title: "Weather Alert",
      message: "Heavy rainfall expected in Cherrapunji area. Exercise caution while traveling.",
      location: "Cherrapunji, Meghalaya",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
    },
    {
      id: "2",
      type: "info",
      title: "Road Closure",
      message: "Temporary road closure on NH-6 due to maintenance work. Alternative routes available.",
      location: "Guwahati-Shillong Highway",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      isRead: false,
    },
    {
      id: "3",
      type: "info",
      title: "Festival Notice",
      message: "Local festival celebrations may cause traffic delays in city center.",
      location: "Shillong City Center",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
    },
  ])

  const handleMarkAsRead = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, isRead: true } : alert)))
  }

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const getAlertBadgeVariant = (type: string) => {
    switch (type) {
      case "emergency":
        return "destructive"
      case "warning":
        return "default"
      case "info":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const unreadCount = alerts.filter((alert) => !alert.isRead).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Safety Alerts
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount} new
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
              <p>No active safety alerts</p>
              <p className="text-sm">You're all set for safe travels!</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 border rounded-lg ${!alert.isRead ? "bg-blue-50 border-blue-200" : "bg-gray-50"}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getAlertIcon(alert.type)}
                    <h4 className="font-medium">{alert.title}</h4>
                    <Badge variant={getAlertBadgeVariant(alert.type)} className="text-xs">
                      {alert.type}
                    </Badge>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => handleDismiss(alert.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-sm text-gray-700 mb-2">{alert.message}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{alert.location}</span>
                  <span>{alert.timestamp.toLocaleString()}</span>
                </div>

                {!alert.isRead && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMarkAsRead(alert.id)}
                    className="mt-2 text-xs"
                  >
                    Mark as Read
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
