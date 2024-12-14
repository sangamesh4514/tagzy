import React from "react";
// import { Service } from '../types/types';
import "../styles/DateSelector.css";
import { Service } from "@/common/types";

interface DateSelectorProps {
  service: Service;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

export function DateSelector({
  service,
  selectedDate,
  onSelectDate,
}: DateSelectorProps) {
  const today = new Date();
  const dates = [];
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (
      service.workingDays.includes(
        date.toLocaleString("en-US", { weekday: "long" })
      )
    ) {
      dates.push(date);
    }
  }

  return (
    <div className="date-selector">
      <h4>Select a Date:</h4>
      <div className="date-options">
        {dates.map((date) => {
          // Normalize to 'YYYY-MM-DD' for comparison
          const normalizedDate = date.toISOString().split("T")[0];
          const isSelected = selectedDate === normalizedDate;

          return (
            <button
              key={normalizedDate}
              onClick={() => onSelectDate(normalizedDate)}
              className={`date-option ${isSelected ? "selected" : ""}`}
            >
              {date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </button>
          );
        })}
      </div>
    </div>
  );
}
