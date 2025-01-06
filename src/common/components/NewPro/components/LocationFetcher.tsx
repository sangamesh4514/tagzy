import React, { useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

const GoogleLocation: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Initialize Places Autocomplete
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: new google.maps.LatLng(0, 0), // default to (0,0) if no location set
      radius: 200 * 1000, // 200km radius for results
    },
  });

  // Handle address selection
  const handleSelect = async (address: string) => {
    setValue(address, false);  // Set value to the selected address
    clearSuggestions();        // Clear the suggestion list

    try {
      // Get geocode and lat/lng of the selected address
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      // Update the location state with lat and lng
      setLocation({ lat, lng });
    } catch (error) {
      console.error('Error getting geocode: ', error);
    }
  };

  return (
    <div>
    
      {/* Input field for address */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}  // Disable input if not ready
        placeholder="Search for a location"
      />
      
      {/* Display suggestions */}
      {status === 'OK' && (
        <ul>
          {data.map(({ description }, index) => (
            <li key={index} onClick={() => handleSelect(description)}>
              {description}
            </li>
          ))}
        </ul>
      )}

      {/* Display selected location */}
      {location && (
        <div>
          <h2>Selected Location: {value}({location.lat},{location.lng})</h2>
          <h1>To do </h1>
          <h2>compare with the service location see if it's available to book(for at home)</h2>
          <h2>enter phone and verify (keep this simple and give a textfield and verify button below location)</h2>
          <h2>we call create project with all the details</h2>
        </div>
      )}
    </div>
  );
};

export default GoogleLocation;
