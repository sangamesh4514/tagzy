import React, { useEffect, useState } from 'react';
import { loadGoogleMapsScript } from '../utils';

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

const GoogleLocation: React.FC = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY;

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        // Load Google Maps script
        if(apiKey){
          await loadGoogleMapsScript(apiKey);
        }

        // Check if Geolocation is supported
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              // Initialize Geocoder
              const geocoder = new google.maps.Geocoder();
              const latlng = { lat: latitude, lng: longitude };

              // Perform reverse geocoding
              geocoder.geocode({ location: latlng }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                  setLocation({
                    latitude,
                    longitude,
                    address: results[0].formatted_address,
                  });
                } else {
                  setError('Unable to retrieve address');
                }
              });
            },
            (geoError) => {
              setError(`Error getting location: ${geoError.message}`);
            }
          );
        } else {
          setError('Geolocation is not supported by your browser');
        }
      } catch (err) {
        setError('Failed to load Google Maps API');
      }
    };

    getUserLocation();
  }, [apiKey]);

  return (
    <div>
      <h1>User Location</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {location ? (
        <div>
          <p><strong>Latitude:</strong> {location.latitude}</p>
          <p><strong>Longitude:</strong> {location.longitude}</p>
          <p><strong>Address:</strong> {location.address}</p>
        </div>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default GoogleLocation;
