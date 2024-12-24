import React from "react"
// import { Calendar } from "@/components/ui/calendar"
import { Service } from "@/common/types"
import "../styles/DateSelector.css"
import { Calendar } from "src/magicUi/ui/calendar"

interface DateSelectorProps {
  service: Service
  selectedDate: string | null
  onSelectDate: (date: string) => void
}

export function DateSelector({
  service,
  selectedDate,
  onSelectDate,
}: DateSelectorProps) {
  // Convert selectedDate string to Date object for Calendar
  const selectedDateObj = selectedDate ? new Date(selectedDate) : undefined

  // Function to check if a date should be disabled
  const isDateDisabled = (date: Date) => {
    const dayName = date.toLocaleString("en-US", { weekday: "long" })
    return !service.workingDays.includes(dayName)
  }

  // Function to handle date selection
  const handleSelect = (date: Date | undefined) => {
    if (date) {
      // Convert to YYYY-MM-DD format
      const normalizedDate = date.toISOString().split("T")[0]
      onSelectDate(normalizedDate)
    }
  }

  return (
    <div className="date-selector">
      <h4>Select a Date:</h4>
      <Calendar
        mode="single"
        selected={selectedDateObj}
        onSelect={handleSelect}
        disabled={(date) => 
          date < new Date() || // Disable past dates
          isDateDisabled(date) // Disable non-working days
        }
        initialFocus
        className="calendar-wrapper"
      />
    </div>
  )
}
