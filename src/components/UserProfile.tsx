import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { fetchUserByPhoneNumber, updateUserProfile } from "../features/getUserProfile/userProfileActions";
import { UserProfile } from "../types";

interface UserCardProps {
    phoneNumber: string | null
}

const UserProfileCard: React.FC<UserCardProps> = ({ phoneNumber }: any) => {
    const dispatch = useAppDispatch()
    const { loading, success, userInfo, error } = useAppSelector((state) => state.userProfile)
    const [isEditing, setIsEditing] = useState(false)
    const [userData, setUserData] = useState<UserProfile>({
        name: '',
        email: '',
        phoneNumber: '',
        profilePicture: '',
        dob: '',
        gender: '',
        isUserPro: false,
        isUserVerified: false
    })

    useEffect(() => {
        if(phoneNumber){
            dispatch(fetchUserByPhoneNumber({
                phoneNumber: phoneNumber
            }))
        }
    }, [dispatch, phoneNumber])

    useEffect(() => {
        if(userInfo) {
            setUserData({
                name: userInfo.name,
                email: userInfo.email,
                phoneNumber: userInfo.phoneNumber,
                profilePicture: userInfo.profilePicture,
                isUserPro: userInfo.isUserPro,
                isUserVerified: userInfo.isUserVerified
            })
        }
    }, [userInfo])

    const toggleEdit  = () => {
        setIsEditing(!isEditing)
    }

    const handleSave = () => {
        if(userInfo) {
            console.log(userInfo)
            dispatch(updateUserProfile(userData)).then(() => setIsEditing(false))
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        const files = target.files
        if (files && files[0]) {
            setUserData((prevState) => ({
              ...prevState,
              profileImage: URL.createObjectURL(files[0]),
            }));
        }
    };
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setUserData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    if (!userInfo?.phoneNumber){
        return null ;
    }
    
    return (
        <div className="relative p-6 border border-gray-200 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
                {userData.profilePicture ? (
                <img
                    src={userData.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                />
                ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                </div>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-4">
                {/* Profile Image Upload */}
                <label className="block">
                    <span className="text-gray-700">Upload Profile Image</span>
                    <input type="file" onChange={handleImageChange} className="mt-1 block w-full" />
                </label>

                {/* Text Input Fields */}
                <label className="block">
                    <span className="text-gray-700">Name</span>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="mt-1 mb-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Email</span>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Phone Number</span>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Date of Birth</span>
                    <input
                    type="date"
                    name="dob"
                    value={userInfo?.dob}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </label>

                {/* Dropdown Fields */}
                <label className="block">
                    <span className="text-gray-700">Date of birth</span>
                    <select
                        name="dob"
                        value={userInfo?.gender}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >   
                        <option value="">Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                    </select>
                </label>
                <label className="block">
                    <span className="text-gray-700">Professional Status</span>
                    <select
                        name="isUserPro"
                        value={userData.isUserPro ? 'Yes' : 'No'}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value='true'>Yes</option>
                        <option value='false'>No</option>
                    </select>
                </label>
                <label className="block">
                    <span className="text-gray-700">Verified Status</span>
                    <select
                        name="isUserVerified"
                        value={userData.isUserVerified ? 'Yes' : 'No'}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value='true'>Yes</option>
                        <option value='false'>No</option>
                    </select>
                </label>
                </div>
            ) : (
                <div className="space-y-2 text-gray-700">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone number:</strong> {userData.phoneNumber}</p>
                    <p><strong>Gender:</strong>{userInfo?.gender}</p>
                    <p><strong>Date of birth:</strong>{userInfo?.dob}</p>
                    <p><strong>Pro Status:</strong> {userData.isUserPro ? 'Yes' : 'No'}</p>
                    <p><strong>Verified Status:</strong> {userData.isUserVerified ? 'Yes' : 'No'}</p>
                </div>
            )}

            {/* Edit, Save, and Cancel Buttons */}
            {isEditing ? (
                <div className="absolute bottom-2 right-2 flex space-x-2">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 transition"
                >
                    Save
                </button>
                <button
                    // onClick={handleCancel}
                    className="px-4 py-2 bg-gray-400 text-white rounded-md shadow-md hover:bg-gray-500 transition"
                >
                    Cancel
                </button>
                </div>
            ) : (
                <button
                onClick={toggleEdit}
                className="absolute bottom-2 right-2 px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 transition"
                >
                Edit
                </button>
            )}
            </div>

    )
}

export default UserProfileCard;