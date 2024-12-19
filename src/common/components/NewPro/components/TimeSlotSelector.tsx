import React from 'react';
import '../styles/TimeSlotSelector.css';
import { Service } from 'src/common/types';

interface TimeSlotSelectorProps {
  service: Service;
  selectedTimeSlot: string | null;
  onSelectTimeSlot: (timeSlot: string) => void;
}

export function TimeSlotSelector({ service, selectedTimeSlot, onSelectTimeSlot }: TimeSlotSelectorProps) {
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

  return (
    <div className="time-slot-selector">
      <h4>Select a Time Slot:</h4>
      <div className="time-slot-options">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => onSelectTimeSlot(slot)}
            className={`time-slot-option ${selectedTimeSlot === slot ? 'selected' : ''}`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}

