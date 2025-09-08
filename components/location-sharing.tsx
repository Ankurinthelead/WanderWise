"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Share2, Clock, Users } from "lucide-react"

export function LocationSharing() {
  const [isSharing, setIsSharing] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const sharedContacts = [
    { name: "Aman Gupta", status: "active" },
    { name: "Bhargav Das", status: "active" },
    { name: "Travel Group", status: "pending" },
  ]

  useEffect(() => {
    if (isSharing) {
      // Simulate getting location
      const interval = setInterval(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setCurrentLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              })
              setLastUpdate(new Date())
            },
            () => {
              // Fallback to mock location for demo
              setCurrentLocation({ lat: 25.2744, lng: 91.7322 }) // Meghalaya coordinates
              setLastUpdate(new Date())
            },
          )
        }
      }, 30000) // Update every 30 seconds

      return () => clearInterval(interval)
    }
  }, [isSharing])

  const handleToggleSharing = () => {
    setIsSharing(!isSharing)
    if (!isSharing) {
      setLastUpdate(new Date())
      setCurrentLocation({ lat: 25.2744, lng: 91.7322 }) // Mock location
    }
  }

  const handleShareLocation = () => {
    if (currentLocation) {
      const locationUrl = `https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`
      navigator.share?.({
        title: "My Current Location",
        text: "Here is my current location for safety",
        url: locationUrl,
      }) || window.open(locationUrl, "_blank")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600" />
          Location Sharing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Location Sharing Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="location-sharing" className="text-base font-medium">
                Share Live Location
              </Label>
              <p className="text-sm text-gray-600">Allow trusted contacts to see your real-time location</p>
            </div>
            <Switch id="location-sharing" checked={isSharing} onCheckedChange={handleToggleSharing} />
          </div>

          {/* Current Status */}
          {isSharing && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-green-800">Location Sharing Active</span>
              </div>
              {currentLocation && (
                <p className="text-sm text-green-700">
                  Lat: {currentLocation.lat.toFixed(4)}, Lng: {currentLocation.lng.toFixed(4)}
                </p>
              )}
              {lastUpdate && (
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </p>
              )}
            </div>
          )}

          {/* Shared With */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Shared With
            </h4>
            <div className="space-y-2">
              {sharedContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{contact.name}</span>
                  <Badge variant={contact.status === "active" ? "default" : "secondary"}>{contact.status}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Share */}
          <Button
            onClick={handleShareLocation}
            disabled={!currentLocation}
            className="w-full bg-transparent"
            variant="outline"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Current Location
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
