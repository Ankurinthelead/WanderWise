import { SafetyDashboard } from "@/components/safety-dashboard"
import { EmergencyContacts } from "@/components/emergency-contacts"
import { LocationSharing } from "@/components/location-sharing"
import { SafetyAlerts } from "@/components/safety-alerts"
import { EmergencyServices } from "@/components/emergency-services"

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety & Emergency Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive safety companion for secure and worry-free travel
          </p>
        </div>

        <div className="grid gap-8">
          <SafetyDashboard />

          <div className="grid md:grid-cols-2 gap-8">
            <EmergencyContacts />
            <LocationSharing />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <SafetyAlerts />
            <EmergencyServices />
          </div>
        </div>
      </div>
    </div>
  )
}
