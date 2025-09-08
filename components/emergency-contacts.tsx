"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Phone, Plus, Trash2, Users } from "lucide-react"

interface EmergencyContact {
  id: string
  name: string
  phone: string
  relationship: string
  isPrimary: boolean
}

export function EmergencyContacts() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: "1",
      name: "Aman Gupta",
      phone: "+91 8402019858",
      relationship: "Husband",
      isPrimary: true,
    },
    {
      id: "2",
      name: "Bhargab Das",
      phone: "+91 6000705863",
      relationship: "Brother",
      isPrimary: false,
    },
  ])

  const [isAdding, setIsAdding] = useState(false)
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: "",
  })

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        ...newContact,
        isPrimary: contacts.length === 0,
      }
      setContacts([...contacts, contact])
      setNewContact({ name: "", phone: "", relationship: "" })
      setIsAdding(false)
    }
  }

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id))
  }

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          Emergency Contacts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{contact.name}</h4>
                  {contact.isPrimary && (
                    <Badge variant="default" className="text-xs">
                      Primary
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{contact.phone}</p>
                <p className="text-xs text-gray-500">{contact.relationship}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleCall(contact.phone)} className="bg-green-600 hover:bg-green-700">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDeleteContact(contact.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {isAdding ? (
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg space-y-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="Contact name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="+1-555-0123"
                />
              </div>
              <div>
                <Label htmlFor="relationship">Relationship</Label>
                <Input
                  id="relationship"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  placeholder="e.g., Spouse, Parent, Friend"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddContact} className="flex-1">
                  Add Contact
                </Button>
                <Button variant="outline" onClick={() => setIsAdding(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setIsAdding(true)} variant="outline" className="w-full border-dashed">
              <Plus className="h-4 w-4 mr-2" />
              Add Emergency Contact
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
