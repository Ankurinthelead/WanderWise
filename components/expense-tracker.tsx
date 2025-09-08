"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, Plus, Receipt, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Expense {
  id: string
  amount: number
  category: string
  description: string
  date: Date
  location: string
  paymentMethod: string
}

export function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      amount: 3500,
      category: "accommodation",
      description: "Homestay in Shillong - 2 nights",
      date: new Date("2024-03-15"),
      location: "Shillong",
      paymentMethod: "UPI",
    },
    {
      id: "2",
      amount: 1200,
      category: "transport",
      description: "Taxi to Mawlynnong Village",
      date: new Date("2024-03-16"),
      location: "Mawlynnong",
      paymentMethod: "Cash",
    },
    {
      id: "3",
      amount: 800,
      category: "food",
      description: "Traditional Khasi dinner",
      date: new Date("2024-03-15"),
      location: "Shillong",
      paymentMethod: "Card",
    },
  ])

  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    amount: 0,
    category: "",
    description: "",
    date: new Date(),
    location: "",
    paymentMethod: "",
  })

  const [isAddingExpense, setIsAddingExpense] = useState(false)

  const categories = [
    { value: "accommodation", label: "Accommodation" },
    { value: "transport", label: "Transport" },
    { value: "food", label: "Food & Dining" },
    { value: "activities", label: "Activities" },
    { value: "shopping", label: "Shopping" },
    { value: "miscellaneous", label: "Miscellaneous" },
  ]

  const paymentMethods = [
    { value: "cash", label: "Cash" },
    { value: "card", label: "Credit/Debit Card" },
    { value: "upi", label: "UPI" },
    { value: "wallet", label: "Digital Wallet" },
  ]

  const getCategoryColor = (category: string) => {
    const colors = {
      accommodation: "bg-blue-100 text-blue-800",
      transport: "bg-purple-100 text-purple-800",
      food: "bg-green-100 text-green-800",
      activities: "bg-orange-100 text-orange-800",
      shopping: "bg-pink-100 text-pink-800",
      miscellaneous: "bg-gray-100 text-gray-800",
    }
    return colors[category as keyof typeof colors] || colors.miscellaneous
  }

  const handleAddExpense = () => {
    if (newExpense.amount && newExpense.category && newExpense.description) {
      const expense: Expense = {
        id: Date.now().toString(),
        amount: newExpense.amount,
        category: newExpense.category,
        description: newExpense.description,
        date: newExpense.date || new Date(),
        location: newExpense.location || "",
        paymentMethod: newExpense.paymentMethod || "",
      }
      setExpenses([expense, ...expenses])
      setNewExpense({
        amount: 0,
        category: "",
        description: "",
        date: new Date(),
        location: "",
        paymentMethod: "",
      })
      setIsAddingExpense(false)
    }
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="space-y-6">
      {/* Add Expense Button and Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recent Expenses</h3>
          <p className="text-sm text-muted-foreground">
            {expenses.length} expenses • Total: ₹{totalExpenses.toLocaleString()}
          </p>
        </div>
        <Dialog open={isAddingExpense} onOpenChange={setIsAddingExpense}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newExpense.amount || ""}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: Number.parseFloat(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newExpense.description || ""}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  placeholder="What did you spend on?"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newExpense.date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newExpense.date ? format(newExpense.date, "PPP") : "Pick date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newExpense.date}
                        onSelect={(date) => setNewExpense({ ...newExpense, date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newExpense.location || ""}
                    onChange={(e) => setNewExpense({ ...newExpense, location: e.target.value })}
                    placeholder="Where?"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select
                  value={newExpense.paymentMethod}
                  onValueChange={(value) => setNewExpense({ ...newExpense, paymentMethod: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How did you pay?" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingExpense(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddExpense}>Add Expense</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Expenses List */}
      <div className="space-y-3">
        {expenses.map((expense) => (
          <Card key={expense.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <Receipt className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getCategoryColor(expense.category)}>
                          {categories.find((c) => c.value === expense.category)?.label}
                        </Badge>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{format(expense.date, "MMM dd, yyyy")}</span>
                        {expense.location && (
                          <>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{expense.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-semibold">₹{expense.amount.toLocaleString()}</p>
                    {expense.paymentMethod && (
                      <p className="text-sm text-muted-foreground capitalize">{expense.paymentMethod}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {expenses.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No expenses yet</h3>
            <p className="text-muted-foreground mb-4">Start tracking your travel expenses to stay within budget</p>
            <Button onClick={() => setIsAddingExpense(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Expense
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
