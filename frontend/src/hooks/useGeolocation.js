import { useState } from "react";

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationData = { latitude, longitude };
        setLocation(locationData);
        setIsLoading(false);
      },
      (err) => {
        setIsLoading(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("User denied the request for Geolocation");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable");
            break;
          case err.TIMEOUT:
            setError("The request to get user location timed out");
            break;
          default:
            setError("An unknown error occurred");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  return { location, error, isLoading, getLocation };
}
