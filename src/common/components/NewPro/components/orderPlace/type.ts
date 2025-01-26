export interface Location {
  coordinates?: number[]; // Optional array of numbers [longitude, latitude]
  name?: string; // Optional name of the location
  type?: string; // Optional type (e.g., "Point")
}

export interface Procedure {
  step: number; // Step number
  name: string; // Name of the procedure step
  status: string; // Status of the step (e.g., "COMPLETED", "NOT_STARTED")
  dateTime: string; // ISO date string
  userType: string; // User type (e.g., "USER", "PRO")
}

export interface ServiceDetails {
  proPhoneNumber: string; 
  clientPhoneNumber: string; // Client's phone number
  address?: string; // Address as a string
  location: Location; // Location object
  status: string; // Status of the service
  dateTime?: string; // ISO date string for service time
  proName: string; // Name of the professional
  clientName: string; // Name of the client
  discount?: number; // Discount amount
  cost: number; // Total cost
  proId: string; // Professional ID
  clientId: string; // Client ID
  serviceId: string; // Service ID
  typeOfService: string; // Type of service (e.g., "AT_OFFICE")
  addOns?: string[]; // Array of add-on strings
  procedure: Procedure[]; // Array of procedure objects
}

//   PhoneNumberPro = cartItem.services.phoneNumber
//   clientPhoneNumber: userInfo.phoneNumber
//   address?: 
//   location: userLocation
//   status: "NOT_STARTED" //this will be in hard code 
//   dateTime?: cartItem.selectedDate cartItem.selectedTimeSlot ---> "2025-01-29"  "04:00 PM - 05:00 PM" // this is my data of selectedDate & selectedTimeSlot ---> I want my response to be excat in this form ---> "2025-01-11T07:30:00.000Z"

//   proName: cartItem.services.proName
//   clientName: userInfo.name
//   discount?: 
//   cost: cartItem.services.cost
//   proId: cartItem.services.proId
//   clientId: userInfo._id
//   serviceId: cartItem.services._id
//   typeOfService: cartItem.services.typeOfService
//   addOns?: 
//   procedure:[
//        {
//           "step":1, //this will be in hard code 
//           "name":"Project Creation", //this will be in hard code 
//           "status":"COMPLETED", //this will be in hard code 
//           "dateTime":"2025-01-11 03:06:15.468342Z", //pick current date & time ---> I want my response to be excat in this form ---> "2025-01-11 03:06:15.468342Z"
//           "userType":"USER" //this will be in hard code 
//        },
//        {
//           "step":2, //this will be in hard code 
//           "name":"Invitation", //this will be in hard code 
//           "status":"NOT_STARTED", //this will be in hard code 
//           "dateTime":"2025-01-11 03:06:15.469633Z", //pick current date & time ---> I want my response to be excat in this form ---> "2025-01-11 03:06:15.469633Z"
//           "userType":"PRO" //this will be in hard code 
//        }
//   ]

//   const test = {
//     "proPhoneNumber":"8310451852",
//     "clientPhoneNumber":"7899560395",
//     "address":"",
//     "dateTime":"2025-01-11 07:30:00.000Z",
//     "proName":"jackk",
//     "clientName":"john",
//     "serviceName":"Health checkup ",
//     "cost":300,
//     "proId":"675560ceac2627b4057ee3d0",
//     "clientId":"6757077031ecff1086999141",
//     "serviceId":"6755acc8ac2627b4057ee4ab",
//     "typeOfService": "AT_OFFICE",
//     "addOns":[
       
//     ],
//     "procedure":[
//        {
//           "step":1,
//           "name":"Project Creation",
//           "status":"COMPLETED",
//           "dateTime":"2025-01-11 03:06:15.468342Z",
//           "userType":"USER"
//        },
//        {
//           "step":2,
//           "name":"Invitation",
//           "status":"NOT_STARTED",
//           "dateTime":"2025-01-11 03:06:15.469633Z",
//           "userType":"PRO"
//        }
//     ],
//     "location":{
//        "coordinates":[
//           77.5945627,
//           12.9715987
//        ],
//        "name":"Bangalore, Karnataka, India",
//        "type":"Point"
//     }

//  }