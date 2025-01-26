import { Booking, CartItem, ILocation, IUserProfile } from "src/common/types";
import { formatISO, parse } from "date-fns";

// interface CartItem {
//   service: {
//     phoneNumber: string;
//     proName: string;
//     cost: number;
//     proId: string;
//     _id: string;
//     typeOfService: string;
//   };    
//   selectedDate?: string; // e.g., "2025-01-29"
//   selectedTimeSlot?: string; // e.g., "04:00 PM - 05:00 PM"
//   addOns?: string[];
// }

// interface UserInfo {
//   phoneNumber: string;
//   name: string;
//   _id: string;
// }

// interface UserLocation {
//   coordinates: number[];
//   name: string;
//   type: string;
// }
 

export const transformOrderPlacePayload = (
  cartItem: CartItem,
  userInfo: IUserProfile,
  userLocation: ILocation,
  address?: string,
  discount?: number
): Booking => {
  // Helper function to format date and time
  const formatDateTime = (date: string, timeSlot: string): string => {
    const [startTime] = timeSlot.split(" - "); // Extract the start time
    const dateTimeString = `${date} ${startTime}`;
    const parsedDate = parse(dateTimeString, "yyyy-MM-dd hh:mm a", new Date());
    return formatISO(parsedDate, { representation: "complete" });
  };

  // Current timestamp for procedure
  const currentDateTime = new Date().toISOString();

  // Build payload
  const payload = {
    proPhoneNumber: cartItem.service.phoneNumber,
    clientPhoneNumber: userInfo.phoneNumber,
    address: address || "",
    location: userLocation,
    status: "NOT_STARTED",
    dateTime: cartItem.selectedDate && cartItem.selectedTimeSlot
      ? formatDateTime(cartItem.selectedDate, cartItem.selectedTimeSlot)
      : undefined,
    proName: cartItem.service.proName,
    clientName: userInfo.name || userInfo.phoneNumber,
    discount: discount || 0,
    cost: cartItem.service.cost,
    proId: cartItem.service.proId,
    clientId: userInfo._id,
    serviceId: cartItem.service._id,
    typeOfService: cartItem.service.typeOfService,
    // addOns: cartItem.addons || [],
    procedure: [
      {
        step: 1,
        name: "Project Creation",
        status: "COMPLETED",
        dateTime: currentDateTime,
        userType: "USER",
      },
      {
        step: 2,
        name: "Invitation",
        status: "NOT_STARTED",
        dateTime: currentDateTime,
        userType: "PRO",
      },
    ],
  };

  return payload;
};


