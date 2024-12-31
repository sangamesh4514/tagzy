import React from 'react';
import '../styles/TimeSlotSelector.css';
import { Service } from 'src/common/types';

interface TimeSlotSelectorProps {
  service: Service;
  selectedTimeSlot: string | null;
  onSelectTimeSlot: (timeSlot: string) => void;
  selectedDate: Date; // Add selectedDate prop
}

export function TimeSlotSelector({ service, selectedTimeSlot, onSelectTimeSlot, selectedDate }: TimeSlotSelectorProps) {
  const generateTimeSlots = (start: string, end: string) => {
    const slots = [];
    let currentTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);

    while (currentTime < endTime) {
      const nextTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
      slots.push(`${currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}-${nextTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`);
      currentTime = nextTime;
    }

    return slots;
  };

  const timeSlots = service.timeSlots.flatMap(slot => generateTimeSlots(slot.start, slot.end));

  const isCurrentDate = (date: Date) => {
    const now = new Date();
    return date.toDateString() === now.toDateString();
  };

  const isFutureTimeSlot = (slot: string) => {
    const now = new Date();
    const [startTime] = slot.split('-');
    const slotTime = new Date(`2000-01-01T${startTime.trim()} ${now.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[1]}`); // Ensure timezone consistency
    return slotTime > now;
  };
  console.log('###timeSlots',timeSlots[0]);
  console.log('###selectedTimeSlot',selectedTimeSlot);

  return (
    <div className="time-slot-selector">
      <h4>Select a Time Slot:</h4>
      <div className="time-slot-options">
        {timeSlots.map((slot) => {
          const isDisabled = isCurrentDate(selectedDate) && !isFutureTimeSlot(slot);
          return (
            <button
              key={slot}
              onClick={() => !isDisabled && onSelectTimeSlot(slot)}
              className={`time-slot-option ${selectedTimeSlot === slot ? 'selected' : ''}`}
              disabled={isDisabled}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}
