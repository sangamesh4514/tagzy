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


// utils/distanceCalculator.ts
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const radLat1 = toRadians(lat1);
  const radLat2 = toRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers
  return distance;
};

  