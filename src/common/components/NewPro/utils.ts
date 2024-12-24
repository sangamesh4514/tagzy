import { parse, format, addHours, isBefore, isToday, startOfHour, addMinutes } from 'date-fns';

export function generateTimeSlots(start: string, end: string): string[] {
  const startTime = parse(start, 'HH:mm', new Date());
  const endTime = parse(end, 'HH:mm', new Date());
  const slots: string[] = [];

  let currentSlot = startTime;
  while (isBefore(currentSlot, endTime)) {
    const nextSlot = addHours(currentSlot, 1);
    slots.push(`${format(currentSlot, 'hh:mm a')} - ${format(nextSlot, 'hh:mm a')}`);
    currentSlot = nextSlot;
  }

  return slots;
}

export function isTimeSlotDisabled(date: Date, timeSlot: string): boolean {
  if (!isToday(date)) return false;

  const [startTime] = timeSlot.split(' - ');
  const slotTime = parse(startTime, 'hh:mm a', date);
  const currentTime = new Date();
  const roundedCurrentTime = startOfHour(addMinutes(currentTime, 30)); // Round up to the next hour if more than 30 minutes past the hour

  return isBefore(slotTime, roundedCurrentTime);
}

export const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.getElementById('google-maps-script')) {
        resolve();
        return;
      }
  
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
  
      script.onload = () => resolve();
      script.onerror = () => reject('Failed to load Google Maps script');
      document.head.appendChild(script);
    });
  };
  