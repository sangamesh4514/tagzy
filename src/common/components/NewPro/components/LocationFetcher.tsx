import React, { useState, useEffect, useCallback } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useCart } from "../context/CartContext";
import { calculateDistance } from "../utils";
import { useDispatch } from "react-redux";
import { updateBoolean, updateText } from "../dataSlice";
import { MapPinHouse } from "lucide-react";

const GoogleLocation: React.FC = () => {
  const dispatch = useDispatch();
  const { cartItem } = useCart();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [address, setAddress] = useState<string | null>(null); 
  const [locationMessage, setLocationMessage] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState(false);

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

  const handleSelect = useCallback(
    async (address: string) => {
      setValue("", false);
      clearSuggestions();
      dispatch(updateText(address));
      setIsTyping(false);

      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setLocation({ lat, lng });
        setAddress(address); // Save the selected address
      } catch (error) {
        console.error("Error getting geocode: ", error);
      }
    },
    [setValue, clearSuggestions, dispatch]
  );

  // Memoize provider location coordinates from cart item
  const providerServiceLocation = React.useMemo(
    () => ({
      lat: cartItem?.service.location.coordinates[1],
      lon: cartItem?.service.location.coordinates[0],
    }),
    [cartItem]
  );

  // Effect to calculate distance only when location and provider service location are available
  useEffect(() => {
    if (
      location &&
      cartItem &&
      providerServiceLocation.lat &&
      providerServiceLocation.lon
    ) {
      const dist = calculateDistance(
        location.lat,
        location.lng,
        providerServiceLocation.lat,
        providerServiceLocation.lon
      );
      const serviceDistance = cartItem?.service.maxServiceDistance >= dist;
      setLocationMessage(serviceDistance);
      setTimeout(() => {
        dispatch(updateBoolean(serviceDistance));
      }, 2000);
    }
  }, [cartItem, dispatch, location, providerServiceLocation]);

  // Function to get current location using Geolocation API
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          // Use Geocoder to get the place name (address)
          const geocoder = new google.maps.Geocoder();
          const latLng = new google.maps.LatLng(latitude, longitude);

          geocoder.geocode({ location: latLng }, (results, status) => {
            if (
              status === google.maps.GeocoderStatus.OK &&
              results &&
              results[0]
            ) {
              setAddress(results[0].formatted_address); // Set the place name
              dispatch(updateText(results[0].formatted_address));
              setValue("");
              setIsTyping(false); // Stop typing state
            } else if (!results) {
              alert("Geocoder returned null results.");
            } else {
              alert("Unable to retrieve the address.");
            }
          });
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
  console.log('===!isTyping',!isTyping,'location',location, 'address',address);

  return (
    <div>
      <div className="enterLocation">
        {/* Input field for address */}
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setIsTyping(true); // Start typing state
            setLocation(null);
            setAddress(null);
          }}
          disabled={!ready} // Disable input if not ready
          placeholder="Search for a location"
        />

        {/* Button to select current location */}
        <button
          className="useCurrentBtn"
          onClick={handleCurrentLocation}
          disabled={!ready}
        >
          Use Current Location
          <MapPinHouse color="white" />
        </button>
      </div>

      {/* Display suggestions */}
      {status === "OK" && (
        <ul className="list-disc list-inside searchList">
          {data.map(({ description }, index) => (
            <li
              className="hover:text-teal-700"
              key={index}
              onClick={() => handleSelect(description)}
            >
              {description}
            </li>
          ))}
        </ul>
      )}

      {/* Display selected location and distance */}
      {!isTyping && location && address && (
        <div className="InvalidLocation">
          <table>
            <tr>
              <td style={{minWidth: '250px', fontSize: '1.25rem'}}>Selected Location :</td>
              <td style={{fontSize: '1rem', width:'100%'}}>{address}</td>
            </tr>
          </table>
          {/* <h2>Selected Location: {address}</h2> */}
          {!locationMessage ? (
            <h2 style={{ color: "red" }}>
              Unfortunately, this service is unavailable for booking as it is
              outside your location range.
            </h2>
          ) : (
            <h2>Redirecting to the next step...</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default GoogleLocation;
