// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { backendUrl } from "../../common/utils/authentication/adminActions";
// import { UserProfile } from "../../types";

// // update User profile function
// export const updateUserProfile = createAsyncThunk(
//     'user/update',
//     async({
//         name,
//         email,
//         phoneNumber,
//         password,
//         gender,
//         dob,
//         profilePicture,
//         isUserPro,
//         isUserVerified
//     }: UserProfile, { rejectWithValue }) => {
//         try{
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }

//             if(phoneNumber) {
//                 const { data } = await axios.post(`${backendUrl}/user/update`, {
//                     'name': name,
//                     'email': email,
//                     'phoneNumber':  phoneNumber,
//                     'password': password,
//                     'profilePicture': profilePicture,
//                     'gender': gender,
//                     'dob': dob,
//                     'isUserPro': isUserPro,
//                     'isUserVerified': isUserVerified
//                 }, config)
//                 console.log('user updated data', data)
//             }
//         }
//         catch (error: any) {
//             rejectWithValue(error.message)
//         }
//     }
// )