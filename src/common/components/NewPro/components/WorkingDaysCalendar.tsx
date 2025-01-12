import React, { useState } from "react";
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import "../styles/WorkingDaysCalendar.css";
import { Calendar } from "src/magicUi/ui/calendar";
import { generateTimeSlots, isTimeSlotDisabled } from "../utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/magicUi/ui/select";
import { useCart } from "../context/CartContext";

interface WorkingDaysCalendarProps {
  workingDays: string[];
  timeSlots: {
    start: string;
    end: string;
    _id: string;
  }[];
}

export const WorkingDaysCalendar: React.FC<WorkingDaysCalendarProps> = ({
  workingDays,
  timeSlots,
}) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  // const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined)
  const { cartItem, setSelectedDate, setSelectedTimeSlot } = useCart();
  console.log('$$$setSelectedDate',setSelectedDate);
  const today = startOfDay(new Date());
  const twentyDaysLater = addDays(today, 20);

  const isWorkingDay = (date: Date) => {
    const dayName = format(date, "EEEE");
    return workingDays.includes(dayName);
  };

  const isSelectableDay = (date: Date) => {
    return date >= today && date <= twentyDaysLater && isWorkingDay(date);
  };

  const handleDaySelect = (date: Date | undefined) => {
    setSelectedDay(date);
    setSelectedTimeSlot("");
  };

  const availableTimeSlots =
    timeSlots.length > 0
      ? generateTimeSlots(timeSlots[0].start, timeSlots[0].end)
      : [];

  return (
    <div className={"calendarWrapper"}>
      <Calendar
        mode="single"
        selected={selectedDay}
        onSelect={handleDaySelect}
        disabled={(date) => !isSelectableDay(date)}
        modifiers={{
          workingDay: (date) => isWorkingDay(date),
          selected: (date) =>
            selectedDay ? isSameDay(date, selectedDay) : false,
        }}
        modifiersClassNames={{
          workingDay: "workingDay",
          selected: "selected",
        }}
        fromDate={today}
        toDate={twentyDaysLater}
      />
      {selectedDay && timeSlots.length > 0 && (
        <div className={"timeSlotSelector"}>
          <h3>Select a time slot:</h3>
          <Select
            key={selectedDay ? selectedDay.toISOString() : "no-date"}
            value={cartItem?.selectedTimeSlot || ""}
            onValueChange={setSelectedTimeSlot}
          >
            <SelectTrigger className="selectTrigger">
              <SelectValue placeholder="Choose a time slot" />
            </SelectTrigger>
            <SelectContent className="select-content">
              {availableTimeSlots.map((slot) => (
                <SelectItem
                  key={slot}
                  value={slot}
                  disabled={isTimeSlotDisabled(selectedDay!, slot)}
                  className="select-item"
                >
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {selectedDay && cartItem?.selectedTimeSlot ? (
        <p className={"selectedDateTime"}>
          Selected Slot: {format(selectedDay, "MMMM d, yyyy")} at{" "}
          {cartItem.selectedTimeSlot}
        </p>
      ) : (
        selectedDay && (
          <p className={"selectedDateTime"}>
            Selected Slot: {format(selectedDay, "MMMM d, yyyy")}
          </p>
        )
      )}
    </div>
  );
};
