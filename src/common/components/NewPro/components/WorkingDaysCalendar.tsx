import React, { useState } from 'react'
import { addDays, format, isSameDay } from 'date-fns'
// import { Calendar } from "@/components/ui/calendar"
import { Calendar } from 'src/magicUi/ui/calendar'
import './WorkingDaysCalendar.css'

interface WorkingDaysCalendarProps {
  workingDays: string[]
}

export const WorkingDaysCalendar: React.FC<WorkingDaysCalendarProps> = ({ workingDays }) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)

  const today = new Date()
  const tenDaysLater = addDays(today, 10)

  const isWorkingDay = (date: Date) => {
    const dayName = format(date, 'EEEE')
    return workingDays.includes(dayName)
  }

  const isSelectableDay = (date: Date) => {
    return (
      date >= today &&
      date <= tenDaysLater &&
      isWorkingDay(date)
    )
  }

  return (
    <div className='calendarWrapper'>
      <Calendar
        mode="single"
        selected={selectedDay}
        onSelect={setSelectedDay}
        disabled={(date) => !isSelectableDay(date)}
        modifiers={{
          workingDay: (date) => isWorkingDay(date),
          selected: (date) => selectedDay ? isSameDay(date, selectedDay) : false
        }}
        modifiersClassNames={{
          workingDay: 'workingDay',
          selected: 'selected'
        }}
        fromDate={today}
        toDate={tenDaysLater}
      />
      {selectedDay && (
        <p className='selectedDate'>
          Selected date: {format(selectedDay, 'MMMM d, yyyy')}
        </p>
      )}
    </div>
  )
}

