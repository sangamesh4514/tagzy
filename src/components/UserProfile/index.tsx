import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchUserByPhoneNumber, updateUserProfile } from "../../features/getUserProfile/userProfileActions";
import { UserProfile } from "../../types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../magicUi/ui/card";
import { format } from "date-fns";
import { enIN } from "date-fns/locale"
import { Button } from "../../common/components/ui/button";
import { Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../magicUi/ui/avatar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "../../magicUi/ui/dialog";
import { Label } from "../../magicUi/ui/label";
import { Input } from "../../magicUi/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../magicUi/ui/select";
import { cn } from "src/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../magicUi/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "../../magicUi/ui/calendar";
import { Spinner } from "../Spinner";
import { ScrollArea } from "../../magicUi/ui/scroll-area";



interface UserCardProps {
    phoneNumber: string | null
}

const UserProfileCard: React.FC<UserCardProps> = ({ phoneNumber }) => {
    const dispatch = useAppDispatch()
    const { loading, userInfo, success } = useAppSelector((state) => state.userProfile)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const uploadImage = useRef(null)
    const [userData, setUserData] = useState<UserProfile>({
        name: '',
        email: '',
        phoneNumber: '',
        profilePicture: '',
        password: '',
        address: '',
        city: '',
        dob: '',
        gender: '',
        isUserPro: false,
        isUserVerified: false,
        description: ''
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
                password: userInfo.password,
                address: userInfo.address,
                city: userInfo.city,
                profilePicture: userInfo.profilePicture,
                dob: userInfo.dob,
                gender: userInfo.gender,
                isUserPro: userInfo.isUserPro,
                isUserVerified: userInfo.isUserVerified,
                description: userInfo.description,
            })
        }
    }, [userInfo])

    // image change handler
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e)
        // const target = e.target as HTMLInputElement
        // const file = target.files
        // console.log('No Profile picture', file)
        // if (file && file[0]) {
        //     console.log(URL.createObjectURL(file[0]))
        //     console.log('image prfoile',file)
        //     setUserData((prevState) => ({
        //       ...prevState,
        //       profilePicture: URL.createObjectURL(file[0])
        //     }));
            
        // }
        const file = e.target.files?.[0]
        if(file) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                if(fileReader.readyState === FileReader.DONE){
                    setUserData((prev) => ({
                        ...prev,
                        profilePicture: fileReader.result as string
                    }))
                }
            }
        }
    };
    
    // input text field handler
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    // date pick field hanlder
    const handleDateChange = (date: Date | undefined) => {
        setUserData((prevState) => ({
            ...prevState,
            dob: date ? date.toISOString() : '',
        }));
    };

    // form submit hanlder
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await dispatch(updateUserProfile(userData));
        if(loading) {
            setIsDialogOpen(true);
        } else {
            setIsDialogOpen(false)
        }
    };

    return (
        <div className="">
            {/* user details card */}
            {success ? (
                <Card className="mt-8 w-5/6 mx-auto">
                    <CardHeader>
                        <CardTitle>{
                            userData.isUserPro ? 'Worker' : 'User'    
                        } Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-row justify-between">
                            <div className="flex-row">
                                <p>
                                    <span className="font-semibold">Name: </span>{userInfo?.name}
                                </p>
                                <p>
                                    <span className="font-semibold">Email: </span>{userData?.email}
                                </p>
                                <p>
                                    <span className="font-semibold">Mobile No.: </span>{userData?.phoneNumber}
                                </p>
                                <p>
                                    <span className="font-semibold">Password: </span>{userData?.password}
                                </p>
                                <p>
                                    <span className="font-semibold">Address: </span>{userData?.address}
                                </p>
                                <p>
                                    <span className="font-semibold">City: </span>{userData?.city}
                                </p>
                                <p>
                                    <span className="font-semibold">Gender: </span>{userData?.gender ? userData?.gender : null}
                                </p>
                                <p>
                                    <span className="font-semibold">Date of birth: </span>{
                                        userData?.dob ? format((userData?.dob || ''), "dd MMMM yyyy", { locale: enIN }) : null
                                    }
                                </p>
                                <p>
                                    <span className="font-semibold">User Professional: </span>{userData?.isUserPro ? 'Yes' : 'No'}
                                </p>
                                <p>
                                    <span className="font-semibold">User Verified: </span>{userData?.isUserVerified ? 'Yes' : 'No'}
                                </p>
                            </div>
                            <div className="items-center">
                                <Avatar className="w-32 h-32">
                                    <AvatarImage alt="User Profile" src={userData?.profilePicture} />
                                    <AvatarFallback className="text-6xl bg-gray-200">{userData?.name ? userData?.name[0] : 'UN'}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                        <p>
                            <span className="font-semibold">Description: </span>{userData?.description}
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-end bg-white">
                        {/* Editable Card */}
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} modal={true}>
                                <DialogTrigger asChild >
                                    <Button className="bg-colorA hover:bg-colorB text-white">
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                </DialogTrigger>
                                    {/* <DialogOverlay> */}
                                <DialogContent className="bg-white text-black overflow-y-scroll" >
                                    <ScrollArea>
                                        <DialogHeader>
                                            <DialogTitle className="text-center text-black text-2xl">Edit Profile</DialogTitle>
                                        </DialogHeader>
                                        <form 
                                            onSubmit={handleSubmit}
                                            className="space-y-4">
                                            <div>
                                                {/* Profile picture */}
                                                <div className="mb-3 text-center">
                                                    <Label>Profile Picture</Label>
                                                    <Avatar className="w-20 h-20 mx-auto relative">
                                                        <AvatarImage alt="User Profile" src={userData.profilePicture} />
                                                        <AvatarFallback className="text-4xl bg-gray-200">{userData.name ? userData.name[0] : 'UN'}</AvatarFallback>
                                                    </Avatar>
                                                    <Label 
                                                        htmlFor="userImage"
                                                        className="bg-colorA hover:bg-colorB text-white"
                                                    ><Pencil /></Label>
                                                    <Input 
                                                        ref={uploadImage}
                                                        name="userImage"
                                                        type="file" 
                                                        onChange={handleImageChange} 
                                                        className="block w-full cursor-pointer"
                                                        multiple={false}
                                                        placeholder="Update Profile"
                                                    />
                                                </div>

                                                {/* Input text fields */}
                                                <div className="mb-3">
                                                    <Label>Name</Label>
                                                    <Input name="name" type="text" value={userData.name} onChange={handleInputChange}/>
                                                </div>
                                                <div className="mb-3">
                                                    <Label>Email</Label>
                                                    <Input name="email" type="text" value={userData.email} onChange={handleInputChange}/>
                                                </div>
                                                <div className="mb-3">
                                                    <Label>Mobile No.</Label>
                                                    <Input name="phoneNumber" type="text" value={userData.phoneNumber} onChange={handleInputChange}/>
                                                </div>
                                                {/* <div className="mb-3">
                                                    <Label>Password</Label>
                                                    <Input name="password" type="text" value={userData.password} onChange={handleInputChange}/>
                                                </div>
                                                <div className="mb-3">
                                                    <Label>Address</Label>
                                                    <Input name="address" type="text" value={userData.address} onChange={handleInputChange}/>
                                                </div>
                                                <div className="mb-3">
                                                    <Label>City</Label>
                                                    <Input name="city" type="text" value={userData.city} onChange={handleInputChange}/>
                                                </div> */}

                                                {/* Date picker field */}
                                                <div className="mb-3">
                                                    <Label htmlFor="edit-dob" className="block">Date Of Birth</Label>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[280px] justify-start text-left font-normal",
                                                                    !userData.dob && "text-muted-foreground"
                                                                )}
                                                            >
                                                                <CalendarIcon className="w-4 h-4 mr-2" />
                                                                {userData.dob ? format((userData.dob), "dd MMMM yyyy", { locale: enIN }) : <span>Pick a date</span>}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="bg-white text-black pl-2">
                                                            <Calendar 
                                                                mode="single"
                                                                selected={userData.dob ? new Date(userData.dob) : undefined}
                                                                onSelect={handleDateChange}
                                                                initialFocus
                                                                defaultMonth={new Date(2003, 0)}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>

                                                {/* Dropdown fields */}
                                                <div className="mb-3">
                                                    <Label htmlFor="edit-gender">Gender</Label>
                                                    <Select onValueChange={(value) => setUserData((prev) => ({ ...prev, gender: value }))}>
                                                        <SelectTrigger id="edit-gender">
                                                            <SelectValue placeholder={userData.gender !== 'string' ? userData.gender : undefined} />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-white text-black">
                                                            <SelectItem value="Male">Male</SelectItem>
                                                            <SelectItem value="Female">Female</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="mb-3">
                                                    <Label htmlFor="edit-userPro">User Professional</Label>
                                                    <Select onValueChange={(value) => setUserData((prev) => ({ ...prev, isUserPro: value === 'true' }))}>
                                                        <SelectTrigger id="edit-userPro">
                                                            <SelectValue placeholder={userData.isUserPro ? 'Yes' : 'No'} />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-white text-black">
                                                            <SelectItem value='true'>Yes</SelectItem>
                                                            <SelectItem value='false'>No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="mb-3">
                                                    <Label htmlFor="edit-userVerified">User Verified</Label>
                                                    <Select onValueChange={(value) => setUserData((prev) => ({ ...prev, isUserVerified: value === 'true' }))}>
                                                        <SelectTrigger id="edit-userVerified">
                                                            <SelectValue placeholder={userData.isUserVerified ? 'Yes' : 'No'} />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-white text-black">
                                                            <SelectItem value='true'>Yes</SelectItem>
                                                            <SelectItem value='false'>No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </form>
                                        <DialogFooter>
                                            <Button 
                                                className="bg-colorA hover:bg-colorB text-white"
                                                onClick={handleSubmit}
                                            >
                                                {loading ? <Spinner /> : 'Update'}
                                            </Button>
                                            <Button 
                                                className="bg-colorA hover:bg-colorB text-white mb-2 sm:mb-0"
                                                onClick={() => setIsDialogOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </DialogFooter>
                                    </ScrollArea>
                                </DialogContent>
                                    {/* </DialogOverlay> */}
                            </Dialog>
                    </CardFooter>
                </Card>
            ) : (
                <div className="text-center mt-4 text-2xl text-gray-500">
                    Please enter user phone number on search field
                </div>
            )}
        </div>
    )
}

export default UserProfileCard;