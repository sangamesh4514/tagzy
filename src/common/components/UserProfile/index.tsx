/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import { IUserProfile } from "../../types";
import { Button } from "../ui/button";
import { Input } from "../../../magicUi/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../magicUi/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/magicUi/ui/table";
// import { Avatar, AvatarFallback, AvatarImage } from "../../magicUi/ui/avatar";
import { Checkbox } from "src/magicUi/ui/checkbox";
import { Label } from "src/magicUi/ui/label";
import { Pencil } from "lucide-react";
import { useUserData } from "../../api/getAndUpdateUser";
import { Spinner } from "../Spinner";
interface UserProfileCardProps {
  user: IUserProfile
}
const UserProfileCard: React.FC<UserProfileCardProps> = ({user}) => {
  const [data, setData] = useState<IUserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<IUserProfile | null>(null);
  const [editableFields, setEditableFields] = useState<(keyof IUserProfile)[]>(
    []
  );
  const [selectedFields, setSelectedFields] = useState<(keyof IUserProfile)[]>(
    []
  );
  const { updateUser, loading }= useUserData();

  useEffect(() => {
    if (user && user.phoneNumber) {
      setData(user);
      setEditedData(user);
      setEditableFields(Object.keys(user) as (keyof IUserProfile)[]);
    }
  }, [user]);
  
  const handleEdit = () => {
    setIsEditing(true);
    if (data) {
      setEditedData({ ...data });
    }
  };
  
  const handleUpdate = async () => {
    if (editedData && editedData.phoneNumber) {
      setData(editedData);
      await updateUser(editedData);
    }
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedData(data);
    setIsEditing(false);
  };
  
  const handleInputChange = (key: keyof IUserProfile, value: any) => {
    setEditedData((prev) => (prev ? { ...prev, [key]: value } : null));
  };
  
  const isDataChanged = () => {
    if (!data || !editedData) return false;
    return Object.keys(data).some(
      (key) =>
        data[key as keyof IUserProfile] !==
        editedData[key as keyof IUserProfile]
    );
  };
  
  const handleFieldSelection = (field: keyof IUserProfile) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };
  
  const applyFilter = () => {
    setEditableFields(selectedFields);
  };
  
  const renderEditableField = (key: keyof IUserProfile, value: any) => {
    if (!editableFields.includes(key)) {
      return value?.toString() || "";
    }
    if (typeof value === "boolean") {
      return (
        <Select
          value={editedData?.[key]?.toString()}
          onValueChange={(newValue) =>
            handleInputChange(key, newValue === "true")
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue>{editedData?.[key]?.toString()}</SelectValue>
          </SelectTrigger>
          <SelectContent style={{background: 'black'}}>
            <SelectItem style={{background: 'green'}} value="true">True</SelectItem>
            <SelectItem style={{background: 'red'}} value="false">False</SelectItem>
          </SelectContent>
        </Select>
      );
    } else if (Array.isArray(value)) {
      return (
        <Input
          value={editedData?.[key]?.join(", ") || ""}
          onChange={(e) => handleInputChange(key, e.target.value.split(", "))}
          className="test1"
        />
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <Input
          value={JSON.stringify(editedData?.[key])}
          onChange={(e) => handleInputChange(key, JSON.parse(e.target.value))}
          className="test2"
        />
      );
    } else {
      return (
        <Input
          value={editedData?.[key]?.toString() || ""}
          onChange={(e) => handleInputChange(key, e.target.value)}
          className="test3"
        />
      );
    }
  };
  if (!data) {
    return (
      <div className="text-center mt-4 text-2xl text-gray-500">
        Please enter user phone number on search field
      </div>
    );
  }
  
  return (
    <div
      className="px-4 mx-8 md:mx-20"
      style={{ border: "3px solid green" }}
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Select fields to edit:</h2>
        <div className="flex flex-wrap gap-2 mb-2">
          {Object.keys(data).map((key) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={selectedFields.includes(key as keyof IUserProfile)}
                onCheckedChange={() =>
                  handleFieldSelection(key as keyof IUserProfile)
                }
              />
              <Label htmlFor={key}>{key}</Label>
            </div>
          ))}
        </div>
        <Button
          onClick={applyFilter}
          disabled={isEditing}
          className="bg-colorB hover:bg-colorA text-white"
          variant="outline"
        >
          Apply Filter
        </Button>
      </div>
      <div className="text-center mt-4 text-2xl text-gray-500">
        {data.isUserPro ? "Provider" : "User"} Profile
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Field</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {Object.entries(data).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell style={{ borderRight: "3px solid green" }}>
                {key}
              </TableCell>
              <TableCell className="">
                {isEditing
                  ? renderEditableField(key as keyof IUserProfile, value)
                  : typeof value === "object"
                  ? JSON.stringify(value)
                  : value?.toString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 space-x-2">
        {!isEditing && (
          <Button
            onClick={handleEdit}
            className="bg-colorB hover:bg-colorA text-white mb-2"
            variant="outline"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
        {isEditing && (
          <>
            <Button
              onClick={handleUpdate}
              disabled={!isDataChanged()}
              variant="outline"
              className="bg-colorB hover:bg-colorA text-white mb-2"
            >
              {loading ? (<Spinner />): 'Update'}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="bg-colorB hover:bg-colorA text-white mb-2"
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default UserProfileCard;
{
  /* <div className="items-center">
  <Avatar className="w-32 h-32">
    <AvatarImage alt="User Profile" src={data?.profilePicture} />
    <AvatarFallback className="text-6xl bg-gray-200">
      {data?.name ? data?.name[0] : "UN"}
    </AvatarFallback>
  </Avatar>
</div> */
}
