import React from 'react';
import "./style.css";
import { 
    Settings,
    BadgeInfo,
    LogOut
} from 'lucide-react';
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from 'src/magicUi/ui/popover';
import ContactDialog from "../ContactDialog";
import { useUserLogin } from 'src/common/api/userLogin';


interface UserProps{
    name: string;
    profilePicture: string;
}

const ProfilePopup: React.FC<{ user: UserProps}> = ({ user }) => {
    const { userLogout } = useUserLogin()

    const logoutHandler = () => {
        userLogout()
    }
  return (
    <div>
        <Popover>
            <PopoverTrigger className="user-trigger">
                <div className='user-profile-avatar'>
                    <img src={user.profilePicture} alt="User Avatar" />
                </div>
            </PopoverTrigger>
            <PopoverContent align="end" className="user-content">
                {/* User Profile Card */}
                <div className="user-card">
                    <div className='user-card-inner'>
                        <img 
                            src={user.profilePicture} 
                            alt="User Avatar" 
                            className="user-avatar" 
                        />
                    </div>
                    <span className="user-name">Hey, {user.name}!</span>
                </div>
                {/* Other Options */}
                <div className="user-option">
                    <Settings /> 
                    <span className='user-option-text'>Settings</span>
                </div>
                <div className="user-option">
                    <BadgeInfo /> 
                        <div className='user-option-text-dialog'>
                            <ContactDialog headerView={false} />
                        </div>
                </div>
                <div className="user-option" onClick={logoutHandler}>
                    <LogOut /> 
                    <span className='user-option-text' >Logout</span>
                </div>
            </PopoverContent>
    </Popover>
    </div>
  )
}

export default ProfilePopup