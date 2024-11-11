// src/common/routes/UserProfile.tsx
import { UserProfile } from '@/types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Extract userId from the URL
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://web-production-ff56.up.railway.app/user/id/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data: UserProfile = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

 
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20%',fontSize:42 }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20%',fontSize:42 }}>
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1>{userData.name || 'User'}'s Profile</h1>
      {userData.profilePicture && (
        <img
          src={userData.profilePicture}
          alt="Profile"
          style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '20px' }}
        />
      )}
      <table style={{ borderCollapse: 'collapse', width: '80%', maxWidth: '600px', textAlign: 'left' }}>
        <tbody>
          <tr><th style={cellStyle}>Name</th><td style={cellStyle}>{userData.name}</td></tr>
          <tr><th style={cellStyle}>Email</th><td style={cellStyle}>{userData.email}</td></tr>
          <tr><th style={cellStyle}>Phone Number</th><td style={cellStyle}>{userData.phoneNumber}</td></tr>
          <tr><th style={cellStyle}>Date of Birth</th><td style={cellStyle}>{userData.dob}</td></tr>
          <tr><th style={cellStyle}>Gender</th><td style={cellStyle}>{userData.gender}</td></tr>
          <tr><th style={cellStyle}>Location</th><td style={cellStyle}>{JSON.stringify(userData.location)}</td></tr>
          <tr><th style={cellStyle}>Coins</th><td style={cellStyle}>{userData.coins}</td></tr>
          <tr><th style={cellStyle}>Address</th><td style={cellStyle}>{userData.address}</td></tr>
          <tr><th style={cellStyle}>City</th><td style={cellStyle}>{userData.city}</td></tr>
          <tr><th style={cellStyle}>Category ID</th><td style={cellStyle}>{userData.categoryId}</td></tr>
          <tr><th style={cellStyle}>Experience</th><td style={cellStyle}>{userData.experience}</td></tr>
          <tr><th style={cellStyle}>Skill Title</th><td style={cellStyle}>{userData.skillTitle}</td></tr>
          <tr><th style={cellStyle}>Description</th><td style={cellStyle}>{userData.description}</td></tr>
          <tr><th style={cellStyle}>Languages</th><td style={cellStyle}>{userData.languages?.join(', ')}</td></tr>
          <tr><th style={cellStyle}>Sub Skills</th><td style={cellStyle}>{userData.subSkills?.join(', ')}</td></tr>
          <tr><th style={cellStyle}>Pro Status</th><td style={cellStyle}>{userData.isUserPro ? 'Yes' : 'No'}</td></tr>
          <tr><th style={cellStyle}>Verified</th><td style={cellStyle}>{userData.isUserVerified ? 'Yes' : 'No'}</td></tr>
        </tbody>
      </table>
    </div>
  );
};

// Styling for table cells
const cellStyle: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #ddd',
  backgroundColor: '#f9f9f9',
  textAlign: 'left',
};

export default ProProfile;