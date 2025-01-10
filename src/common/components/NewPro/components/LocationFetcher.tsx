import React, { useState, useEffect, useCallback } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { useCart } from "../context/CartContext";
import { calculateDistance } from "../utils";

const GoogleLocation: React.FC = () => {
  const { cartItem } = useCart();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

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

  // Function to handle address selection
  const handleSelect = useCallback(async (address: string) => {
    setValue(address, false); // Set value to the selected address
    clearSuggestions(); // Clear the suggestion list

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setLocation({ lat, lng });
    } catch (error) {
      console.error("Error getting geocode: ", error);
    }
  }, [setValue, clearSuggestions]);

  // Memoize provider location coordinates from cart item
  const providerServiceLocation = React.useMemo(() => ({
    lat: cartItem?.service.location.coordinates[1],
    lon: cartItem?.service.location.coordinates[0],
  }), [cartItem]);

  // Effect to calculate distance only when location and provider service location are available
  useEffect(() => {
    if (location && providerServiceLocation.lat && providerServiceLocation.lon) {
      const dist = calculateDistance(location.lat, location.lng, providerServiceLocation.lat, providerServiceLocation.lon);
      setDistance(dist); // Update distance state
    }
  }, [location, providerServiceLocation]);

  // Function to get current location using Geolocation API
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current location:", error);
          alert("Unable to retrieve your location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      {/* Input field for address */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready} // Disable input if not ready
        placeholder="Search for a location"
      />

      {/* Button to select current location */}
      <button onClick={handleCurrentLocation} disabled={!ready}>
        Use Current Location
      </button>

      {/* Display suggestions */}
      {status === "OK" && (
        <ul>
          {data.map(({ description }, index) => (
            <li key={index} onClick={() => handleSelect(description)}>
              {description}
            </li>
          ))}
        </ul>
      )}

      {/* Display selected location and distance */}
      {location && (
        <div>
          <h2>Selected Location: {value || "Current Location"}</h2>
          {distance !== null && (
            <h2>The distance between the provider and your location is {distance.toFixed(2)} km.</h2>
          )}

          {/* <h1>To do:</h1>
          <h2>Compare with the service location to see if it's available to book (for at-home services).</h2>
          <h2>Enter your phone number and verify (keep this simple with a textfield and verify button below location).</h2>
          <h2>We'll create a project with all the details after verification.</h2> */}
        </div>
      )}
    </div>
  );
};

export default GoogleLocation;
